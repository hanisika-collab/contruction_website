const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isFeatured: true });
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get projects by city
// @route   GET /api/projects/city/:cityName
exports.getProjectsByCity = async (req, res) => {
  try {
    const projects = await Project.find({ city: req.params.cityName });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};