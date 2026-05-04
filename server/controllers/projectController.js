const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();

    // Reshape to match frontend expectations
    const data = projects.map(formatProject);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { title, description, city, category, images, pricing, isFeatured } = req.body;

    const project = await Project.create({
      title,
      description,
      city,
      category,
      image_before: images?.before,
      image_after: images?.after,
      pricing_total_cost: pricing?.totalCost,
      pricing_package_type: pricing?.packageType,
      is_featured: isFeatured || false,
    });

    res.status(201).json({ success: true, data: formatProject(project) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { is_featured: true } });
    res.status(200).json({ success: true, data: projects.map(formatProject) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get projects by city
// @route   GET /api/projects/city/:cityName
exports.getProjectsByCity = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { city: req.params.cityName } });
    res.status(200).json({ success: true, count: projects.length, data: projects.map(formatProject) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Helper: reshape flat SQL row → nested shape your frontend expects
function formatProject(p) {
  return {
    _id: p.id,
    title: p.title,
    description: p.description,
    city: p.city,
    category: p.category,
    images: {
      before: p.image_before,
      after: p.image_after,
    },
    pricing: {
      totalCost: p.pricing_total_cost,
      packageType: p.pricing_package_type,
    },
    isFeatured: p.is_featured,
    createdAt: p.created_at,
  };
}