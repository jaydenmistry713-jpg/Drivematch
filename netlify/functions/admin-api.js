const crypto = require('crypto');

const vehicleDB = require('../../data/vehicles.json');
const BUNDLED_VEHICLES = vehicleDB.vehicles || vehicleDB;

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function ok(body) {
  return { statusCode: 200, headers: CORS, body: JSON.stringify(body) };
}
function fail(msg, status) {
  return { statusCode: status || 401, headers: CORS, body: JSON.stringify({ error: msg }) };
}

function authorized(event) {
  const pw = (event.headers['x-admin-password'] || '').trim();
  const expected = (process.env.ADMIN_PASSWORD || '').trim();
  return expected.length > 0 && pw === expected;
}

function addIds(vehicles) {
  return vehicles.map(function(v) {
    if (v._id) return v;
    const key = (v.make + '|' + v.model + '|' + (v.variant || '')).toLowerCase();
    const id = crypto.createHash('md5').update(key).digest('hex').slice(0, 12);
    return Object.assign({}, v, { _id: id });
  });
}

exports.handler = async function(event) {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers: CORS, body: '' };
    }
    if (!authorized(event)) {
      return fail('Unauthorized', 401);
    }
    // Return the bundled vehicles.json — client handles all persistence via localStorage
    return ok({ vehicles: addIds(BUNDLED_VEHICLES), total: BUNDLED_VEHICLES.length });
  } catch (e) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: e.message }) };
  }
};
