import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get("/health", (_req, res) => {
  const states = ["desconectado", "conectado", "conectando", "desconectando"];
  res.json({ ok: true, db: states[mongoose.connection.readyState] ?? "desconhecido" });
});

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`API rodando em http://localhost:${port}`);
  } catch (err) {
    console.error("Falha ao conectar no MongoDB:", err?.message ?? err);
    process.exit(1);
  }
});

