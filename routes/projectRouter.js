const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Assuming you have multer in a separate file
const projectController = require('../controllers/projectController'); // Controller to handle the logic
const verifyJwt = require('../middlewares/jwtMiddleware')

// Route for submitting a project (with file upload)
router.post('/submit', upload.single('projectFile'), projectController.submitProject);

// Route to get all projects
router.get('/getAllProjects',verifyJwt, projectController.getAllProjects);

// Route to get a project by ID
router.get('/getProjectById/:id',verifyJwt, projectController.getProjectById);

module.exports = router;
