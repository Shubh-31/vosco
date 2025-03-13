import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [generatedToken, setGeneratedToken] = useState(null);
  const [step, setStep] = useState("email"); 
  const [message, setMessage] = useState("");

  const sendMail = async () => {
    try {
      const response = await axios.post("http://localhost:4000/send-email", { email });
      setGeneratedToken(response.data.token);
      setStep("token");
      
    } catch (error) {
      console.error("Failure:", error.response?.data || error.message);
    }
  };
  

  const verifyToken = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/callback", { email, token });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Token you entered is incorrect. Please verify once.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {step === "email" ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={sendMail}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send Authentication Token
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Enter Authentication Token</h2>
            <input
              type="text"
              placeholder="Enter token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={verifyToken}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Verify Token
            </button>
            {message && (
              <p className={`mt-4 p-2 text-center rounded ${message.includes("incorrect") ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"}`}>
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
