const express = require('express');
const router = express.Router();
const Project = require('../models/Project.model');
const fileUploader = require('../config/cloudinary.config'); // Importa el middleware de carga de archivos

// POST /api/projects - create a new project
router.post('/', fileUploader.single('picture'), async (req, res) => {
  const { description, projectStatus, quotations } = req.body;

  try {
    // image from req.file
    const picture = req.file ? req.file.path : null;

    // Creating the new project
    const project = await Project.create({ description, projectStatus, quotations, picture });
    return res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Error creating project' });
  }
});



module.exports = router;


