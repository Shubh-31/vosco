# Authentication System using Email & Token (with Auth0)

This project is a simple authentication system where users can enter their email, receive a token via email, and verify it. The system uses **Node.js, Express, React, Nodemailer**, and **Auth0** for authentication.

## Features
- Send authentication tokens via email.
- Verify authentication tokens.
- Secure authentication using **Auth0**.

## Tech Stack
- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer (Gmail SMTP)
- **Auth Provider**: Auth0

---

## Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Shubh-31/auth-email-verification.git
cd auth-email-verification
```

### 2️⃣ Backend Setup (Node.js + Express)
#### **Install Dependencies**
```sh
cd backend
npm install
```

#### **Configure Environment Variables**
Create a `.env` file in the `backend` folder:
```sh
PORT=4000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_DOMAIN=your-auth0-domain
CORS_ORIGIN=https://vosco-shubh-31s-projects.vercel.app
```
**Note**: Generate an **App Password** for Gmail from [Google App Passwords](https://myaccount.google.com/apppasswords).

#### **Start the Backend Server**
```sh
npm start
```
The backend will be running at `http://localhost:4000`.

---

### 3️⃣ Frontend Setup (React + Next.js)
#### **Install Dependencies**
```sh
cd frontend
npm install
```

#### **Configure Environment Variables**
Create a `.env.local` file in the `frontend` folder:
```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_AUDIENCE=your-auth0-audience
```

#### **Start the Frontend**
```sh
npm run dev
```
The frontend will be running at `http://localhost:3000`.

---

## 🔑 Auth0 Configuration
### **1. Create an Auth0 Application**
1. Go to [Auth0 Dashboard](https://auth0.com/).
2. Create a new **Regular Web Application**.
3. Navigate to **Settings** and copy the:
   - **Client ID**
   - **Client Secret**
   - **Domain**

### **2. Update Allowed URLs**
In the Auth0 **Application Settings**:
- **Allowed Callback URLs**:  
  `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs**:  
  `http://localhost:3000`
- **Allowed Web Origins**:  
  `http://localhost:3000`

### **3. Enable API Authorization**
1. Go to **APIs** → **Create API**.
2. Name it (e.g., `EmailAuthAPI`).
3. Set **Identifier** to `http://localhost:4000`.
4. Enable `RS256` as the signing algorithm.

Now, update `.env` with `AUTH0_AUDIENCE=http://localhost:4000`.

---

## 🚀 Deployment
To deploy on **Vercel** and **Render**, follow these steps:

### **Frontend Deployment (Vercel)**
1. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```
3. Add environment variables in the Vercel dashboard.

### **Backend Deployment (Render)**
1. Push your backend code to GitHub.
2. Go to [Render](https://render.com/), create a **new web service**.
3. Connect it to your GitHub repo.
4. Add environment variables in Render settings.
5. Deploy!

---

## 🛠️ Troubleshooting
### **1. Not Receiving Emails?**
- Ensure you're using an **App Password** for Gmail.
- Check spam/junk folders.
- Use a third-party email service like **SendGrid**.

### **2. Token Not Verifying?**
- Ensure the token is not expired.
- Make sure `email` and `token` are correctly sent in the request.

### **3. CORS Issues?**
- Update `CORS_ORIGIN` in `.env`.
- Restart the backend server.

---

## 📌 Author
**Shubhang Mishra**  
GitHub: [Shubh-31](https://github.com/Shubh-31)  
Email: shubhangmishra999@gmail.com

