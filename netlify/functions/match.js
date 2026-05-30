const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
const fs = require('fs');

// ── LOAD VEHICLE DATABASE ────────────────────────────────────────
// Resolved relative to the project root at runtime
const DB_PATH = path.join(__dirname, '../../data/vehicles.json');
const vehicleDB = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const ALL_VEHICLES = vehicleDB.vehicles;

// ── PRE-FILTER LOGIC ─────────────────────────────────────────────
function preFilter(quiz) {
  let pool = [...ALL_VEHICLES];

  // Budget filter — hard exclude anything out of range
  const budgetMap = {
    'Under £5,000':        { min: 0,      max: 5000   },
    'Under £10,000':       { min: 0,      max: 10000  },
    '£10,000–£20,000':    { min: 10000,  max: 20000  },
    '£20,000–£35,000':    { min: 20000,  max: 35000  },
    '£35,000–£60,000':    { min: 35000,  max: 60000  },
    '£60,000–£100,000':   { min: 60000,  max: 100000 },
    'Over £100,000':       { min: 100000, max: 999999 },
  };

  const budget = budgetMap[quiz.budget];
  if (budget) {
    const wantNew     = !quiz.condition || quiz.condition !== 'Used (any age)';
    const wantUsed    = !quiz.condition || quiz.condition !== 'Brand new';

    pool = pool.filter(v => {
      const newFits  = wantNew  && v.price_new_min  > 0 && v.price_new_min  <= budget.max && v.price_new_max  >= budget.min;
      const usedFits = wantUsed && v.price_used_min > 0 && v.price_used_min <= budget.max && v.price_used_max >= budget.min;
      return newFits || usedFits;
    });
  }

  // Fuel filter — hard exclude if user has a specific fuel preference
  const fuelMap = {
    'Petrol':               ['petrol', 'mild_hybrid'],
    'Diesel':               ['diesel'],
    'Fully electric (EV)':  ['electric'],
    'Plug-in hybrid (PHEV)':['phev'],
    'Mild hybrid':          ['mild_hybrid', 'petrol'],
    'No preference':        null,
  };

  const allowedFuels = fuelMap[quiz.fuel];
  if (allowedFuels) {
    pool = pool.filter(v => allowedFuels.includes(v.fuel_type));
  }

  // Body style filter — soft preference, not a hard exclude
  // We narrow but keep some alternatives if pool gets too small
  const bodyMap = {
    'Hatchback':             'hatchback',
    'Saloon':                'saloon',
    'Estate':                'estate',
    'SUV / Crossover':       'suv',
    'MPV / People carrier':  'mpv',
    'Coupé / Convertible':   ['coupe', 'convertible'],
    'Pickup truck':          'pickup',
    'Van':                   'van',
    'No preference':         null,
  };

  const wantedBody = bodyMap[quiz.bodyStyle];
  if (wantedBody && wantedBody !== null) {
    const bodyFiltered = pool.filter(v => {
      if (Array.isArray(wantedBody)) return wantedBody.includes(v.body_style);
      return v.body_style === wantedBody;
    });
    // Only apply if it doesn't reduce pool too much
    if (bodyFiltered.length >= 5) pool = bodyFiltered;
  }

  // New/used filter
  const conditionMap = {
    'Brand new':               'new',
    'Nearly new (under 3 years)': 'nearly_new',
    'Used (any age)':          'used',
    'No preference':           null,
  };

  const wantedCondition = conditionMap[quiz.condition];
  if (wantedCondition) {
    const condFiltered = pool.filter(v => v.new_or_used.includes(wantedCondition));
    if (condFiltered.length >= 5) pool = condFiltered;
  }

  // Household / seating filter
  if (quiz.household) {
    const needSeats = quiz.household.includes('Large family') ? 7
      : quiz.household.includes('Small family') ? 5
      : 0;

    if (needSeats >= 7) {
      const sevenSeater = pool.filter(v => v.seats >= 7);
      if (sevenSeater.length >= 3) pool = sevenSeater;
    }

    // Remove vans for personal/family use
    if (!quiz.primaryUse?.includes('business') && !quiz.primaryUse?.includes('Towing')) {
      const noVans = pool.filter(v => v.body_style !== 'van');
      if (noVans.length >= 5) pool = noVans;
    }
  }

  // First time driver filter — weight toward low insurance, cheap running, proven reliability
  if (quiz.priority === 'First time driver') {
    // Deprioritise prestige brands and high insurance vehicles
    const firstCarFriendly = pool.filter(v =>
      v.best_for.includes('first_car') ||
      v.insurance_group <= 15 ||
      v.running_cost === 'very_low'
    );
    if (firstCarFriendly.length >= 5) pool = firstCarFriendly;
  }

  // Towing filter — include towing-capable vehicles if needed
  if (quiz.primaryUse?.includes('Towing')) {
    const towingPool = pool.filter(v => v.towing_kg >= 1500);
    if (towingPool.length >= 5) pool = towingPool;
  }

  // Off-road filter
  if (quiz.primaryUse?.includes('Off-road')) {
    const offRoadPool = pool.filter(v =>
      v.best_for.includes('off_road') || v.body_style === 'suv' || v.body_style === 'pickup'
    );
    if (offRoadPool.length >= 5) pool = offRoadPool;
  }

  // Cap at 25 vehicles to keep prompt lean
  // Prioritise vehicles that match the user's best_for tags
  const priorityTags = buildPriorityTags(quiz);

  pool.sort((a, b) => {
    const scoreA = a.best_for.filter(t => priorityTags.includes(t)).length;
    const scoreB = b.best_for.filter(t => priorityTags.includes(t)).length;
    return scoreB - scoreA;
  });

  return pool.slice(0, 25);
}

function buildPriorityTags(quiz) {
  const tags = [];

  const useMap = {
    'Daily commuting':           ['daily_commute'],
    'Family transport':          ['family', 'practicality'],
    'Long distance / motorway':  ['long_distance'],
    'Off-road / countryside':    ['off_road'],
    'City driving only':         ['city_only'],
    'Weekend & leisure':         ['weekend_leisure', 'driving_enjoyment'],
    'Business travel':           ['business'],
    'Towing / hauling':          ['towing'],
  };

  const priorityMap = {
    'Practicality & space':    ['practicality', 'family'],
    'Low running costs':       ['low_running_costs'],
    'Driving enjoyment':       ['driving_enjoyment'],
    'Comfort & refinement':    ['long_distance'],
    'Safety & reliability':    ['reliability'],
    'Prestige & image':        ['prestige'],
    'First time driver':       ['first_car', 'low_running_costs', 'reliability'],
  };

  if (quiz.primaryUse && useMap[quiz.primaryUse]) tags.push(...useMap[quiz.primaryUse]);
  if (quiz.priority && priorityMap[quiz.priority]) tags.push(...priorityMap[quiz.priority]);
  if (quiz.household?.includes('family')) tags.push('family');

  return tags;
}

// ── FORMAT VEHICLE LIST FOR PROMPT ──────────────────────────────
function formatVehiclesForPrompt(vehicles) {
  return vehicles.map((v, i) => {
    const priceRange = v.price_new_min > 0
      ? `New: £${v.price_new_min.toLocaleString()}–£${v.price_new_max.toLocaleString()}, Used: £${v.price_used_min.toLocaleString()}–£${v.price_used_max.toLocaleString()}`
      : `Used only: £${v.price_used_min.toLocaleString()}–£${v.price_used_max.toLocaleString()}`;

    const range = v.real_range_miles
      ? `Electric range: ${v.real_range_miles} miles`
      : `Real MPG: ${v.real_mpg}`;

    return `${i + 1}. ${v.make} ${v.model} ${v.variant}
   Body: ${v.body_style} | Fuel: ${v.fuel_type} | Seats: ${v.seats} | Boot: ${v.boot_litres}L
   Price: ${priceRange}
   Running cost: ${v.running_cost} | Reliability: ${v.reliability} | ${range}
   Towing: ${v.towing_kg}kg | Parking size: ${v.parking_size}
   Best for: ${v.best_for.join(', ')}
   Avoid for: ${v.avoid_for.join(', ')}
   Notes: ${v.notes}`;
  }).join('\n\n');
}

// ── BUILD PROMPT ─────────────────────────────────────────────────
function buildPrompt(quiz, vehicles) {
  const vehicleList = formatVehiclesForPrompt(vehicles);

  return `You are DriveMatch's vehicle matching engine. Your job is to select the single best vehicle from the provided list for this specific buyer, then identify 3 alternatives also from the list.

BUYER PROFILE:
- Budget: ${quiz.budget}
- Primary use: ${quiz.primaryUse}
- Household: ${quiz.household}
- Fuel preference: ${quiz.fuel}
- Annual mileage: ${quiz.mileage || 'not specified'}
- Top priority: ${quiz.priority || 'not specified'}
- Parking situation: ${quiz.parking || 'not specified'}
- New or used: ${quiz.condition || 'no preference'}
- Body style preference: ${quiz.bodyStyle || 'no preference'}
- Additional notes: ${quiz.extraNotes || 'none'}

AVAILABLE VEHICLES (choose ONLY from this list):
${vehicleList}

INSTRUCTIONS:
- Pick the single best match from the list above. Do not recommend any vehicle not in this list.
- The match score should reflect genuine fit — be honest. A 95% score means nearly perfect. Don't inflate scores.
- The summary must be personalised to THIS buyer's specific answers, not generic.
- Pros and cons must be relevant to this buyer's situation specifically.
- For alternatives, pick 3 different vehicles from the list that are also good fits but for different reasons.
- If the buyer said electric but the filtered list has no EVs, say so honestly and recommend the cleanest hybrid available.
- If the buyer selected 'First time driver' as their priority, weight your recommendation strongly toward: lowest insurance group available, proven reliability, lowest running costs, and ease of driving. Mention the insurance group number explicitly in at least one pro. The summary should acknowledge this is a first car and address the practical concerns of a new driver.

Return ONLY valid JSON, no markdown, no preamble, no explanation outside the JSON:
{
  "vehicle": "Full Make Model Variant exactly as listed",
  "category": "e.g. Compact SUV",
  "priceRange": "e.g. £24,000–£28,000 new · £14,000–£20,000 used",
  "fuelType": "e.g. Petrol / Mild Hybrid",
  "matchScore": 91,
  "pros": [
    "Specific strength relevant to this buyer",
    "Another specific strength",
    "Third strength",
    "Fourth strength",
    "Fifth strength"
  ],
  "cons": [
    "Honest consideration relevant to this buyer",
    "Second consideration",
    "Third consideration"
  ],
  "summary": "3-4 sentences written directly to this buyer. Reference their specific answers — their budget, household, primary use. Explain exactly why this vehicle suits their life. Do not be generic.",
  "insuranceGroup": 16,
  "bootLitres": 311,
  "realMpg": 44,
  "realRangeMiles": 0,
  "seats": 5,
  "towingKg": 0,
  "reliability": "good",
  "runningCost": "low",
  "alternatives": [
    {"name": "Make Model Variant", "reason": "One clear sentence on why this is a good alternative for this specific buyer."},
    {"name": "Make Model Variant", "reason": "One clear sentence."},
    {"name": "Make Model Variant", "reason": "One clear sentence."}
  ]
}`;
}

// ── HANDLER ──────────────────────────────────────────────────────
exports.handler = async function(event, context) {

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers — allows your site to call this function
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Parse quiz answers from request body
    const quiz = JSON.parse(event.body || '{}');

    if (!quiz.budget || !quiz.primaryUse || !quiz.household || !quiz.fuel) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: budget, primaryUse, household, fuel' })
      };
    }

    // Step 1: Pre-filter the vehicle database
    const candidates = preFilter(quiz);

    if (candidates.length === 0) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: 'No vehicles match this profile. Try broadening your fuel or budget selection.' })
      };
    }

    // Step 2: Build prompt with filtered vehicle list
    const prompt = buildPrompt(quiz, candidates);

    // Step 3: Call Claude API
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    // Step 4: Extract and parse JSON response
    const text = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data: result })
    };

  } catch (err) {
    console.error('Match function error:', err);

    // JSON parse error from Claude response
    if (err instanceof SyntaxError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to parse AI response. Please try again.' })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Something went wrong. Please try again.' })
    };
  }
};
