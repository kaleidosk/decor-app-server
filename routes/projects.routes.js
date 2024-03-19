// const express = require('express');
// const router = express.Router();
// const Project = require('../models/Project.model');
// const isAuthenticated = require('../middleware/jwt.middleware').isAuthenticated;
// const mongoose = require('mongoose');
// const fileUploader = require('../config/cloudinary.config');


// // POST /api/projects - Create a new project
// router.post('/', isAuthenticated, fileUploader.single('picture'), (req, res, next) => {
//   console.log("req.file",req.file);
//   // Obtener los datos del formulario
//   const { description } = req.body;
//   const pictureUrl = req.file ? req.file.path : null; // Obtener la URL de la imagen en Cloudinary

//   // Verificar si la descripción está presente
//   if (!description) {
//     return res.status(400).json({ message: "Description is required" });
//   }

//   // Crear un nuevo proyecto con los datos recibidos
//   const newProject = new Project({
//     userId: req.payload._id, // Asignar el ID del usuario del token
//     description: description,
//     picture: pictureUrl // Asignar la URL de la imagen en Cloudinary
//   });

//   // Guardar el proyecto en la base de datos
//   newProject.save()
//     .then((project) => {
//       res.status(201).json(project);
//     })
//     .catch((err) => {
//       console.log("Error while creating the project", err);
//       res.status(500).json({ message: "Error while creating the project" });
//     });
// });

// module.exports = router;


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

module.exports = router;
