const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  getFeaturedProjects,
  getProjectsByCity,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.get('/featured', getFeaturedProjects);
router.get('/city/:cityName', getProjectsByCity);
router.route('/').get(getProjects).post(createProject);
router.route('/:id').put(updateProject).delete(deleteProject);

module.exports = router;