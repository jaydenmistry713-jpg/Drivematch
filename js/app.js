/* ── TEST MODE ─────────────────────────────────────────────────── */
const TEST_MODE = false;

/* ── MOCK DATA ─────────────────────────────────────────────────── */
const MOCK_REVIEWS = [
  { id:'r1', name:'Sarah M.', vehicle:'Volkswagen Golf', year:'2021–present', rating:5, text:"Genuinely the complete package. Refined enough for motorway runs, composed on twisty roads, and practical with two kids in the back. Four years in, running costs have been completely predictable. Build quality feels really solid — no rattles, no issues. Would buy again without question.", helpful:14, verified:true, createdAt:'2025-11-14' },
  { id:'r2', name:'Tom R.', vehicle:'Tesla Model 3', year:'2022–present', rating:4, text:"Performance and tech are seriously impressive. Autopilot on motorways has been a game changer for long journeys. Range anxiety settled after the first few months. Ride is firmer than expected and some panel gaps on delivery were disappointing. Overall though — a big step forward.", helpful:9, verified:true, createdAt:'2025-12-02' },
  { id:'r3', name:'Priya K.', vehicle:'Toyota RAV4 Hybrid', year:'2020–2024', rating:5, text:"Four years, barely a single issue. Fuel economy in mixed driving consistently beat the official figures. Space is genuinely generous and the hybrid system is completely invisible — you just drive it. Would go straight back to Toyota without hesitation.", helpful:23, verified:true, createdAt:'2026-01-08' },
  { id:'r4', name:'Marcus J.', vehicle:'BMW 3 Series', year:'2023–present', rating:4, text:"The driving experience lives up to the reputation. It feels alive in a way most executive saloons don't. Interior quality is excellent. Options list is aggressive and servicing costs are real — go in with clear eyes on the whole-life cost and you'll love it.", helpful:7, verified:false, createdAt:'2026-02-15' },
  { id:'r5', name:'Emma L.', vehicle:'Ford Transit Custom', year:'2019–2022', rating:3, text:"Does exactly what a working van should do for the first 60,000 miles. Comfortable driver seat for long days. Had a couple of reliability blips in year three. Fuel economy is the weak point. Decent value overall for a vehicle that earns its keep every day.", helpful:5, verified:false, createdAt:'2026-03-01' },
  { id:'r6', name:'Daniel F.', vehicle:'Kia EV6', year:'2023–present', rating:5, text:"Exceptional for the money. Rapid charging speed is genuinely impressive — 10 to 80% in around 18 minutes on a good charger. Real-world range is honest. Interior design is bold and quality matches the price. Kia have genuinely figured out the EV ownership experience.", helpful:11, verified:true, createdAt:'2026-03-18' },
  { id:'r7', name:'Aisha T.', vehicle:'Hyundai Tucson', year:'2022–present', rating:4, text:"Really impressed with how much car you get for the money. Interior quality punches well above its price point. The mild hybrid system makes a noticeable difference in town. Boot space is excellent for a family. Only gripe is the infotainment can be slow to respond sometimes.", helpful:6, verified:false, createdAt:'2026-03-25' },
  { id:'r8', name:'Lee P.', vehicle:'Ford Mustang Mach-E', year:'2021–2023', rating:3, text:"Great concept, decent range, but reliability was a concern — had two software issues in two years that required dealer visits. Ford's OTA updates did improve things over time. The performance is genuinely fun but I expected better build quality at this price point.", helpful:4, verified:false, createdAt:'2026-04-01' },
];

const MOCK_BLOG_POSTS = [
  { id:'b1', title:'Best Family Cars Under £25,000 in 2026', slug:'best-family-cars-under-25000-2026', excerpt:'Finding the right family car on a budget has never been more important. We cut through the noise and pick the genuine standouts under twenty-five grand.', category:'BEST_CARS', coverImage:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80', author:'Jayden', readTime:6, featured:true, publishedAt:'2026-04-01' },
  { id:'b2', title:'Is an Electric Car Right for You in 2026?', slug:'is-electric-car-right-for-you-2026', excerpt:"EV ownership has improved dramatically. But it's still not right for everyone. Here's an honest guide to help you decide.", category:'EV_CONTENT', coverImage:'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=1200&q=80', author:'Jayden', readTime:5, featured:false, publishedAt:'2026-04-08' },
  { id:'b3', title:'How to Buy a Used Car Without Getting Ripped Off', slug:'how-to-buy-used-car-without-getting-ripped-off', excerpt:"The used car market can be a minefield. Here's everything you need to know to walk away with the right car at the right price.", category:'BUYING_GUIDES', coverImage:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80', author:'Jayden', readTime:8, featured:true, publishedAt:'2026-04-15' },
];

const MOCK_BLOG_CONTENT = {
  'best-family-cars-under-25000-2026': `If you're shopping for a family car with a £25,000 budget in 2026, the good news is you're spoiled for choice. The bad news? There are so many options that it's genuinely hard to know where to start.

We've put together this guide to cut through the noise and give you the vehicles we'd actually recommend — no sponsored content, no dealer kickbacks.

## Our Top Picks

### 1. Skoda Octavia Estate — From £22,000 used

The Octavia Estate is the most sensible car ever made, and we mean that as a compliment. The boot is vast (640 litres), the interior is genuinely well-built, and running costs are excellent. It shares its platform with the Golf but costs significantly less.

### 2. Toyota RAV4 Hybrid — From £23,500 used

Few cars make as strong a case for themselves as the RAV4 Hybrid. Outstanding reliability, strong fuel economy, and a genuinely spacious cabin. The hybrid system requires zero effort from you — it just makes everything more efficient.

### 3. Volkswagen Tiguan — From £21,000 used

The Tiguan is the benchmark mid-size SUV for good reason. Well-built, refined at motorway speeds, and with enough tech to feel current without being overwhelming. Holds its value well too.

## What to Look For

When shopping with a family in mind, prioritise boot space, ISOFIX points, rear headroom, and running costs over in-car tech or performance. A fast car with a tiny boot is no use when you're loading a pushchair.

## Try DriveMatch

Not sure which of these is right for your specific situation? Our AI matching tool takes into account your exact household size, how you drive, and what matters most to you. It takes 90 seconds.`,

  'is-electric-car-right-for-you-2026': `Electric vehicles have come a long way. Range is better, charging infrastructure has improved, and prices have dropped. But the honest truth is: an EV is still not right for every buyer.

Here's how to work out which camp you fall into.

## You're probably ready for an EV if...

- You have a driveway or garage where you can charge overnight
- Your daily commute is under 150 miles
- You have access to workplace charging
- You do mostly urban or suburban driving

## You might want to wait if...

- You rely entirely on on-street parking with no home charger
- You regularly do 300+ mile journeys without flexibility on timing
- You're buying used and the battery health is unknown
- Your local rapid charging network is unreliable

## The best EVs right now

For most buyers, the **Kia EV6** and **Hyundai Ioniq 6** represent the best overall package: genuine range, rapid charging, and quality interiors. The **MG4** is the value option. The **Tesla Model 3** remains the technology benchmark.

## Running costs — the real picture

The fuel saving is real and significant. Charging at home on a standard overnight tariff costs approximately 2–3p per mile versus 15–18p per mile for petrol. Over 10,000 miles a year, that's a saving of over £1,200.

## Not sure?

Use DriveMatch. Tell us your situation and we'll tell you honestly whether an EV, hybrid, or traditional fuel suits you better. No agenda — just the right answer.`,

  'how-to-buy-used-car-without-getting-ripped-off': `Buying a used car is one of the most financially significant decisions most people make, yet very few people know how to do it well. This guide covers everything from finding the car to handing over the money.

## Step 1 — Know what you want before you look

The biggest mistake buyers make is browsing before they know what they're looking for. Without a clear spec in mind, you're vulnerable to being swayed by a good-looking car that doesn't actually fit your life.

Use DriveMatch to get matched to the right vehicle first, then go searching for that specific car.

## Step 2 — Check the car's history

Before viewing any car, run a history check. This tells you:

- Whether it's been written off
- Whether there's outstanding finance (you'd inherit this debt)
- The full MOT history
- Whether the mileage is consistent

## Step 3 — View in daylight

Always view a car in daylight. Paint defects, rust, and bodywork repairs that are invisible under artificial light become obvious in natural daylight. Walk around the car slowly. Look at panel gaps — uneven gaps suggest a repair.

## Step 4 — Take it for a proper test drive

Not a five-minute loop around a car park. Drive it on the type of roads you actually use. If you commute on the motorway, take it on the motorway.

## Step 5 — Get an independent inspection

For any car over £5,000, pay for an independent vehicle inspection. The AA and RAC both offer this service. It costs around £150–£200 and could save you thousands.

## The golden rule

Walk away if anything feels wrong. There is always another car. Never let urgency pressure you into a decision.`
};

const MOCK_MATCHES = {
  default: { id:'m1', vehicle:'Volkswagen Golf 1.5 TSI Life', category:'Compact Hatchback', priceRange:'£24,000–£28,000 new · £16,000–£20,000 used', fuelType:'Petrol / Mild Hybrid', matchScore:94, pros:['Outstanding all-round ability — handles commuting, family duties, and longer trips equally well','Strong residual values mean lower depreciation than most rivals','Refined and quiet at motorway speeds — significantly better than older generations','Excellent infotainment with wireless Apple CarPlay and Android Auto as standard','Wide dealer network means servicing is convenient and competitive on price'], cons:['Touch-sensitive controls for climate and media can be fiddly while driving','Boot space (381L) is smaller than some rivals at this price point','Options list can push the price significantly above base figure'], summary:"Given your budget and daily commuting needs, the Volkswagen Golf 1.5 TSI Life is an exceptional match. Your preference for low running costs is well served by the efficient mild hybrid powertrain, and the Golf's proven reliability record means ownership costs stay predictable. With private driveway parking and moderate mileage, this car will work hard for you without complaint.", alternatives:[{name:'Skoda Octavia',reason:'More boot space and often cheaper than the Golf despite sharing the same platform and mechanicals.'},{name:'Toyota Corolla Hybrid',reason:'Lower running costs thanks to the hybrid system, with class-leading reliability for buyers who prioritise peace of mind.'},{name:'Mazda3',reason:'More driver-focused with a premium interior feel that punches above its price bracket.'}] },
  family: { id:'m2', vehicle:'Toyota RAV4 2.5 Hybrid Design', category:'Mid-Size SUV', priceRange:'£36,000–£42,000 new · £24,000–£30,000 used', fuelType:'Petrol / Self-Charging Hybrid', matchScore:91, pros:['Class-leading reliability — consistently top-rated in owner satisfaction surveys','Generous space for all occupants with excellent boot capacity (580L)','Self-charging hybrid needs no plugging in — ideal if you vary your routes','High driving position gives great visibility — popular with family buyers','Strong resale values protect your investment'], cons:['Less engaging to drive than European rivals','Infotainment system lags behind class leaders in intuitiveness','Hybrid system is less efficient at sustained motorway speeds'], summary:"With a large family and family transport as your primary use, the Toyota RAV4 Hybrid ticks every practical box. The spacious cabin comfortably accommodates 3+ children, and the hybrid system delivers genuine fuel savings on the school run and local trips. Toyota's outstanding reliability record means you can trust this car to start every morning without drama.", alternatives:[{name:'Hyundai Tucson Hybrid',reason:'Strong rival with a more modern interior and competitive pricing against the RAV4.'},{name:'Kia Sportage Hybrid',reason:'Excellent value, long warranty, and a genuinely impressive interior at this price point.'},{name:'Nissan Qashqai',reason:'Smaller but nimbler option if you want something easier to park in tighter spaces.'}] },
  ev: { id:'m3', vehicle:'Kia EV6 77.4kWh GT-Line', category:'Electric Crossover', priceRange:'£42,000–£48,000 new · £28,000–£36,000 used', fuelType:'Fully Electric', matchScore:89, pros:['Ultra-fast 800V charging — 10% to 80% in approximately 18 minutes on a rapid charger','Impressive 300+ mile real-world range on a single charge','Exceptional interior quality that rivals premium European brands','Engaging driving dynamics with strong performance across all variants',"Kia's 7-year warranty provides exceptional ownership peace of mind"], cons:['Purchase price is higher than equivalent combustion alternatives','Charging network reliability can vary regionally','Rear headroom slightly limited for taller passengers'], summary:"Your preference for a fully electric vehicle combined with a private driveway for home charging makes the Kia EV6 an outstanding match. The 800V architecture means rapid charging stops on longer journeys are genuinely quick — 18 minutes for a meaningful top-up. For your annual mileage, running costs will be significantly lower than any combustion alternative.", alternatives:[{name:'Hyundai Ioniq 6',reason:"Shares the EV6's excellent platform with slightly better efficiency and a more distinctive design."},{name:'Tesla Model 3',reason:'Superior Supercharger network and over-the-air updates, though interior quality divides opinion.'},{name:'BMW i4',reason:'More traditional driving experience with premium brand appeal for buyers who value that.'}] },
};

function getMockMatch(quiz) {
  if (quiz.fuel && quiz.fuel.toLowerCase().includes('electric')) return MOCK_MATCHES.ev;
  if ((quiz.household && quiz.household.toLowerCase().includes('large')) || (quiz.primaryUse && quiz.primaryUse.toLowerCase().includes('family'))) return MOCK_MATCHES.family;
  return MOCK_MATCHES.default;
}

/* ── API WRAPPER ───────────────────────────────────────────────── */
const API = {
  async match(quizData) {
    if (TEST_MODE) {
      await delay(2200);
      return getMockMatch(quizData);
    }
    const r = await fetch('/api/match', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(quizData) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Match failed');
    return j.data;
  },

  async getReviews(rating='all', page=1, limit=6) {
    if (TEST_MODE) {
      await delay(400);
      let filtered = [...MOCK_REVIEWS];
      if (rating !== 'all') {
        if (rating === '1-2') filtered = filtered.filter(r => r.rating <= 2);
        else filtered = filtered.filter(r => r.rating === parseInt(rating));
      }
      const total = filtered.length;
      const pages = Math.ceil(total / limit);
      const data = filtered.slice((page-1)*limit, page*limit);
      return { data, total, page, pages };
    }
    const params = new URLSearchParams({ rating, page, limit });
    const r = await fetch(`/api/reviews?${params}`);
    return r.json();
  },

  async postReview(form) {
    if (TEST_MODE) {
      await delay(800);
      return { ...form, id:`r_${Date.now()}`, helpful:0, verified:false, createdAt:new Date().toISOString().split('T')[0] };
    }
    const r = await fetch('/api/reviews', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    return j.data;
  },

  async helpful(id) {
    if (TEST_MODE) { await delay(200); return; }
    await fetch(`/api/reviews/${id}/helpful`, { method:'POST' });
  },

  async submitLead(payload) {
    if (TEST_MODE) { await delay(1000); console.log('[TEST MODE] Lead:', payload); return { id:'lead_test' }; }
    const r = await fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    return j.data;
  },

  async submitNotify(payload) {
    if (TEST_MODE) { await delay(800); console.log('[TEST MODE] Notify:', payload); return { id:'notify_test' }; }
    const r = await fetch('/api/notify', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    return j.data;
  },

  async getBlogPosts(category='', limit=20) {
    if (TEST_MODE) {
      await delay(300);
      let posts = [...MOCK_BLOG_POSTS];
      if (category) posts = posts.filter(p => p.category === category);
      return posts.slice(0, limit);
    }
    const params = new URLSearchParams({ limit });
    if (category) params.set('category', category);
    const r = await fetch(`/api/blog?${params}`);
    const j = await r.json();
    return j.data;
  },

  async getBlogPost(slug) {
    if (TEST_MODE) {
      await delay(300);
      const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);
      if (!post) throw new Error('Not found');
      return { ...post, content: MOCK_BLOG_CONTENT[slug] || '' };
    }
    const r = await fetch(`/api/blog/${slug}`);
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    return j.data;
  },
};

/* ── HELPERS ───────────────────────────────────────────────────── */
function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

function getCarImage(vehicle, category, fuelType) {
  const v = `${vehicle} ${category} ${fuelType}`.toLowerCase();
  if (v.includes('electric') || v.includes('ev') || v.includes('tesla') || v.includes('ioniq') || v.includes('kia ev')) return 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=1200&q=80';
  if (v.includes('suv') || v.includes('crossover') || v.includes('rav4') || v.includes('qashqai') || v.includes('tucson') || v.includes('tiguan')) return 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80';
  if (v.includes('sport') || v.includes('gti') || v.includes('m3') || v.includes('amg') || v.includes('coupe') || v.includes('mustang')) return 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200&q=80';
  if (v.includes('bmw') || v.includes('mercedes') || v.includes('audi') || v.includes('lexus') || v.includes('porsche')) return 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80';
  if (v.includes('estate') || v.includes('touring') || v.includes('octavia')) return 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1200&q=80';
  return 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80';
}

function getAvatarColor(name) {
  const colors = ['#1d4ed8','#059669','#d97706','#7c3aed','#dc2626','#0891b2','#65a30d','#db2777'];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[Math.abs(hash)];
}

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
}

function getCatLabel(cat) {
  return { CAR_REVIEWS:'Car Reviews', BUYING_GUIDES:'Buying Guides', BEST_CARS:'Best Cars', EV_CONTENT:'Electric Vehicles', FINANCE:'Finance', INDUSTRY_NEWS:'Industry News', DRIVEMATCH_STORIES:'DriveMatch Stories' }[cat] || cat;
}

function stars(n, readonly=true) {
  return [1,2,3,4,5].map(i => `<span class="star-btn${i<=n?' active':''}"${readonly?'':` data-star="${i}"`}>★</span>`).join('');
}

function el(tag, attrs={}, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => { if (k==='class') e.className=v; else if (k==='style') e.style.cssText=v; else e.setAttribute(k,v); });
  children.forEach(c => { if (typeof c==='string') e.innerHTML+=c; else if (c) e.appendChild(c); });
  return e;
}

function toast(msg, type='success') {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${type==='error'?'#dc2626':'#059669'};color:#fff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;font-family:var(--font-body);z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:fadeUp .3s ease;max-width:90vw;text-align:center;`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3600);
}

/* ── NAVBAR ACTIVE LINK ────────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
}

/* ── VEHICLE DATABASE LOOKUP ───────────────────────────────────── */
var vehicleDatabase = null;

function loadVehicleDatabase() {
  if (vehicleDatabase) return Promise.resolve(vehicleDatabase);
  var base = window.location.pathname.includes('/pages/') ? '../' : '';
  return fetch(base + 'data/vehicles.json')
    .then(function(r) { return r.json(); })
    .then(function(db) {
      vehicleDatabase = db.vehicles;
      return vehicleDatabase;
    })
    .catch(function() {
      vehicleDatabase = [];
      return [];
    });
}

document.addEventListener('DOMContentLoaded', function() { loadVehicleDatabase(); });

function findVehicleByName(name) {
  if (!vehicleDatabase) return null;
  var nameLower = name.toLowerCase().trim();
  var match = vehicleDatabase.find(function(v) {
    return (v.make + ' ' + v.model + ' ' + v.variant).toLowerCase() === nameLower;
  });
  if (match) return match;
  match = vehicleDatabase.find(function(v) {
    var full = (v.make + ' ' + v.model).toLowerCase();
    var nameWords = nameLower.split(' ').slice(0, 2).join(' ');
    return nameLower.includes(full) || full.includes(nameWords);
  });
  return match || null;
}

function openVehicleModal(el) {
  var vehicleName = el.getAttribute('data-vehicle');
  loadVehicleDatabase().then(function() {
    var v = findVehicleByName(vehicleName);
    renderVehicleModal(vehicleName, v);
  });
}

function renderVehicleModal(name, v) {
  var existing = document.getElementById('vehicle-detail-modal');
  if (existing) existing.remove();

  var reliabilityColor = { excellent: '#059669', good: '#16a34a', average: '#d97706', below_average: '#dc2626' };
  var runningColor = { very_low: '#059669', low: '#16a34a', medium: '#d97706', high: '#dc2626', very_high: '#dc2626' };
  var runningLabel = { very_low: 'Very Low', low: 'Low', medium: 'Medium', high: 'High', very_high: 'Very High' };
  var reliabilityLabel = { excellent: 'Excellent', good: 'Good', average: 'Average', below_average: 'Below Average' };

  var bodyHTML = '';

  if (v) {
    var priceNew = v.price_new_min > 0
      ? '\u00a3' + v.price_new_min.toLocaleString() + '\u2013\u00a3' + v.price_new_max.toLocaleString()
      : 'Not available new';
    var priceUsed = v.price_used_min > 0
      ? '\u00a3' + v.price_used_min.toLocaleString() + '\u2013\u00a3' + v.price_used_max.toLocaleString()
      : 'N/A';
    var economy = v.real_range_miles
      ? v.real_range_miles + ' miles range'
      : v.real_mpg + ' MPG real-world';

    bodyHTML =
      '<div class="vd-stats-grid">' +
        '<div class="vd-stat"><div class="vd-stat-label">Body Style</div><div class="vd-stat-value">' + v.body_style.charAt(0).toUpperCase() + v.body_style.slice(1) + '</div></div>' +
        '<div class="vd-stat"><div class="vd-stat-label">Fuel Type</div><div class="vd-stat-value">' + v.fuel_type.replace(/_/g, ' ') + '</div></div>' +
        '<div class="vd-stat"><div class="vd-stat-label">Seats</div><div class="vd-stat-value">' + v.seats + '</div></div>' +
        '<div class="vd-stat"><div class="vd-stat-label">Boot Space</div><div class="vd-stat-value">' + v.boot_litres + 'L</div></div>' +
        '<div class="vd-stat"><div class="vd-stat-label">Towing</div><div class="vd-stat-value">' + (v.towing_kg > 0 ? v.towing_kg + 'kg' : 'None') + '</div></div>' +
        '<div class="vd-stat"><div class="vd-stat-label">Insurance Group</div><div class="vd-stat-value">' + (v.insurance_group || 'N/A') + '</div></div>' +
      '</div>' +

      '<div class="vd-row">' +
        '<div class="vd-pill">' +
          '<span class="vd-pill-label">Reliability</span>' +
          '<span class="vd-pill-value" style="color:' + (reliabilityColor[v.reliability] || '#64748b') + ';">' + (reliabilityLabel[v.reliability] || v.reliability) + '</span>' +
        '</div>' +
        '<div class="vd-pill">' +
          '<span class="vd-pill-label">Running Costs</span>' +
          '<span class="vd-pill-value" style="color:' + (runningColor[v.running_cost] || '#64748b') + ';">' + (runningLabel[v.running_cost] || v.running_cost) + '</span>' +
        '</div>' +
        '<div class="vd-pill" style="background:#eff6ff;border-color:#bfdbfe;">' +
          '<span class="vd-pill-label">Economy</span>' +
          '<span class="vd-pill-value" style="color:#1d4ed8;">' + economy + '</span>' +
        '</div>' +
      '</div>' +

      '<div class="vd-prices">' +
        '<div class="vd-price-block"><div class="vd-price-label">New price range</div><div class="vd-price-value">' + priceNew + '</div></div>' +
        '<div class="vd-price-block"><div class="vd-price-label">Used price range</div><div class="vd-price-value">' + priceUsed + '</div></div>' +
      '</div>' +

      '<div class="vd-section">' +
        '<div class="vd-section-label">Best suited for</div>' +
        '<div class="vd-tags">' +
          v.best_for.map(function(t) {
            return '<span class="vd-tag vd-tag-green">' + t.replace(/_/g, ' ') + '</span>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="vd-section">' +
        '<div class="vd-section-label">Less suited for</div>' +
        '<div class="vd-tags">' +
          v.avoid_for.map(function(t) {
            return '<span class="vd-tag vd-tag-amber">' + t.replace(/_/g, ' ') + '</span>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="vd-notes">' +
        '<svg width="14" height="14" fill="#1d4ed8" viewBox="0 0 24 24" style="flex-shrink:0;margin-top:2px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' +
        '<span>' + v.notes + '</span>' +
      '</div>';

  } else {
    bodyHTML =
      '<div style="text-align:center;padding:40px 0;">' +
        '<div style="font-size:40px;margin-bottom:14px;">&#x1F50D;</div>' +
        '<p style="color:var(--slate-500);font-size:14px;line-height:1.7;">Detailed specs for this vehicle are not in our database yet, but our AI recommended it based on your profile. You can research it further on What Car, Parkers, or the manufacturer website.</p>' +
      '</div>';
  }

  var overlay = document.createElement('div');
  overlay.id = 'vehicle-detail-modal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML =
    '<div class="modal" style="max-width:520px;">' +
      '<div style="background:var(--navy);padding:24px 28px;display:flex;justify-content:space-between;align-items:flex-start;gap:16px;">' +
        '<div>' +
          '<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--slate-400);margin-bottom:6px;">Vehicle Overview</p>' +
          '<h3 style="color:#fff;font-size:1.15rem;line-height:1.25;margin:0;">' + name + '</h3>' +
        '</div>' +
        '<button onclick="closeVehicleModal()" style="background:none;border:none;cursor:pointer;color:rgba(255,255,255,.5);padding:4px;flex-shrink:0;">' +
          '<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
      '<div style="padding:24px 28px;max-height:60vh;overflow-y:auto;">' +
        bodyHTML +
      '</div>' +
      '<div style="padding:14px 28px;border-top:1px solid var(--slate-100);background:var(--slate-50);">' +
        '<button onclick="closeVehicleModal()" class="btn btn-secondary btn-sm" style="width:100%;">Close</button>' +
      '</div>' +
    '</div>';

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeVehicleModal();
  });

  document.body.appendChild(overlay);
  requestAnimationFrame(function() { overlay.classList.add('open'); });
}

function closeVehicleModal() {
  var modal = document.getElementById('vehicle-detail-modal');
  if (modal) {
    modal.classList.remove('open');
    setTimeout(function() { if (modal && modal.parentNode) modal.parentNode.removeChild(modal); }, 200);
  }
}


/* ── NETLIFY FORM SUBMISSIONS ───────────────────────────────────── */
function netlifySubmitMatch(quizData, matchResult) {
  try {
    var body = new URLSearchParams({
      'form-name':   'drivematch-match',
      'vehicle':      matchResult.vehicle     || '',
      'match_score':  String(matchResult.matchScore || ''),
      'category':     matchResult.category    || '',
      'fuel_type':    matchResult.fuelType     || '',
      'price_range':  matchResult.priceRange   || '',
      'budget':       quizData.budget         || '',
      'primary_use':  quizData.primaryUse     || '',
      'household':    quizData.household      || '',
      'fuel_pref':    quizData.fuel           || '',
      'mileage':      quizData.mileage        || '',
      'priority':     quizData.priority       || '',
      'parking':      quizData.parking        || '',
      'condition':    quizData.condition      || '',
      'body_style':   quizData.bodyStyle      || '',
      'extra_notes':  quizData.extraNotes     || '',
      'summary':      (matchResult.summary || '').slice(0, 500),
      'submitted_at': new Date().toISOString(),
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(function() {
      // Silent fail — non-critical background operation
    });
  } catch (e) {
    // Silent fail
  }
}

function netlifySubmitNotify(name, email, quizData, matchResult) {
  try {
    var body = new URLSearchParams({
      'form-name':   'drivematch-notify',
      'name':         name,
      'email':        email,
      'vehicle':      matchResult ? (matchResult.vehicle || '') : '',
      'match_score':  matchResult ? String(matchResult.matchScore || '') : '',
      'budget':       quizData ? (quizData.budget      || '') : '',
      'primary_use':  quizData ? (quizData.primaryUse  || '') : '',
      'household':    quizData ? (quizData.household   || '') : '',
      'fuel_pref':    quizData ? (quizData.fuel        || '') : '',
      'priority':     quizData ? (quizData.priority    || '') : '',
      'extra_notes':  quizData ? (quizData.extraNotes  || '') : '',
      'submitted_at': new Date().toISOString(),
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(function() {
      // Silent fail
    });
  } catch (e) {
    // Silent fail
  }
}

/* ── SHARED NAV + FOOTER INJECTION ────────────────────────────── */
function injectShell() {
  // Work out if we're in the /pages/ subfolder or at the root
  const inPages = window.location.pathname.includes('/pages/');
  const root    = inPages ? '../' : '';        // path back to root
  const pages   = inPages ? '' : 'pages/';    // path to pages/ folder

  // Banner
  if (TEST_MODE) {
    const b = document.createElement('div');
    b.className = 'test-banner';
    b.innerHTML = `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>TEST MODE — AI matching and all interactions use mock data. No real API calls.`;
    document.body.insertBefore(b, document.body.firstChild);
  }

  // Navbar
  const nav = document.createElement('header');
  nav.innerHTML = `
    <nav class="navbar">
      <div class="container navbar-inner">
        <a href="${root}index.html" class="navbar-logo">
          <div class="navbar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></svg>
          </div>
          <span class="navbar-logo-text">Drive<span>Match</span></span>
        </a>
        <ul class="navbar-links">
          <li><a href="${root}index.html">Find a Vehicle</a></li>
          <li><a href="${pages}reviews.html">Reviews</a></li>
          <li><a href="${pages}blog.html">Blog</a></li>
          <li><a href="${pages}about.html">About</a></li>
          <li><a href="${pages}how-it-works.html">How It Works</a></li>
        </ul>
        <div class="navbar-cta">
          <div class="ai-badge"><span class="dot"></span>AI Powered</div>
          <a href="${root}index.html#quiz" class="btn btn-primary btn-sm">Get Matched</a>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav-mobile-overlay" id="nav-mobile-overlay"></div>
    <div class="nav-mobile" id="nav-mobile">
      <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">&times;</button>
      <ul class="nav-mobile-links">
        <li><a href="${root}index.html">Find a Vehicle</a></li>
        <li><a href="${pages}reviews.html">Reviews</a></li>
        <li><a href="${pages}blog.html">Blog</a></li>
        <li><a href="${pages}about.html">About</a></li>
        <li><a href="${pages}how-it-works.html">How It Works</a></li>
      </ul>
      <div class="nav-mobile-cta">
        <a href="${root}index.html" class="btn btn-primary" style="width:100%;justify-content:center;">Get Matched — Free</a>
      </div>
    </div>`;
  document.body.insertBefore(nav, TEST_MODE ? document.body.children[1] : document.body.firstChild);

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const mobileOverlay = document.getElementById('nav-mobile-overlay');
  const mobileClose = document.getElementById('nav-mobile-close');
  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);
  mobileOverlay.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // Footer
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${root}index.html" class="navbar-logo" style="text-decoration:none">
            <div class="navbar-logo-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></svg></div>
            <span class="navbar-logo-text" style="color:#fff">Drive<span>Match</span></span>
          </a>
          <p>DriveMatch tells you exactly which car fits your life — then finds it, checks it, and sorts it for you. No showroom visits, no endless scrolling, no guesswork.</p>
          <div class="footer-indie">Independent advice — no dealer commission</div>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <ul class="footer-links">
            <li><a href="${root}index.html">Find a Vehicle</a></li>
            <li><a href="${pages}reviews.html">Owner Reviews</a></li>
            <li><a href="${pages}blog.html">Blog</a></li>
            <li><a href="${pages}how-it-works.html">How It Works</a></li>
            <li><a href="${pages}about.html">About DriveMatch</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-links">
            <li><a href="mailto:hello@drivematch.co.uk">hello@drivematch.co.uk</a></li>
            <li><span>UK Only · Est. 2026</span></li>
          </ul>
          <div class="footer-social">
            <a href="#">YouTube</a>
            <a href="#">TikTok</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} DriveMatch. All rights reserved. UK registered business.</p>
        <p>DriveMatch does not facilitate finance. Independent vehicle matching only.</p>
      </div>
    </div>`;
  document.body.appendChild(footer);

  setActiveNav();
}

document.addEventListener('DOMContentLoaded', injectShell);

/* ── CONVERSATIONAL ONBOARDING ────────────────────────────────── */

var OB_STEPS = [
  {
    id: 'budget',
    eyebrow: 'Step 1',
    question: "What's your budget?",
    sub: 'This helps us focus on vehicles genuinely available to you.',
    type: 'pills',
    options: [
      { label: 'Under £5,000',       icon: '💷' },
      { label: 'Under £10,000',      icon: '💷' },
      { label: '£10,000–£20,000',   icon: '💷' },
      { label: '£20,000–£35,000',   icon: '💷' },
      { label: '£35,000–£60,000',   icon: '💷' },
      { label: '£60,000–£100,000',  icon: '💷' },
      { label: 'Over £100,000',      icon: '💷' },
    ]
  },
  {
    id: 'primaryUse',
    eyebrow: 'Step 2',
    question: "What will you mainly use it for?",
    sub: 'Pick the one that best describes your typical driving.',
    type: 'pills',
    options: [
      { label: 'Daily commuting',           icon: '🏙️' },
      { label: 'Family transport',          icon: '👨‍👩‍👧' },
      { label: 'Long distance / motorway',  icon: '🛣️' },
      { label: 'Off-road / countryside',    icon: '🌿' },
      { label: 'City driving only',         icon: '🚦' },
      { label: 'Weekend & leisure',         icon: '🏖️' },
      { label: 'Business travel',           icon: '💼' },
      { label: 'Towing / hauling',          icon: '🔗' },
    ]
  },
  {
    id: 'household',
    eyebrow: 'Step 3',
    question: "Who's the car for?",
    sub: "This tells us how much space and how many seats you'll actually need.",
    type: 'pills',
    options: [
      { label: 'Just me',                      icon: '🙋' },
      { label: 'Couple',                        icon: '👫' },
      { label: 'Small family (1–2 children)',  icon: '👨‍👩‍👦' },
      { label: 'Large family (3+ children)',   icon: '👨‍👩‍👧‍👦' },
    ]
  },
  {
    id: 'fuel',
    eyebrow: 'Step 4',
    question: "Any preference on fuel type?",
    sub: "Not sure? No preference is completely fine — we'll factor it in.",
    type: 'pills',
    options: [
      { label: 'Petrol',                 icon: '⛽' },
      { label: 'Diesel',                 icon: '🛢️' },
      { label: 'Fully electric (EV)',    icon: '⚡' },
      { label: 'Plug-in hybrid (PHEV)',  icon: '🔌' },
      { label: 'Mild hybrid',            icon: '🌿' },
      { label: 'No preference',         icon: '✦' },
    ]
  },
  {
    id: 'mileage',
    eyebrow: 'Step 5',
    question: "Roughly how many miles a year?",
    sub: "This affects which fuel type and running cost profile makes most sense for you.",
    type: 'pills',
    options: [
      { label: 'Under 5,000 miles',      icon: '📍' },
      { label: '5,000–10,000 miles',    icon: '📍' },
      { label: '10,000–20,000 miles',   icon: '📍' },
      { label: 'Over 20,000 miles',      icon: '📍' },
      { label: "I don't know",           icon: '🤷' },
    ]
  },
  {
    id: 'priority',
    eyebrow: 'Step 6',
    question: "What matters most to you?",
    sub: "Be honest — this shapes the whole recommendation.",
    type: 'pills',
    options: [
      { label: 'Practicality & space',   icon: '📦' },
      { label: 'Low running costs',      icon: '💰' },
      { label: 'Driving enjoyment',      icon: '🏎️' },
      { label: 'Comfort & refinement',   icon: '🛋️' },
      { label: 'Safety & reliability',   icon: '🛡️' },
      { label: 'Prestige & image',       icon: '⭐' },
      { label: 'First time driver',      icon: '🔑' },
    ]
  },
  {
    id: 'parking',
    eyebrow: 'Step 7',
    question: "Where do you park at home?",
    sub: "This affects vehicle size recommendations and EV charging suitability.",
    type: 'pills',
    options: [
      { label: 'Private driveway / garage', icon: '🏠' },
      { label: 'Street parking only',       icon: '🛣️' },
      { label: 'Shared car park',           icon: '🅿️' },
      { label: 'Varies',                    icon: '🔄' },
    ]
  },
  {
    id: 'condition',
    eyebrow: 'Step 8',
    question: "New or used?",
    sub: "Nearly new often gives you the best of both — lower cost, like-new condition.",
    type: 'pills',
    options: [
      { label: 'Brand new',                   icon: '✨' },
      { label: 'Nearly new (under 3 years)',  icon: '🆕' },
      { label: 'Used (any age)',              icon: '🔍' },
      { label: 'No preference',              icon: '✦' },
    ]
  },
  {
    id: 'bodyStyle',
    eyebrow: 'Step 9',
    question: "Any preference on body style?",
    sub: "No preference? We'll recommend whatever fits your profile best.",
    type: 'pills',
    options: [
      { label: 'No preference',          icon: '✦' },
      { label: 'Hatchback',             icon: '🚗' },
      { label: 'Saloon',                icon: '🚘' },
      { label: 'Estate',                icon: '🚙' },
      { label: 'SUV / Crossover',       icon: '🚐' },
      { label: 'MPV / People carrier',  icon: '🚌' },
      { label: 'Coupé / Convertible',   icon: '🏎️' },
      { label: 'Pickup truck',          icon: '🛻' },
      { label: 'Van',                   icon: '🚚' },
    ]
  },
  {
    id: 'extraNotes',
    eyebrow: 'Step 10',
    question: "Anything else we should know?",
    sub: "Tow bar needed? Prefer a specific brand? Want Apple CarPlay? This is your chance.",
    type: 'text',
    optional: true
  }
];

var obCurrentStep = 0;
var obAnswers = {};
var obTransitioning = false;
var loaderInterval = null;
var loaderStep = 0;

function startOnboarding() {
  obCurrentStep = 0;
  obAnswers = {};
  obTransitioning = false;

  var overlay = document.getElementById('onboarding-overlay');
  overlay.style.display = 'flex';
  // Force reflow then fade in
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      overlay.classList.add('ob-visible');
    });
  });

  document.body.style.overflow = 'hidden';
  renderObStep(0, false);
}

function closeOnboarding() {
  var overlay = document.getElementById('onboarding-overlay');
  overlay.classList.remove('ob-visible');
  setTimeout(function() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function renderObStep(index, animate) {
  var step = OB_STEPS[index];
  var total = OB_STEPS.length;

  // Progress
  var fillPct = (index / total) * 100;
  document.getElementById('ob-progress-fill').style.width = fillPct + '%';
  document.getElementById('ob-progress-label').textContent = 'Question ' + (index + 1) + ' of ' + total;

  // Back button
  var backBtn = document.getElementById('ob-back');
  if (index === 0) {
    backBtn.classList.add('ob-hidden');
  } else {
    backBtn.classList.remove('ob-hidden');
  }

  var wrap = document.getElementById('ob-question-wrap');

  function doRender() {
    document.getElementById('ob-eyebrow').textContent = step.eyebrow;
    document.getElementById('ob-question').textContent = step.question;
    document.getElementById('ob-sub').textContent = step.sub || '';

    var optionsEl = document.getElementById('ob-options');
    var textWrap   = document.getElementById('ob-text-wrap');

    if (step.type === 'text') {
      optionsEl.innerHTML = '';
      optionsEl.style.display = 'none';
      textWrap.style.display = 'flex';
      var ta = document.getElementById('ob-textarea');
      ta.value = obAnswers['extraNotes'] || '';
      setTimeout(function() { ta.focus(); }, 100);
    } else {
      textWrap.style.display = 'none';
      optionsEl.style.display = 'flex';
      optionsEl.innerHTML = '';

      step.options.forEach(function(opt) {
        var btn = document.createElement('button');
        btn.className = 'ob-pill';
        btn.innerHTML = '<span class="ob-pill-icon">' + opt.icon + '</span>' + opt.label;

        if (obAnswers[step.id] === opt.label) {
          btn.classList.add('ob-selected');
        }

        btn.addEventListener('click', function() {
          if (obTransitioning) return;
          obAnswers[step.id] = opt.label;

          // Visual feedback — briefly highlight selection
          optionsEl.querySelectorAll('.ob-pill').forEach(function(p) { p.classList.remove('ob-selected'); });
          btn.classList.add('ob-selected');

          // Auto-advance after brief pause
          setTimeout(function() { obAdvance(); }, 320);
        });

        optionsEl.appendChild(btn);
      });
    }

    if (animate) {
      wrap.classList.remove('ob-fade-out');
      wrap.classList.add('ob-fade-in');
      setTimeout(function() { wrap.classList.remove('ob-fade-in'); }, 400);
    }
  }

  if (animate) {
    obTransitioning = true;
    wrap.classList.add('ob-fade-out');
    setTimeout(function() {
      doRender();
      obTransitioning = false;
    }, 250);
  } else {
    doRender();
  }
}

function obAdvance() {
  if (obTransitioning) return;
  var next = obCurrentStep + 1;

  if (next >= OB_STEPS.length) {
    obFinish();
    return;
  }

  obCurrentStep = next;
  renderObStep(obCurrentStep, true);
}

function obBack() {
  if (obTransitioning || obCurrentStep === 0) return;
  obCurrentStep--;
  renderObStep(obCurrentStep, true);
}

function obSkip() {
  delete obAnswers['extraNotes'];
  obFinish();
}

function obTextContinue() {
  var val = document.getElementById('ob-textarea').value.trim();
  if (val) obAnswers['extraNotes'] = val;
  obFinish();
}

function obFinish() {
  // Build quiz data from answers
  var quizData = {
    budget:      obAnswers.budget      || '',
    primaryUse:  obAnswers.primaryUse  || '',
    household:   obAnswers.household   || '',
    fuel:        obAnswers.fuel        || '',
    mileage:     obAnswers.mileage === "I don't know" ? '' : (obAnswers.mileage || ''),
    priority:    obAnswers.priority    || '',
    parking:     obAnswers.parking     || '',
    condition:   obAnswers.condition   || '',
    bodyStyle:   obAnswers.bodyStyle   || '',
    extraNotes:  obAnswers.extraNotes  || '',
  };

  // Close overlay
  closeOnboarding();

  // Show the result section and run match
  var quizSection = document.getElementById('quiz');
  quizSection.style.display = 'block';

  var teaser = document.getElementById('how-teaser');
  if (teaser) teaser.style.display = 'none';

  // Scroll to result area
  setTimeout(function() {
    quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);

  // Fire the match
  setTimeout(function() {
    runMatchFromOnboarding(quizData);
  }, 400);
}

async function runMatchFromOnboarding(quizData) {
  currentQuizData = quizData;

  // Show loader
  var quizSection = document.getElementById('quiz');
  quizSection.style.display = 'block';
  var loader = document.getElementById('quiz-loader');
  var result  = document.getElementById('quiz-result');
  loader.style.display = 'block';
  result.style.display = 'none';

  startLoaderSteps();

  try {
    var matchResult = await API.match(quizData);
    currentMatch = matchResult;
    stopLoaderSteps();
    showResult(matchResult);
    // Silently save match to Netlify Forms
    netlifySubmitMatch(quizData, matchResult);

    setTimeout(function() {
      var resultEl = document.getElementById('quiz-result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } catch (err) {
    stopLoaderSteps();
    loader.style.display = 'none';
    toast(err.message || 'Something went wrong. Please try again.', 'error');
  }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  var overlay = document.getElementById('onboarding-overlay');
  if (!overlay || overlay.style.display === 'none') return;

  if (e.key === 'Escape') {
    closeOnboarding();
    return;
  }

  if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    if (document.activeElement && document.activeElement.classList.contains('ob-textarea')) return;
    obBack();
    return;
  }
});

// Legacy support — resetQuiz now re-opens onboarding
function resetQuiz() {
  currentMatch = null;
  currentQuizData = null;

  var quizSection = document.getElementById('quiz');
  var loader = document.getElementById('quiz-loader');
  var result  = document.getElementById('quiz-result');

  quizSection.style.display = 'none';
  if (loader) loader.style.display = 'none';
  if (result) result.style.display = 'none';

  var teaser = document.getElementById('how-teaser');
  if (teaser) teaser.style.display = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(startOnboarding, 500);
}

// showSection compatibility — used by tryLowMatchSuggestion
function showSection(section) {
  var loader = document.getElementById('quiz-loader');
  var result  = document.getElementById('quiz-result');
  var quizSection = document.getElementById('quiz');

  if (section === 'loader') {
    quizSection.style.display = 'block';
    if (loader) loader.style.display = 'block';
    if (result) result.style.display = 'none';
  } else if (section === 'result') {
    quizSection.style.display = 'block';
    if (loader) loader.style.display = 'none';
    if (result) result.style.display = 'block';
  } else if (section === 'form') {
    // 'form' means go back to quiz — re-open onboarding
    quizSection.style.display = 'none';
    if (loader) loader.style.display = 'none';
    if (result) result.style.display = 'none';
    startOnboarding();
  }
}

// Legacy getFormData — returns current onboarding answers
function getFormData() { return obAnswers || {}; }
function clearQuiz() { obAnswers = {}; }
function buildQuiz() {}
function onFieldChange() {}
function updateProgress() {}


/* ── SUBMIT ─────────────────────────────────────────────────────── */
async function submitQuiz() {
  var data = getFormData();
  var allRequired = REQUIRED.every(function(k) { return data[k]; });

  if (!allRequired) {
    toast('Please fill in Budget, Primary Use, Household Size, and Fuel Preference', 'error');
    return;
  }

  showSection('loader');
  startLoaderSteps();

  try {
    var result = await API.match(data);
    currentMatch = result;
    currentQuizData = data;
    stopLoaderSteps();
    showResult(result);

    var teaser = document.getElementById('how-teaser');
    if (teaser) teaser.style.display = 'none';

    setTimeout(function() {
      var resultEl = document.getElementById('quiz-result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  } catch (err) {
    stopLoaderSteps();
    showSection('form');
    toast(err.message || 'Something went wrong. Please try again.', 'error');
  }
}

/* ── LOADER STEPS ───────────────────────────────────────────────── */
function startLoaderSteps() {
  loaderStep = 0;
  clearInterval(loaderInterval);

  var steps = document.querySelectorAll('.loader-step');
  steps.forEach(function(s, i) {
    s.classList.remove('active', 'done');
    var dot = s.querySelector('.loader-step-dot');
    if (dot) dot.textContent = '';
    if (i === 0) s.classList.add('active');
  });

  loaderInterval = setInterval(function() {
    var steps = document.querySelectorAll('.loader-step');
    if (loaderStep < steps.length - 1) {
      steps[loaderStep].classList.remove('active');
      steps[loaderStep].classList.add('done');
      var dot = steps[loaderStep].querySelector('.loader-step-dot');
      if (dot) dot.textContent = '✓';
      loaderStep++;
      steps[loaderStep].classList.add('active');
    }
  }, 700);
}

function stopLoaderSteps() {
  clearInterval(loaderInterval);
}

/* ── RENDER RESULT ──────────────────────────────────────────────── */
function showResult(r) {
  var imgUrl     = getCarImage(r.vehicle, r.category, r.fuelType);
  var circ       = 2 * Math.PI * 34;
  var dash       = (r.matchScore / 100) * circ;
  var scoreColor = r.matchScore >= 85 ? '#22c55e' : r.matchScore >= 70 ? '#fbbf24' : '#ef4444';

  var prosHTML = r.pros.map(function(p) { return '<li>' + p + '</li>'; }).join('');
  var consHTML = r.cons.map(function(c) { return '<li>' + c + '</li>'; }).join('');

  var altsHTML = '';
  if (r.alternatives && r.alternatives.length) {
    var altCards = r.alternatives.map(function(a) {
      return '<div class="alt-card alt-card-clickable" onclick="openVehicleModal(this)" data-vehicle="' + a.name.replace(/"/g, '&quot;') + '"><div class="alt-name">' + a.name + '</div><div class="alt-reason">' + a.reason + '</div><div class="alt-learn-more">Learn more &#8594;</div></div>';
    }).join('');
    altsHTML = '<div class="alternatives"><div class="alternatives-title">Also consider &mdash; click any card to learn more</div><div class="alternatives-grid">' + altCards + '</div></div>';
  }

  // ── Low match panel ────────────────────────────────────────────
  var lowMatchHTML = '';
  if (r.matchScore < 70) {
    var suggestions = buildLowMatchSuggestions(r, currentQuizData || {});
    var isVeryLow = r.matchScore < 50;
    var panelBg    = isVeryLow ? '#fef2f2' : '#fffbeb';
    var panelBorder= isVeryLow ? '#fecaca' : '#fde68a';
    var panelIcon  = isVeryLow ? '#dc2626' : '#d97706';
    var panelTitle = isVeryLow
      ? 'This combination is very difficult to match right now'
      : 'A few small changes could significantly improve your match';
    var panelSub = isVeryLow
      ? 'The inputs below are creating hard conflicts. Here are the smallest changes that would unlock better options:'
      : 'Your match score is below 70%. These adjustments would each make a meaningful difference:';

    var suggCards = suggestions.map(function(s) {
      return '<div class="lm-suggestion">' +
        '<div class="lm-suggestion-top">' +
          '<div class="lm-suggestion-field">' + s.field + '</div>' +
          '<div class="lm-suggestion-change">' + s.from + ' &rarr; ' + s.to + '</div>' +
        '</div>' +
        '<div class="lm-suggestion-reason">' + s.reason + '</div>' +
        '<button class="lm-try-btn" onclick="tryLowMatchSuggestion(' + JSON.stringify(s.patch).replace(/"/g, '&quot;') + ')">' +
          'Try this match' +
          '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>' +
        '</button>' +
      '</div>';
    }).join('');

    lowMatchHTML =
      '<div class="low-match-panel" style="border-color:' + panelBorder + ';background:' + panelBg + ';">' +
        '<div class="lm-header">' +
          '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="' + panelIcon + '" stroke-width="2.5" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>' +
          '<div>' +
            '<div class="lm-title" style="color:' + panelIcon + ';">' + panelTitle + '</div>' +
            '<div class="lm-subtitle">' + panelSub + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="lm-suggestions">' + suggCards + '</div>' +
      '</div>';
  }

  var el = document.getElementById('quiz-result');
  el.innerHTML =
    /* ── Car hero image ── */
    '<div class="result-hero">' +
      '<img class="result-hero-img" src="' + imgUrl + '" alt="' + r.vehicle + '" />' +
      '<div class="result-hero-overlay"></div>' +
      '<div class="result-hero-content">' +
        '<div class="result-badges">' +
          '<span class="badge badge-white">★ Best Match</span>' +
          '<span class="badge badge-white">' + r.matchScore + '% Compatibility</span>' +
          (r.category ? '<span class="badge badge-white">' + r.category + '</span>' : '') +
          (r.fuelType ? '<span class="badge badge-white">' + r.fuelType + '</span>' : '') +
        '</div>' +
        '<div class="result-vehicle-name">' + r.vehicle + '</div>' +
        '<div class="result-price">' + r.priceRange + '</div>' +
      '</div>' +
      '<div class="score-ring">' +
        '<svg width="88" height="88" viewBox="0 0 88 88">' +
          '<circle cx="44" cy="44" r="34" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="7"/>' +
          '<circle cx="44" cy="44" r="34" fill="none" stroke="' + scoreColor + '" stroke-width="7"' +
            ' stroke-dasharray="' + dash.toFixed(2) + ' ' + circ.toFixed(2) + '"' +
            ' stroke-dashoffset="' + (circ/4).toFixed(2) + '" stroke-linecap="round"/>' +
          '<text x="44" y="40" text-anchor="middle" fill="white" font-size="15" font-weight="800" font-family="sans-serif">' + r.matchScore + '%</text>' +
          '<text x="44" y="53" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="600" font-family="sans-serif" letter-spacing="1">MATCH</text>' +
        '</svg>' +
      '</div>' +
    '</div>' +

    /* ── Pros / Cons ── */
    /* ── Quick stats bar ── */
    (function() {
      var stats = [];

      // Insurance group
      if (r.insuranceGroup) {
        var insColor = r.insuranceGroup <= 10 ? '#059669' : r.insuranceGroup <= 20 ? '#d97706' : r.insuranceGroup <= 35 ? '#ea580c' : '#dc2626';
        stats.push({ label: 'Insurance Group', value: r.insuranceGroup, color: insColor, icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' });
      }

      // Boot space
      if (r.bootLitres) {
        var bootLabel = r.bootLitres < 250 ? 'Very small' : r.bootLitres < 350 ? 'Small' : r.bootLitres < 500 ? 'Medium' : r.bootLitres < 650 ? 'Large' : 'Very large';
        stats.push({ label: 'Boot Space', value: r.bootLitres + 'L', sub: bootLabel, icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>' });
      }

      // Seats
      if (r.seats) {
        stats.push({ label: 'Seats', value: r.seats, icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' });
      }

      // Economy
      if (r.realRangeMiles && r.realRangeMiles > 0) {
        stats.push({ label: 'Electric Range', value: r.realRangeMiles + ' mi', icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' });
      } else if (r.realMpg && r.realMpg > 0) {
        stats.push({ label: 'Real MPG', value: r.realMpg + ' mpg', icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>' });
      }

      // Reliability
      if (r.reliability) {
        var relColor = { excellent: '#059669', good: '#16a34a', average: '#d97706', 'below_average': '#dc2626' };
        var relLabel = { excellent: 'Excellent', good: 'Good', average: 'Average', 'below_average': 'Below Avg' };
        stats.push({ label: 'Reliability', value: relLabel[r.reliability] || r.reliability, color: relColor[r.reliability] || '#64748b', icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>' });
      }

      // Towing
      if (r.towingKg && r.towingKg > 0) {
        stats.push({ label: 'Towing', value: r.towingKg + 'kg', icon: '<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>' });
      }

      if (stats.length === 0) return '';

      return '<div class="result-stats-bar">' +
        stats.map(function(s) {
          return '<div class="result-stat-item">' +
            '<div class="result-stat-icon">' + s.icon + '</div>' +
            '<div>' +
              '<div class="result-stat-label">' + s.label + '</div>' +
              '<div class="result-stat-value"' + (s.color ? ' style="color:' + s.color + ';"' : '') + '>' + s.value + '</div>' +
              (s.sub ? '<div class="result-stat-sub">' + s.sub + '</div>' : '') +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    })() +

    '<div class="pros-cons">' +
      '<div>' +
        '<div class="pros-cons-title">' +
          '<div class="icon-dot" style="background:#ecfdf5;">' +
            '<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#059669" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' +
          '</div>' +
          '<span style="color:#065f46;">Strengths</span>' +
        '</div>' +
        '<ul class="pros-cons-list pros-list">' + prosHTML + '</ul>' +
      '</div>' +
      '<div>' +
        '<div class="pros-cons-title">' +
          '<div class="icon-dot" style="background:#fffbeb;">' +
            '<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#d97706" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>' +
          '</div>' +
          '<span style="color:#92400e;">Consider</span>' +
        '</div>' +
        '<ul class="pros-cons-list cons-list">' + consHTML + '</ul>' +
      '</div>' +
    '</div>' +

    /* ── Summary ── */
    '<div class="summary-block">' +
      '<div class="summary-label">' +
        '<svg width="14" height="14" fill="#1d4ed8" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' +
        'Why this works for you' +
      '</div>' +
      '<p>' + r.summary + '</p>' +
    '</div>' +

    altsHTML +

    lowMatchHTML +

    /* ── CTAs ── */
    '<div class="result-actions">' +
      '<div class="result-ctas">' +
        '<button class="cta-primary" onclick="openLeadModal()">' +
          '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>' +
          'Find this car for me' +
        '</button>' +
        '<button class="cta-secondary" onclick="openNotifyModal()">' +
          '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>' +
          'Notify when available' +
        '</button>' +
      '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">' +
        '<button class="btn btn-ghost btn-sm" onclick="shareResult()">' +
          '<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>' +
          'Share' +
        '</button>' +
        '<button class="btn btn-ghost btn-sm" onclick="resetQuiz()">' +
          '<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>' +
          'Start over' +
        '</button>' +
        '<a href="pages/reviews.html" class="btn btn-ghost btn-sm">Read reviews</a>' +
      '</div>' +
    '</div>';

  showSection('result');
  scheduleFindPrompt(r.vehicle);
}


/* ── LOW MATCH SUGGESTIONS ──────────────────────────────────────── */
function buildLowMatchSuggestions(result, quiz) {
  var suggestions = [];
  var fuel    = quiz.fuel    || '';
  var budget  = quiz.budget  || '';
  var body    = quiz.bodyStyle || '';
  var use     = quiz.primaryUse || '';
  var household = quiz.household || '';
  var condition = quiz.condition || '';

  // EV + low budget conflict
  if (fuel.includes('electric') && (budget === 'Under £5,000' || budget === 'Under £10,000' || budget === '£10,000–£20,000')) {
    suggestions.push({
      field: 'Fuel Preference',
      from: 'Fully electric (EV)',
      to: 'Hybrid',
      reason: 'Affordable EVs with adequate range are rare under £20,000. Switching to hybrid keeps your running costs low while opening up 15+ well-matched vehicles including the Toyota Corolla and Kia Niro.',
      patch: { fuel: 'No preference' }
    });
  }

  // EV + long distance conflict
  if (fuel.includes('electric') && use.includes('Long distance')) {
    suggestions.push({
      field: 'Fuel Preference',
      from: 'Fully electric (EV)',
      to: 'Plug-in hybrid (PHEV)',
      reason: 'Long-distance motorway driving is where EVs struggle most — range anxiety and charging stops become real friction. A PHEV gives you electric running for daily use with a petrol engine for long runs. No compromise needed.',
      patch: { fuel: 'Plug-in hybrid (PHEV)' }
    });
  }

  // EV + large family + low budget
  if (fuel.includes('electric') && household.includes('Large') && (budget === 'Under £10,000' || budget === '£10,000–£20,000' || budget === '£20,000–£35,000')) {
    suggestions.push({
      field: 'Budget',
      from: budget,
      to: '£35,000–£60,000',
      reason: 'A large family EV with adequate space simply does not exist under £35,000 in the current market. Increasing your budget to the £35,000–£60,000 range opens the Tesla Model Y, Kia EV6, and Hyundai Ioniq 6 — all of which suit a large family.',
      patch: { budget: '£35,000–£60,000' }
    });
  }

  // SUV body style + very low budget
  if ((body.includes('SUV') || body.includes('Crossover')) && (budget === 'Under £5,000' || budget === 'Under £10,000')) {
    suggestions.push({
      field: 'Body Style',
      from: 'SUV / Crossover',
      to: 'No preference',
      reason: 'SUVs under £10,000 are rare and typically high-mileage. Removing the body style preference opens up practical hatchbacks and estates that cost far less to run at this budget — such as the Skoda Octavia and Ford Focus.',
      patch: { bodyStyle: 'No preference' }
    });
  }

  // Large family + low budget + SUV
  if (household.includes('Large') && (budget === 'Under £10,000' || budget === '£10,000–£20,000') && body.includes('SUV')) {
    suggestions.push({
      field: 'Body Style',
      from: 'SUV / Crossover',
      to: 'MPV / People carrier',
      reason: 'At this budget, an MPV like the Citroen Berlingo or VW Caddy gives you more seats, more boot space, and more reliability than any SUV available. The ride height is lower but the practicality is significantly better for a large family.',
      patch: { bodyStyle: 'MPV / People carrier' }
    });
  }

  // Prestige priority + low budget
  if ((quiz.priority || '').includes('Prestige') && (budget === 'Under £10,000' || budget === '£10,000–£20,000')) {
    suggestions.push({
      field: 'Top Priority',
      from: 'Prestige & image',
      to: 'Safety & reliability',
      reason: 'Prestige vehicles at this budget are typically high-mileage examples with significant service costs ahead. Prioritising reliability instead gives you a well-maintained Toyota, Honda, or Mazda that costs less to run and is less likely to surprise you.',
      patch: { priority: 'Safety & reliability' }
    });
  }

  // Diesel + city only
  if (fuel === 'Diesel' && use.includes('City')) {
    suggestions.push({
      field: 'Fuel Preference',
      from: 'Diesel',
      to: 'Petrol',
      reason: "Diesel engines need regular motorway runs to stay healthy — short city trips cause diesel particulate filter issues and increased wear. A petrol or mild hybrid is far better suited to city-only use and will cost less in servicing.",
      patch: { fuel: 'Petrol' }
    });
  }

  // Brand new + low budget
  if (condition === 'Brand new' && (budget === 'Under £5,000' || budget === 'Under £10,000' || budget === '£10,000–£20,000')) {
    suggestions.push({
      field: 'New or Used?',
      from: 'Brand new',
      to: 'Nearly new (under 3 years)',
      reason: 'Very few new cars are available under £20,000 and the ones that are have limited specifications. Switching to nearly new opens up a significantly wider range — you can often get a 1-2 year old version of a much better car for the same money.',
      patch: { condition: 'Nearly new (under 3 years)' }
    });
  }

  // Towing + low budget + electric
  if (use.includes('Towing') && fuel.includes('electric') && (budget === 'Under £10,000' || budget === '£10,000–£20,000' || budget === '£20,000–£35,000')) {
    suggestions.push({
      field: 'Fuel Preference',
      from: 'Fully electric (EV)',
      to: 'Diesel',
      reason: 'EVs with a meaningful towing capacity (above 1,500kg) cost over £40,000. For towing within a lower budget, diesel remains the most capable and practical choice — it also handles the sustained high loads of towing better than electric motors at this price point.',
      patch: { fuel: 'Diesel' }
    });
  }

  // New driver / first car with high insurance or unrealistic spec
  if ((quiz.priority || '') === 'First time driver' ||
      (quiz.primaryUse || '').includes('first_car') ||
      (quiz.household || '') === 'Just me' && (budget === 'Under £5,000' || budget === 'Under £10,000')) {
    if (fuel.includes('electric') && (budget === 'Under £5,000' || budget === 'Under £10,000')) {
      suggestions.push({
        field: 'Fuel Preference',
        from: fuel,
        to: 'Petrol',
        reason: "Affordable EVs with low insurance groups and cheap running costs don't yet exist under £10,000. A petrol supermini like the Toyota Aygo, Citroen C1, or VW Polo will cost significantly less to insure and run as a first car.",
        patch: { fuel: 'Petrol' }
      });
    }
  }

  // Generic fallback if no specific suggestions triggered
  if (suggestions.length === 0) {
    if (budget !== 'Over £100,000' && budget !== '£60,000–£100,000') {
      suggestions.push({
        field: 'Budget',
        from: budget,
        to: getNextBudget(budget),
        reason: 'Increasing your budget by one tier is usually the single most effective change — it significantly expands the pool of available vehicles and opens up better-specified, lower-mileage options.',
        patch: { budget: getNextBudget(budget) }
      });
    }
    if (fuel !== 'No preference') {
      suggestions.push({
        field: 'Fuel Preference',
        from: fuel,
        to: 'No preference',
        reason: 'Removing the fuel restriction lets the matching engine consider all powertrains and often finds a significantly better fit — particularly if your budget or use case makes one fuel type difficult to source.',
        patch: { fuel: 'No preference' }
      });
    }
    if (body && body !== 'No preference') {
      suggestions.push({
        field: 'Body Style',
        from: body,
        to: 'No preference',
        reason: 'Removing the body style preference is a low-sacrifice change that opens up the full vehicle pool. You may find a different body style suits your actual needs just as well.',
        patch: { bodyStyle: 'No preference' }
      });
    }
  }

  // Return at most 3 suggestions
  return suggestions.slice(0, 3);
}

function getNextBudget(current) {
  var tiers = ['Under £5,000','Under £10,000','£10,000–£20,000','£20,000–£35,000','£35,000–£60,000','£60,000–£100,000','Over £100,000'];
  var idx = tiers.indexOf(current);
  return idx >= 0 && idx < tiers.length - 1 ? tiers[idx + 1] : current;
}

async function tryLowMatchSuggestion(patchStr) {
  // patchStr comes in as an object from JSON.parse via data attribute
  var patch = typeof patchStr === 'string' ? JSON.parse(patchStr) : patchStr;
  if (!currentQuizData) return;

  // Merge the patch into the current quiz data
  var newData = Object.assign({}, currentQuizData, patch);

  // Update onboarding answers to reflect the change
  Object.keys(patch).forEach(function(key) {
    obAnswers[key] = patch[key];
  });

  // Update stored quiz data and re-run match
  currentQuizData = newData;

  // Show loader and run
  showSection('loader');
  startLoaderSteps();

  try {
    var result = await API.match(newData);
    currentMatch = result;
    stopLoaderSteps();
    showResult(result);
    var teaser = document.getElementById('how-teaser');
    if (teaser) teaser.style.display = 'none';
    setTimeout(function() {
      var resultEl = document.getElementById('quiz-result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } catch (err) {
    stopLoaderSteps();
    showSection('result');
    toast(err.message || 'Something went wrong. Please try again.', 'error');
  }
}

function resetQuiz() {
  currentMatch = null;
  currentQuizData = null;
  showSection('form');
  var teaser = document.getElementById('how-teaser');
  if (teaser) teaser.style.display = '';
  var quizEl = document.getElementById('quiz');
  if (quizEl) window.scrollTo({ top: quizEl.offsetTop - 80, behavior: 'smooth' });
}

function shareResult() {
  if (!currentMatch) return;
  if (navigator.share) {
    navigator.share({
      title: 'DriveMatch — ' + currentMatch.vehicle,
      text: 'I was matched to a ' + currentMatch.vehicle + ' with ' + currentMatch.matchScore + '% compatibility.',
      url: window.location.href
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(function() { toast('Link copied!'); });
  }
}

/* ── MODALS ─────────────────────────────────────────────────────── */
function openLeadModal() {
  if (!currentMatch) return;
  dismissFindPrompt();

  // Re-populate fields in case modal was previously submitted and replaced
  var body = document.getElementById('modal-lead-body');
  if (!document.getElementById('lead-name')) {
    body.innerHTML =
      '<div class="match-summary-chip">' +
        '<div class="chip-icon">🚗</div>' +
        '<div>' +
          '<div class="chip-name" id="lead-vehicle-name"></div>' +
          '<div class="chip-score" id="lead-score"></div>' +
        '</div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">Your Name *</label><input class="form-input" id="lead-name" type="text" placeholder="e.g. James Thompson" /></div>' +
      '<div class="form-group"><label class="form-label">Email Address *</label><input class="form-input" id="lead-email" type="email" placeholder="your@email.com" /></div>' +
      '<div class="form-group"><label class="form-label">Phone Number <span style="font-size:11px;color:var(--slate-400);font-weight:400;text-transform:none;">optional</span></label><input class="form-input" id="lead-phone" type="tel" placeholder="+44 7700 000000" /></div>' +
      '<div class="form-group"><label class="form-label">Preferred Contact</label>' +
        '<div class="contact-pref-grid">' +
          '<button class="pref-btn active" data-pref="email" onclick="selectPref(this)">📧 Email</button>' +
          '<button class="pref-btn" data-pref="phone" onclick="selectPref(this)">📞 Phone</button>' +
          '<button class="pref-btn" data-pref="whatsapp" onclick="selectPref(this)">💬 WhatsApp</button>' +
        '</div>' +
      '</div>' +
      '<div class="form-note">' +
        '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--slate-400);margin-top:1px"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>' +
        "We'll respond within 24 hours. Your details are never shared with third parties." +
      '</div>' +
      '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="submitLead()">Submit Enquiry</button>';
  }

  document.getElementById('lead-vehicle-name').textContent = currentMatch.vehicle;
  document.getElementById('lead-score').textContent = currentMatch.matchScore + '% compatibility match';
  document.getElementById('modal-lead-subtitle').textContent = "We'll source and check your " + currentMatch.vehicle + " on your behalf";
  document.getElementById('modal-lead').classList.add('open');
}

function openNotifyModal() {
  if (!currentMatch) return;

  var body = document.getElementById('modal-notify-body');
  if (!document.getElementById('notify-name')) {
    body.innerHTML =
      '<div class="form-group"><label class="form-label">Your Name *</label><input class="form-input" id="notify-name" type="text" placeholder="e.g. Sarah" /></div>' +
      '<div class="form-group"><label class="form-label">Email Address *</label><input class="form-input" id="notify-email" type="email" placeholder="your@email.com" /></div>' +
      '<p style="font-size:12px;color:var(--slate-400);margin-bottom:20px;line-height:1.65;">When we find a match within your profile, we\'ll reach out personally. No spam, ever.</p>' +
      '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="submitNotify()">' +
        '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>' +
        'Notify Me' +
      '</button>';
  }

  document.getElementById('modal-notify-subtitle').textContent = "We'll keep an eye out for a " + currentMatch.vehicle;
  document.getElementById('modal-notify').classList.add('open');
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/* ── FIND CAR PROMPT ────────────────────────────────────────────── */
var _findPromptTimer = null;

function scheduleFindPrompt(vehicle) {
  // Clear any previous timer and remove any existing banner
  if (_findPromptTimer) { clearTimeout(_findPromptTimer); _findPromptTimer = null; }
  var old = document.getElementById('find-prompt');
  if (old) old.remove();

  _findPromptTimer = setTimeout(function() {
    var el = document.createElement('div');
    el.id = 'find-prompt';
    el.className = 'find-prompt';
    el.innerHTML =
      '<div class="find-prompt-emoji">🚗</div>' +
      '<div class="find-prompt-text">' +
        '<div class="find-prompt-title">Should I find your ' + vehicle + ' for you?</div>' +
        '<div class="find-prompt-sub">Jayden personally sources &amp; checks every vehicle. Free to enquire.</div>' +
      '</div>' +
      '<button class="find-prompt-cta" onclick="findPromptAccept()">Yes, find it for me &rarr;</button>' +
      '<button class="find-prompt-dismiss" onclick="dismissFindPrompt()" aria-label="Dismiss">&#x2715;</button>';
    document.body.appendChild(el);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { el.classList.add('fp-visible'); });
    });
  }, 4000);
}

function findPromptAccept() {
  dismissFindPrompt();
  openLeadModal();
}

function dismissFindPrompt() {
  if (_findPromptTimer) { clearTimeout(_findPromptTimer); _findPromptTimer = null; }
  var el = document.getElementById('find-prompt');
  if (el) {
    el.classList.remove('fp-visible');
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 450);
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

function selectPref(btn) {
  document.querySelectorAll('.pref-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}

async function submitLead() {
  var nameEl  = document.getElementById('lead-name');
  var emailEl = document.getElementById('lead-email');
  var phoneEl = document.getElementById('lead-phone');
  var prefEl  = document.querySelector('.pref-btn.active');

  var name  = nameEl  ? nameEl.value.trim()  : '';
  var email = emailEl ? emailEl.value.trim() : '';
  var phone = phoneEl ? phoneEl.value.trim() : '';
  var pref  = prefEl  ? (prefEl.dataset.pref || 'email') : 'email';

  if (!name || !email) { toast('Please enter your name and email', 'error'); return; }

  var btn = document.querySelector('#modal-lead-body .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

  try {
    await API.submitLead({
      name: name, email: email, phone: phone, contactPref: pref,
      matchId: currentMatch ? currentMatch.id : 'test',
      vehicle: currentMatch ? currentMatch.vehicle : '',
      matchScore: currentMatch ? currentMatch.matchScore : 0,
      summary: currentMatch ? currentMatch.summary : ''
    });

    document.getElementById('modal-lead-body').innerHTML =
      '<div class="modal-success">' +
        '<div class="modal-success-icon">✅</div>' +
        '<h3 style="font-size:1.2rem;margin-bottom:8px;">Enquiry received!</h3>' +
        '<p style="font-size:14px;color:var(--slate-600);margin-bottom:24px;">We\'re on it. You\'ll hear from us within 24 hours regarding your ' + (currentMatch ? currentMatch.vehicle : 'vehicle') + '.</p>' +
        '<button class="btn btn-secondary btn-md" style="width:100%;" onclick="closeModal(\'modal-lead\')">Close</button>' +
      '</div>';

    toast("Enquiry submitted! We'll be in touch within 24 hours.");
  } catch (err) {
    toast('Something went wrong. Please try again.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Enquiry'; }
  }
}

async function submitNotify() {
  var nameEl  = document.getElementById('notify-name');
  var emailEl = document.getElementById('notify-email');

  var name  = nameEl  ? nameEl.value.trim()  : '';
  var email = emailEl ? emailEl.value.trim() : '';

  if (!name || !email) { toast('Please enter your name and email', 'error'); return; }

  var btn = document.querySelector('#modal-notify-body .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Setting up...'; }

  try {
    await API.submitNotify({
      name: name, email: email,
      vehicle: currentMatch ? currentMatch.vehicle : '',
      matchId: currentMatch ? currentMatch.id : 'test'
    });
    // Save to Netlify Forms
    netlifySubmitNotify(name, email, currentQuizData, currentMatch);

    document.getElementById('modal-notify-body').innerHTML =
      '<div class="modal-success">' +
        '<div class="modal-success-icon" style="font-size:32px;">🔔</div>' +
        '<h3 style="font-size:1.2rem;margin-bottom:8px;">You\'re on the list</h3>' +
        '<p style="font-size:14px;color:var(--slate-600);margin-bottom:24px;">We\'ll personally keep an eye out for a <strong>' + (currentMatch ? currentMatch.vehicle : 'vehicle') + '</strong> and reach out when we find something worth your time.</p>' +
        '<button class="btn btn-secondary btn-md" style="width:100%;" onclick="closeModal(\'modal-notify\')">Close</button>' +
      '</div>';
  } catch (err) {
    toast('Something went wrong. Please try again.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Notify Me'; }
  }
}
