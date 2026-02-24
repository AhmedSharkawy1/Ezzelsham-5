import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import Redis from "ioredis";
import { put } from "@vercel/blob";
import dotenv from "dotenv";
import fs from "fs";

// Load .env if it exists, otherwise fallback to .env.example
if (fs.existsSync(".env")) {
  dotenv.config();
} else if (fs.existsSync(".env.example")) {
  dotenv.config({ path: ".env.example" });
}

const app = express();
const PORT = 3000;

// Initialize Redis client
const redisUrl = process.env.REDIS_URL?.replace(/^"|"$/g, '');
const redis = redisUrl ? new Redis(redisUrl) : null;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Unique keys for Redis
const STORAGE_KEYS = {
  MENU: "ezz_elsham_exclusive_data_v2",
  ADDITIONS_PIZZA: "ezz_elsham_exclusive_additions_pizza_v2",
  ADDITIONS_CREPE: "ezz_elsham_exclusive_additions_crepe_v2",
  LOGO: "ezz_elsham_exclusive_logo_v2",
};

// API Routes
app.get("/api/menu", async (req, res) => {
  try {
    if (!redis) {
      return res.status(500).json({ error: "Redis is not configured" });
    }

    const menuDataStr = await redis.get(STORAGE_KEYS.MENU);
    const additionsPizzaStr = await redis.get(STORAGE_KEYS.ADDITIONS_PIZZA);
    const additionsCrepeStr = await redis.get(STORAGE_KEYS.ADDITIONS_CREPE);
    const logoUrl = await redis.get(STORAGE_KEYS.LOGO);

    res.json({
      menuData: menuDataStr ? JSON.parse(menuDataStr) : null,
      additionsPizza: additionsPizzaStr ? JSON.parse(additionsPizzaStr) : null,
      additionsCrepe: additionsCrepeStr ? JSON.parse(additionsCrepeStr) : null,
      logoUrl: logoUrl || null,
    });
  } catch (error) {
    console.error("Error fetching from Redis:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/api/menu", async (req, res) => {
  try {
    if (!redis) {
      return res.status(500).json({ error: "Redis is not configured" });
    }

    const { menuData, additionsPizza, additionsCrepe, logoUrl } = req.body;

    if (menuData) await redis.set(STORAGE_KEYS.MENU, JSON.stringify(menuData));
    if (additionsPizza) await redis.set(STORAGE_KEYS.ADDITIONS_PIZZA, JSON.stringify(additionsPizza));
    if (additionsCrepe) await redis.set(STORAGE_KEYS.ADDITIONS_CREPE, JSON.stringify(additionsCrepe));
    if (logoUrl) await redis.set(STORAGE_KEYS.LOGO, logoUrl);

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving to Redis:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const { filename, base64Data, contentType } = req.body;
    
    if (!filename || !base64Data) {
      return res.status(400).json({ error: "Missing filename or data" });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data.split(",")[1] || base64Data, "base64");
    
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: contentType || "image/jpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN?.replace(/^"|"$/g, ''),
    });

    res.json({ url: blob.url });
  } catch (error) {
    console.error("Error uploading to Blob:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
