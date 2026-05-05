const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // FIX 1: was allowNull: false — admin form description is optional,
  // so an empty string was failing DB NOT NULL constraint.
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
  },

  city: {
    type: DataTypes.ENUM('Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'),
    allowNull: false,
  },

  category: {
    type: DataTypes.ENUM('Residential', 'Commercial', 'Interior'),
    defaultValue: 'Residential',
  },

  // FIX 2: was STRING(255) — base64 images are 200–800 KB strings.
  // STRING(255) silently truncates them, causing broken/blank images.
  // LONGTEXT holds up to 4 GB, safe for any base64 upload.
  image_before: {
    type: DataTypes.TEXT('long'),
    allowNull: true,   // FIX 3: was allowNull: false — images optional at creation time
  },
  image_after: {
    type: DataTypes.TEXT('long'),
    allowNull: true,   // FIX 3: same — optional
  },

  pricing_total_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },

  // FIX 4: ENUM was ('Basic','Standard','Premium') but the admin dashboard
  // sends 'Classic', 'Royale', 'Elite'. This silent mismatch caused every
  // Project.create() to throw a Sequelize validation error, so NO project
  // could ever be saved. This was the primary bug breaking the Add Project flow.
  pricing_package_type: {
    type: DataTypes.ENUM('Classic', 'Royale', 'Elite'),
    allowNull: true,
  },

  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  // FIX 5: year field was completely missing from the model.
  // The admin form sends it and BeforeAfterSlider displays it,
  // but it was never stored or returned.
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Project;