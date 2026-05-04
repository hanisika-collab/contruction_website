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
    allowNull: false,
  },
  city: {
    type: DataTypes.ENUM('Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Residential', 'Commercial', 'Interior'),
    defaultValue: 'Residential',
  },
  image_before: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_after: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricing_total_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  pricing_package_type: {
    type: DataTypes.ENUM('Basic', 'Standard', 'Premium'),
    allowNull: true,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Project;