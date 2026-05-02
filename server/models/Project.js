const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please add a project title'],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'Please add a description'] 
  },
  city: { 
    type: String, 
    required: [true, 'Please specify the city'],
    enum: ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'] // You can add more
  },
  category: {
    type: String,
    enum: ['Residential', 'Commercial', 'Interior'],
    default: 'Residential'
  },
  // High-end Visualization Data
  images: {
    before: { type: String, required: true }, // URL of the raw site
    after: { type: String, required: true }   // URL of the finished project
  },
  pricing: {
    totalCost: { type: Number },
    packageType: { type: String, enum: ['Basic', 'Standard', 'Premium'] }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);