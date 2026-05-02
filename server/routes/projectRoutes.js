const express = require('express');
const router = express.Router();
const { getProjects, createProject,getFeaturedProjects, 
    getProjectsByCity } = require('../controllers/projectController');

// This refers to the "root" of /api/projects
router.get('/featured', getFeaturedProjects);
router.get('/city/:cityName', getProjectsByCity);
router.route('/').get(getProjects).post(createProject); 

module.exports = router;