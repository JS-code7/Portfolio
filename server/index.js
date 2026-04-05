import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectToDatabase from "../lib/mongodb.js";
import Contact from "../models/Contact.js";
import Log from "../models/Log.js";
import Analytics from "../models/Analytics.js";
import { sendContactEmail } from "./mailer.js";
import { isValidEmail, pickSafeMetadata, sanitizeText } from "./utils/validators.js";

const app = express();
const PORT = Number(process.env.SERVER_PORT || 8787);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "100kb" }));

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
});

const logsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api/health", async (_req, res) => {
  try {
    await connectToDatabase();
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    await connectToDatabase();
    const name = sanitizeText(req.body?.name, 100);
    const email = sanitizeText(req.body?.email, 255).toLowerCase();
    const message = sanitizeText(req.body?.message, 2000);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const contact = await Contact.create({ name, email, message });
    await sendContactEmail({ name, email, message });

    return res.status(200).json({ success: true, id: String(contact._id), message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to send message." });
  }
});

app.post("/api/logs", logsLimiter, async (req, res) => {
  try {
    await connectToDatabase();

    const type = sanitizeText(req.body?.type, 20);
    const action = sanitizeText(req.body?.action, 200);
    const metadata = pickSafeMetadata(req.body?.metadata);

    if (!["visit", "click", "project"].includes(type) || !action) {
      return res.status(400).json({ success: false, message: "Invalid log payload." });
    }

    const log = await Log.create({ type, action, metadata, createdAt: new Date() });

    if (type === "visit" && metadata.page) {
      await Analytics.findOneAndUpdate(
        { page: String(metadata.page) },
        { $inc: { visits: 1 }, $set: { lastVisited: new Date() } },
        { upsert: true, new: true },
      );
    }

    return res.status(201).json({ success: true, id: String(log._id) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to store log." });
  }
});

app.get("/api/admin/summary", async (_req, res) => {
  try {
    await connectToDatabase();

    const [totalLogs, totalMessages, recentMessages, recentLogs, analytics] = await Promise.all([
      Log.countDocuments(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(8).lean(),
      Log.find().sort({ createdAt: -1 }).limit(12).lean(),
      Analytics.find().sort({ visits: -1 }).limit(10).lean(),
    ]);

    return res.json({
      success: true,
      stats: { totalLogs, totalMessages },
      messages: recentMessages,
      logs: recentLogs,
      analytics,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to fetch summary." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
