import mongoose from "mongoose";

const scoreDataSchema = new mongoose.Schema({
  expressoEcologico1: { type: Number, default: 0 },
  expressoEcologico2: { type: Number, default: 0 },
  expressoEcologico3: { type: Number, default: 0 },
  expressoEcologico4: { type: Number, default: 0 },
  bonificacaoExpresso: { type: Number, default: 0 },
  reflorestamentoAzul: { type: Number, default: 0 },
  reflorestamentoVerde: { type: Number, default: 0 },
  departamentoEcologico: { type: Number, default: 0 },
}, { _id: false });

const timeRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  id: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  scores: {
    type: scoreDataSchema,
    required: true,
  },
}, {
  timestamps: true,
});

export const TimeRecord = mongoose.model("TimeRecord", timeRecordSchema);

