const crypto = require('crypto');

// Defensive import — Blobs may not be available in all environments
let getStore = null;
try {
  getStore = require('@netlify/blobs').getStore;
} catch (_) {}

const vehicleDB = require('../../data/vehicles.json');
const BUNDLED_VEHICLES = vehicleDB.vehicles || vehicleDB;
const BUNDLED_HASH = crypto.createHash('sha1').update(JSON.stringify(BUNDLED_VEHICLES)).digest('hex');

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

function ok(body, status) {
  return { statusCode: status || 200, headers: CORS, body: JSON.stringify(body) };
}
function fail(msg, status) {
  return { statusCode: status || 400, headers: CORS, body: JSON.stringify({ error: msg }) };
}

function authorized(event) {
  const pw = (event.headers['x-admin-password'] || '').trim();
  const expected = (process.env.ADMIN_PASSWORD || '').trim();
  if (!expected) return false;
  return pw === expected;
}

function generateId(v) {
  const key = (v.make + '|' + v.model + '|' + (v.variant || '')).toLowerCase();
  return crypto.createHash('md5').update(key).digest('hex').slice(0, 12);
}

function addIds(vehicles) {
  return vehicles.map(function(v) {
    return v._id ? v : Object.assign({}, v, { _id: generateId(v) });
  });
}

async function loadVehicles() {
  if (!getStore) throw new Error('Netlify Blobs unavailable');
  const store = getStore('vehicles');
  const meta = await store.get('_meta', { type: 'json' }).catch(function() { return null; });

  if (!meta || meta.bundledHash !== BUNDLED_HASH) {
    const seeded = addIds(BUNDLED_VEHICLES);
    await store.set('vehicles', JSON.stringify(seeded));
    await store.set('_meta', JSON.stringify({ bundledHash: BUNDLED_HASH, seededAt: new Date().toISOString() }));
    return seeded;
  }

  const raw = await store.get('vehicles', { type: 'text' }).catch(function() { return null; });
  if (!raw) {
    const seeded = addIds(BUNDLED_VEHICLES);
    await store.set('vehicles', JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw);
}

async function saveVehicles(vehicles) {
  if (!getStore) throw new Error('Netlify Blobs unavailable');
  const store = getStore('vehicles');
  await store.set('vehicles', JSON.stringify(vehicles));
}

exports.handler = async function(event) {
  // Wrap everything — a crash here returns a 502, so we must catch all errors
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers: CORS, body: '' };
    }

    if (!authorized(event)) {
      return fail('Unauthorized', 401);
    }

    const method = event.httpMethod;
    const params = event.queryStringParameters || {};
    let body = {};
    try { body = event.body ? JSON.parse(event.body) : {}; } catch (_) {}

    // GET ?action=list
    if (method === 'GET' && params.action === 'list') {
      let vehicles;
      let blobsWorking = true;
      try {
        vehicles = await loadVehicles();
      } catch (blobsErr) {
        // Blobs unavailable — return bundled data with a warning flag
        vehicles = addIds(BUNDLED_VEHICLES);
        blobsWorking = false;
      }
      return ok({ vehicles: vehicles, total: vehicles.length, blobsWorking: blobsWorking });
    }

    // GET ?action=export
    if (method === 'GET' && params.action === 'export') {
      let vehicles;
      try {
        vehicles = await loadVehicles();
      } catch (_) {
        vehicles = addIds(BUNDLED_VEHICLES);
      }
      const clean = vehicles.map(function(v) {
        const out = Object.assign({}, v);
        delete out._id;
        return out;
      });
      return {
        statusCode: 200,
        headers: Object.assign({}, CORS, {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="vehicles.json"',
        }),
        body: JSON.stringify({ vehicles: clean }, null, 2),
      };
    }

    // Write operations require Blobs
    if (!getStore) {
      return fail('Persistence unavailable — Netlify Blobs not initialised. Check function logs and ensure NETLIFY_BLOBS_CONTEXT is set.', 503);
    }

    // POST { action: 'add', vehicle: {...} }
    if (method === 'POST' && body.action === 'add') {
      const v = body.vehicle;
      if (!v || !v.make || !v.model) return fail('make and model are required');
      const vehicles = await loadVehicles();
      const newV = Object.assign({}, v, { _id: generateId(v) });
      if (vehicles.some(function(x) { return x._id === newV._id; })) {
        return fail('A vehicle with this make/model/variant already exists');
      }
      vehicles.push(newV);
      await saveVehicles(vehicles);
      return ok({ vehicle: newV }, 201);
    }

    // PUT { action: 'update', id, vehicle: {...} }
    if (method === 'PUT' && body.action === 'update') {
      const id = body.id;
      const v = body.vehicle;
      if (!id || !v) return fail('id and vehicle are required');
      const vehicles = await loadVehicles();
      const idx = vehicles.findIndex(function(x) { return x._id === id; });
      if (idx === -1) return fail('Vehicle not found', 404);
      vehicles[idx] = Object.assign({}, v, { _id: id });
      await saveVehicles(vehicles);
      return ok({ vehicle: vehicles[idx] });
    }

    // DELETE ?action=delete&id=xxx
    if (method === 'DELETE' && params.action === 'delete') {
      const id = params.id;
      if (!id) return fail('id is required');
      const vehicles = await loadVehicles();
      const idx = vehicles.findIndex(function(x) { return x._id === id; });
      if (idx === -1) return fail('Vehicle not found', 404);
      vehicles.splice(idx, 1);
      await saveVehicles(vehicles);
      return ok({ deleted: id });
    }

    return fail('Unknown action');

  } catch (e) {
    // Last-resort catch — return 500 with the error message instead of crashing to 502
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: 'Internal error: ' + (e.message || String(e)) }),
    };
  }
};
