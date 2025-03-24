const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vosco-shubh-31s-projects.vercel.app",
    ],
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json({ limit: "25mb" }));

const tokens = new Map();
const generateNumericToken = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = generateNumericToken();
    tokens.set(email, otp);

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Authentication OTP",
      text: `Your OTP is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});



app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  if (tokens.get(email) === otp) {
    tokens.delete(email);
    return res.json({ message: "OTP verified successfully!" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
