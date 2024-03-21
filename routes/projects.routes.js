
const express = require('express');
const router = express.Router();
const Project = require('../models/Project.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const fileUploader = require('../config/cloudinary.config');

// POST /api/projects - Create a new project
router.post('/', isAuthenticated, fileUploader.single('picture'), (req, res, next) => {
  console.log("req.file", req.file);
  // Obtener los datos del formulario
  const { description } = req.body;
  const pictureUrl = req.file ? req.file.path : null; // Obtener la URL de la imagen en Cloudinary

  // Verificar si la descripción está presente
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  // Crear un nuevo proyecto con los datos recibidos
  const newProject = new Project({
    userId: req.payload._id, // Asignar el ID del usuario del token
    description: description,
    picture: pictureUrl // Asignar la URL de la imagen en Cloudinary
  });

  // Guardar el proyecto en la base de datos
  newProject.save()
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log("Error while creating the project", err);
      res.status(500).json({ message: "Error while creating the project" });
    });
});

// GET /api/projects/:id - Get a project by ID
router.get('/:id', isAuthenticated, (req, res, next) => {
  // Obtener el ID del proyecto
  const projectId = req.params.id;
  console.log('projectId',projectId)

  // Buscar el proyecto por ID en la base de datos
  Project.findById(projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      // Devolver los datos del proyecto
      res.json({
        id: project._id,
        title: project.title,
        description: project.description,
        picture: project.picture
      });
    })
    .catch((err) => {
      console.log("Error while retrieving the project", err);
      res.status(500).json({ message: "Error while retrieving the project" });
    });
});

// PUT /api/projects/:id - Update a project
router.put('/:id', isAuthenticated, fileUploader.single('picture'), (req, res, next) => {
  // Obtener el ID del proyecto a actualizar
  const projectId = req.params.id;

  // Obtener los datos actualizados del formulario
  const { description } = req.body;
  const pictureUrl = req.file ? req.file.path : null; // Obtener la URL de la imagen en Cloudinary

  // Verificar si la descripción está presente
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  // Buscar el proyecto por ID y actualizar sus datos
  Project.findByIdAndUpdate(projectId, {
    description: description,
    picture: pictureUrl // Actualizar la URL de la imagen en Cloudinary si se proporciona una nueva imagen
  }, { new: true }) // Para devolver el proyecto actualizado
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    })
    .catch((err) => {
      console.log("Error while updating the project", err);
      res.status(500).json({ message: "Error while updating the project" });
    });
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', isAuthenticated, (req, res, next) => {
  // Obtener el ID del proyecto a eliminar
  const projectId = req.params.id;

  // Buscar y eliminar el proyecto por ID
  Project.findByIdAndDelete(projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    })
    .catch((err) => {
      console.log("Error while deleting the project", err);
      res.status(500).json({ message: "Error while deleting the project" });
    });
});

module.exports = router;



