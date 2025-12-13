import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
    index: true,
  },
  responseId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  respondentEmail: {
    type: String,
    lowercase: true,
    trim: true,
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  rawData: {
    type: mongoose.Schema.Types.Mixed,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  syncedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Índice composto para busca rápida
formResponseSchema.index({ formId: 1, timestamp: -1 });
formResponseSchema.index({ userId: 1, timestamp: -1 });

export const FormResponse = mongoose.model("FormResponse", formResponseSchema);

