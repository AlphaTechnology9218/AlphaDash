import mongoose from "mongoose";

const scoreDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },
  expressoEcologico1: { type: Number, default: 0 },
  expressoEcologico2: { type: Number, default: 0 },
  expressoEcologico3: { type: Number, default: 0 },
  expressoEcologico4: { type: Number, default: 0 },
  bonificacaoExpresso: { type: Number, default: 0 },
  reflorestamentoAzul: { type: Number, default: 0 },
  reflorestamentoVerde: { type: Number, default: 0 },
  departamentoEcologico: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const ScoreData = mongoose.model("ScoreData", scoreDataSchema);

