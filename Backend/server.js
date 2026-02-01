import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import {inngest,functions} from"./inngest/index.js";
import {serve} from "inngest/express";

dotenv.config();
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use('/api/inngest', serve({client:inngest,functions}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
