const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "https://vosco-shubh-31s-projects.vercel.app",
    methods: "GET,POST",
    credentials: true,
  })
);
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

const tokens = new Map();

const generateNumericToken = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post("/auth/callback", async (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Email and token are required" });
  }

  try {
    const auth0Response = await axios.get(`https://YOUR_AUTH0_DOMAIN/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (auth0Response.data.email !== email) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const numericToken = generateNumericToken();
    tokens.set(email, numericToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shubhangmishra999@gmail.com",
        pass: "ubdcmhpnxvqmnxwj",
      },
    });

    const mailOptions = {
      from: "shubhangmishra999@gmail.com",
      to: email,
      subject: "Your Authentication Token",
      text: `Here is your 6-digit authentication token: ${numericToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully", token: numericToken });
  } catch (error) {
    console.error("Error validating Auth0 token or sending email:", error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
