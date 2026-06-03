const { getStore } = require('@netlify/blobs');
const crypto = require('crypto');

// Bundle vehicles.json at build time (esbuild includes it via included_files)
const vehicleDB = require('../../data/vehicles.json');
const BUNDLED_VEHICLES = vehicleDB.vehicles || vehicleDB;
const BUNDLED_HASH = crypto.createHash('sha1').update(JSON.stringify(BUNDLED_VEHICLES)).digest('hex');

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

function ok(body, status = 200) {
  return { statusCode: status, headers: CORS, body: JSON.stringify(body) };
}
function err(msg, status = 400) {
  return { statusCode: status, headers: CORS, body: JSON.stringify({ error: msg }) };
}

function authorized(event) {
  const pw = (event.headers['x-admin-password'] || '').trim();
  const expected = (process.env.ADMIN_PASSWORD || '').trim();
  return expected.length > 0 && pw === expected;
}

function generateId(v) {
  const key = (v.make + '|' + v.model + '|' + (v.variant || '')).toLowerCase();
  return crypto.createHash('md5').update(key).digest('hex').slice(0, 12);
}

function addIds(vehicles) {
  return vehicles.map(v => v._id ? v : { ...v, _id: generateId(v) });
}

async function getStore_() {
  // getStore requires a siteID and token in local dev; in production they're injected automatically
  return getStore('vehicles');
}

async function loadVehicles() {
  const store = await getStore_();
  const meta = await store.get('_meta', { type: 'json' }).catch(() => null);

  // Re-seed from bundled vehicles.json if the hash changed (new deploy) or first run
  if (!meta || meta.bundledHash !== BUNDLED_HASH) {
    const seeded = addIds(BUNDLED_VEHICLES);
    await store.set('vehicles', JSON.stringify(seeded));
    await store.set('_meta', JSON.stringify({ bundledHash: BUNDLED_HASH, seededAt: new Date().toISOString() }));
    return seeded;
  }

  const raw = await store.get('vehicles', { type: 'text' }).catch(() => null);
  if (!raw) {
    const seeded = addIds(BUNDLED_VEHICLES);
    await store.set('vehicles', JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw);
}

async function saveVehicles(vehicles) {
  const store = await getStore_();
  await store.set('vehicles', JSON.stringify(vehicles));
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  // Auth check — every request except OPTIONS
  if (!authorized(event)) {
    return err('Unauthorized', 401);
  }

  const method = event.httpMethod;
  const params = event.queryStringParameters || {};
  let body = {};
  try { body = event.body ? JSON.parse(event.body) : {}; } catch (_) {}

  // GET /api/admin?action=list
  if (method === 'GET' && params.action === 'list') {
    const vehicles = await loadVehicles();
    return ok({ vehicles, total: vehicles.length });
  }

  // POST /api/admin  { action: 'add', vehicle: {...} }
  if (method === 'POST' && body.action === 'add') {
    const v = body.vehicle;
    if (!v || !v.make || !v.model) return err('make and model are required');
    const vehicles = await loadVehicles();
    const newV = { ...v, _id: generateId(v) };
    // Prevent duplicate _id collision (same make/model/variant)
    if (vehicles.some(x => x._id === newV._id)) return err('A vehicle with this make/model/variant already exists');
    vehicles.push(newV);
    await saveVehicles(vehicles);
    return ok({ vehicle: newV }, 201);
  }

  // PUT /api/admin  { action: 'update', id: '...', vehicle: {...} }
  if (method === 'PUT' && body.action === 'update') {
    const { id, vehicle: v } = body;
    if (!id || !v) return err('id and vehicle are required');
    const vehicles = await loadVehicles();
    const idx = vehicles.findIndex(x => x._id === id);
    if (idx === -1) return err('Vehicle not found', 404);
    // Preserve _id even if client didn't send it
    vehicles[idx] = { ...v, _id: id };
    await saveVehicles(vehicles);
    return ok({ vehicle: vehicles[idx] });
  }

  // DELETE /api/admin?action=delete&id=xxx
  if (method === 'DELETE' && params.action === 'delete') {
    const { id } = params;
    if (!id) return err('id is required');
    const vehicles = await loadVehicles();
    const idx = vehicles.findIndex(x => x._id === id);
    if (idx === -1) return err('Vehicle not found', 404);
    vehicles.splice(idx, 1);
    await saveVehicles(vehicles);
    return ok({ deleted: id });
  }

  // GET /api/admin?action=export  — returns full vehicles.json content for download
  if (method === 'GET' && params.action === 'export') {
    const vehicles = await loadVehicles();
    // Strip _id before export so vehicles.json stays clean
    const clean = vehicles.map(v => {
      const { _id, ...rest } = v;
      return rest;
    });
    const exportData = { vehicles: clean };
    return {
      statusCode: 200,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="vehicles.json"',
      },
      body: JSON.stringify(exportData, null, 2),
    };
  }

  return err('Unknown action', 400);
};
