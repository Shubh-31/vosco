const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv")
require("dotenv").config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const tokens = new Map();

const corsOptions = {
  origin: ["http://localhost:5173", "https://vosco-shubh-31s-projects.vercel.app"],
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

const generateNumericToken = () => Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-otp", async (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = generateNumericToken();
    tokens.set(email, otp);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Authentication OTP",
      text: `Your OTP is: ${otp}. This OTP is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const storedOtp = tokens.get(email);
  if (!storedOtp) return res.status(400).json({ message: "OTP expired or not found" });

  if (parseInt(otp, 10) === storedOtp) {
    tokens.delete(email);
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
