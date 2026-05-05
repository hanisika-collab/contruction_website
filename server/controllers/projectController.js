const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
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
    const { title, description, city, category, images, pricing, isFeatured, year } = req.body;

    const project = await Project.create({
      title,
      description: description || '',
      city,
      category: category || 'Residential',
      image_before: images?.before || '',
      image_after: images?.after || '',
      pricing_total_cost: pricing?.totalCost || null,
      pricing_package_type: pricing?.packageType || null,
      is_featured: isFeatured || false,
    });

    res.status(201).json({ success: true, data: formatProject(project) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const { title, description, city, category, images, pricing, isFeatured, year } = req.body;

    await project.update({
      title: title ?? project.title,
      description: description ?? project.description,
      city: city ?? project.city,
      category: category ?? project.category,
      image_before: images?.before ?? project.image_before,
      image_after: images?.after ?? project.image_after,
      pricing_total_cost: pricing?.totalCost ?? project.pricing_total_cost,
      pricing_package_type: pricing?.packageType ?? project.pricing_package_type,
      is_featured: isFeatured ?? project.is_featured,
    });

    res.status(200).json({ success: true, data: formatProject(project) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    await project.destroy();
    res.status(200).json({ success: true, message: 'Project deleted' });
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

// Helper: reshape flat SQL row → nested shape frontend expects
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