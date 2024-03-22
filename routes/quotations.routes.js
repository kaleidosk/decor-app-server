// Función para aprobar una cotización
function approveQuotation(quotation, project) {
    quotation.quotationStatus = 'approved';
    project.projectStatus = 'ongoing';
    return Promise.all([quotation.save(), project.save()]);
  }
  
  // Función para rechazar una cotización
  function rejectQuotation(quotation) {
    quotation.quotationStatus = 'rejected';
    return quotation.save();
  }
  
  // Función para hacer una contraoferta a una cotización
  function counterOfferQuotation(quotation, counterOfferContent, counterOfferPrice) {
    const newQuotation = new Quotation({
      clientId: quotation.clientId,
      professionalId: quotation.professionalId,
      projectId: quotation.projectId,
      content: counterOfferContent,
      price: counterOfferPrice,
    });
    return Promise.all([newQuotation.save(), quotation.clientReply.push(newQuotation._id), quotation.save()]);
  }
  
  // PUT /api/quotation/:quotationId/respond - Responder a una cotización (aprobar, rechazar, contraoferta)
  router.put('/:quotationId/respond', isAuthenticated, (req, res) => {
    const { quotationId } = req.params;
    const { action, counterOfferContent, counterOfferPrice } = req.body;
    const userId = req.payload._id;
  
    // Verificar si la cotización existe y si el usuario es el cliente
    Quotation.findById(quotationId)
      .populate('projectId')
      .then((quotation) => {
        if (!quotation || quotation.clientId.toString() !== userId) {
          return res.status(404).json({ message: "Quotation not found" });
        }
  
        // Realizar la acción correspondiente (aprobar, rechazar o contraoferta)
        switch (action) {
          case 'approve':
            return approveQuotation(quotation, quotation.projectId);
          case 'reject':
            return rejectQuotation(quotation);
          case 'counterOffer':
            return counterOfferQuotation(quotation, counterOfferContent, counterOfferPrice);
          default:
            return res.status(400).json({ message: "Invalid action" });
        }
      })
      .then(() => {
        res.status(200).json({ message: "Action performed successfully" });
      })
      .catch((error) => {
        console.error("Error responding to quotation:", error);
        res.status(500).json({ message: "Error responding to quotation" });
      });
  });
  
  module.exports = router;
  
