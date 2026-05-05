// models/ChatMessage.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Who the user is (from lead capture)
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Session key — groups all messages from one chat session
  session_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // 'user' or 'bot'
  sender: {
    type: DataTypes.ENUM('user', 'bot'),
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  tableName: 'chat_messages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = ChatMessage;