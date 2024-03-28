const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation.model');
const Project = require('../models/Project.model');
const {isAuthenticated} = require('../middleware/jwt.middleware')

router.post('/projects/:projectId/quotations', isAuthenticated, (req, res) => {
  const {content, price } = req.body;
  const projectId = req.params.projectId;

  const newQuotation = new Quotation({
    professionalId,
    projectId,
    content,
    price,
  });

  newQuotation.save()
    .then(quotation => {
      res.status(201).json(quotation);
    })
    .catch(error => {
      console.error("Error creating the quotation:", error);
      res.status(500).json({ message: "Error creating the quotation" });
    });
});

// router.put('/quotations/:id/respond', isAuthenticated, (req, res) => {
//   const { id } = req.params; // Obtener el ID de la quotation
//   const { action, counterOfferContent, counterOfferPrice } = req.body;
//   const userId = req.payload._id;

//   Quotation.findById(id)
//     .populate('projectId')
//     .then((quotation) => {
//       if (!quotation || quotation.clientId.toString() !== userId) {
//         return res.status(404).json({ message: "Quotation not found or unauthorized" });
//       }

//       switch (action) {
//         case 'approve':
//           return approveQuotation(quotation, quotation.projectId);
//         case 'reject':
//           return rejectQuotation(quotation);
//         case 'counterOffer':
//           return counterOfferQuotation(quotation, counterOfferContent, counterOfferPrice);
//         default:
//           return res.status(400).json({ message: "Invalid action" });
//       }
//     })
//     .then(() => {
//       res.status(200).json({ message: "Action performed successfully" });
//     })
//     .catch((error) => {
//       console.error("Error responding to quotation:", error);
//       res.status(500).json({ message: "Error responding to quotation" });
//     });
// });

// router.get('/projects/:id/quotations', (req, res) => {
//   const projectId = req.params.id; 

//   Quotation.find({ projectId }) // Filtrar quotations por ID del proyecto
//     .then(quotations => {
//       res.status(200).json(quotations);
//     })
//     .catch(error => {
//       console.error("Error obtaining quotations:", error);
//       res.status(500).json({ message: "Error obtaining quotations" });
//     });
// });

module.exports = router;
