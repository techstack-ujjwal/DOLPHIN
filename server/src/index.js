import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
dotenv.config();
const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get("/health", (req,res)=>{
    res.send("ok");
});

// Redirect /device to Next.js app for device authorization UI
app.get("/device", (req, res) => {
  const { user_code } = req.query;
  // Sanitize user_code to prevent CRLF injection
  const sanitizedCode = user_code?.replace(/[\r\n]/g, '') || '';
  res.redirect(`http://localhost:3000/device?user_code=${sanitizedCode}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
