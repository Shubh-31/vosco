const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

const tokens = new Map(); 

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Recipient email is required" });
  }

  const token = crypto.randomBytes(8).toString("hex");
  tokens.set(email, token);

  try {
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
      text: `Here is your authentication token: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully", token });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});


app.post("/auth/callback", (req, res) => {
  const { email, token } = req.body;

  if (!tokens.has(email)) {
    return res.status(400).json({ message: "No token found for this email. Please request a new one." });
  }

  const storedToken = tokens.get(email);
  
  if (token === storedToken) {
    tokens.delete(email); 
    res.json({ message: "Authentication successful!" });
  } else {
    res.status(400).json({ message: "Incorrect token. Please verify and try again." });
  }
});

app.listen(port, () => {
  console.log(`Nodemailer is listening at http://localhost:${port}`);
});
