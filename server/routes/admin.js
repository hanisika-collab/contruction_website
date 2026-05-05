// server/routes/admin.js
// ─── Admin Auth + Package CRUD ───────────────────────────

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// ── In-memory package store (replace with DB model in production) ──
// For production, create a Package Sequelize model similar to Project.js
let packages = [
  {
    id: 1,
    name: 'Classic',
    tagline: 'Quality craftsmanship, enduring value',
    price: '1,950',
    badge: '',
    featured: false,
    features: [
      'Standard wire-cut bricks',
      'Premium vitrified tile flooring',
      'Internal putty & primer finish',
      'Standard CP sanitary fittings',
      'Basic modular electrical layout',
      'Weather shield exterior paint',
    ],
  },
  {
    id: 2,
    name: 'Royale',
    tagline: 'Where taste meets performance',
    price: '2,250',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Premium wire-cut facing bricks',
      'Full granite floor throughout',
      'Royale & Emulsion premium paints',
      'Jaquar CP series fittings',
      'Concealed modular wiring',
      'False ceiling with LED accents',
      'Modular kitchen shell',
    ],
  },
  {
    id: 3,
    name: 'Elite',
    tagline: 'The pinnacle of residential luxury',
    price: '2,800',
    badge: '',
    featured: false,
    features: [
      'Imported Italian marble floors',
      'Full smart home automation',
      'Solar water heating system',
      'Kohler / TOTO luxury fittings',
      'Full modular kitchen & wardrobes',
      'Dedicated project manager',
      'Post-handover 2-year warranty',
    ],
  },
];
let nextPkgId = 4;

/* ── ADMIN LOGIN ─────────────────────────────────────── */
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  // Replace with real DB lookup + bcrypt in production
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aceconstruct.in';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'ace_secret_key', { expiresIn: '8h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid email or password' });
});

/* ── PACKAGES CRUD ───────────────────────────────────── */

// GET all packages
router.get('/packages', (req, res) => {
  res.json({ success: true, data: packages });
});

// POST create package
router.post('/packages', (req, res) => {
  const { name, tagline, price, badge, featured, features } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'Name and price required' });

  const pkg = { id: nextPkgId++, name, tagline, price, badge, featured: !!featured, features: features || [] };
  packages.push(pkg);
  res.status(201).json({ success: true, data: pkg });
});

// PUT update package
router.put('/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = packages.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Package not found' });

  packages[idx] = { ...packages[idx], ...req.body, id };
  res.json({ success: true, data: packages[idx] });
});

// DELETE package
router.delete('/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  packages = packages.filter(p => p.id !== id);
  res.json({ success: true, message: 'Deleted' });
});

module.exports = router;