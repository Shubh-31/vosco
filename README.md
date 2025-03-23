# OTP Verification App

A secure authentication system that allows users to log in using Auth0 and verify their identity via OTP. The backend stores and validates OTPs, and the frontend provides a seamless user experience for authentication and verification.

## 🚀 Features
- User authentication via **Auth0**
- OTP generation and verification
- Backend API built with **Node.js and Express**
- Frontend developed using **React.js and Tailwind CSS**
- Secure API communication with **JWT tokens**

---

## 🛠️ Installation & Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/Shubh-31/otp-verification-app.git
cd otp-verification-app
```

### **2. Install Dependencies**
#### **Backend Setup**
```sh
cd server
npm install
```
#### **Frontend Setup**
```sh
cd client
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in both the backend and frontend directories.

#### **Backend (`server/.env`)**
```env
PORT=4000
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

#### **Frontend (`client/.env`)**
```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_API_URL=https://your-backend.vercel.app
```

### **4. Run the Application**
#### **Start the Backend**
```sh
cd server
node app.js
```
#### **Start the Frontend**
```sh
cd client
npm run dev
```

---

## 🌍 Deployment

### **Deploy Backend on Vercel**
```sh
cd server
vercel --prod
```
Ensure that your API URL (`VITE_API_URL`) in the frontend `.env` file is updated with the Vercel backend URL.

### **Deploy Frontend on Vercel**
```sh
cd client
vercel --prod
```

---

## 🔥 API Endpoints

### **Send OTP**
**POST** `/send-otp`
```json
{
  "email": "user@example.com",
  "token": "JWT_ACCESS_TOKEN"
}
```

### **Verify OTP**
**POST** `/verify-otp`
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

---

## 🛠️ Troubleshooting

### **1. OTP Verification Fails (400 Bad Request)**
- Ensure the frontend is sending the correct request payload.
- Check CORS settings in `server/app.js`.
- Debug with `console.log()` inside `/verify-otp`.

### **2. API Not Working on Production**
- Run `vercel logs --prod` to check for errors.
- Make sure `.env` variables are correctly set in Vercel (`vercel env add`).
- Confirm that the frontend is pointing to the correct backend URL.

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 💡 Author
**Shubhang Mishra**  
GitHub: [Shubh-31](https://github.com/Shubh-31)  
Email: shubhangmishra999@gmail.com

