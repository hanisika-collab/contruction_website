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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,           // FIX: was false — admin form description is optional
  },
  city: {
    type: DataTypes.ENUM('Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Residential', 'Commercial', 'Interior'),
    defaultValue: 'Residential',
  },
  // FIX: Use LONGTEXT so full base64 image strings (can be 500KB+) are stored without truncation.
  // STRING(255) and even TEXT would silently truncate large base64 images.
  image_before: {
    type: DataTypes.TEXT('long'),
    allowNull: true,           // FIX: was false — images are optional at creation time
  },
  image_after: {
    type: DataTypes.TEXT('long'),
    allowNull: true,           // FIX: was false — images are optional at creation time
  },
  pricing_total_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  // FIX: ENUM values were ('Basic','Standard','Premium') but the frontend/admin
  // sends 'Classic', 'Royale', 'Elite'. This mismatch caused every Project.create()
  // to throw a validation error, silently killing all saves.
  pricing_package_type: {
    type: DataTypes.ENUM('Classic', 'Royale', 'Elite'),
    allowNull: true,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // FIX: year field was used in the frontend/admin but missing from the model entirely,
  // so it was never persisted and never returned.
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