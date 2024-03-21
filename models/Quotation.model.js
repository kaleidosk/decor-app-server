const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  content: String,
  quotationStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  clientReply: [String]
});

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;