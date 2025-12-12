import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  // Permitir todas as URLs do Vercel (preview + production)
  /^https:\/\/alphadashtbr5.*\.vercel\.app$/,
].filter(Boolean);

// Função para verificar origem permitida
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requisições sem origem (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Verificar se a origem está na lista permitida
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed || allowedOrigins.length === 0) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.get("/", (_req, res) => {
  res.json({ 
    message: "AlphaDash API",
    version: "1.0.0",
    status: "online",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      data: "/api/data"
    }
  });
});

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

