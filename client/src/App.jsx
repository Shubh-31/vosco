import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

function App() {
  const { user, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);



  const sendOtp = async () => {
    if (!user) return;
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, token: accessToken }),
      });

      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(response.ok);
      if (response.ok) setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP.");
      setIsSuccess(false);
    }
  };

  const verifyOtp = async () => {
    if (!user || !otp) return;
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp }),
      });

      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(response.ok);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Failed to verify OTP.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-96 text-center">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold text-black mb-4">
              Welcome to Our Secure Portal
            </h2>
            <p className="text-gray-600 mb-4">Please log in to continue</p>
            <button
              onClick={loginWithRedirect}
              className="px-5 py-2.5 bg-white text-blue-600 font-medium cursor-pointer rounded-lg hover:bg-gray-100 transition shadow-md"
            > 
              Log in
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-black mb-2">
              Hello, {user.name} 👋
            </h2>
            <p className="text-black mb-4 text-xs">
              OTP will be sent to {user.email}
            </p>

            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="mt-4 px-5 py-2.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition shadow-md mr-4 cursor-pointer"
              >
                Send OTP
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-4 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 w-3/4"
                />
                <button
                  onClick={verifyOtp}
                  className="mt-4 px-5 py-2.5 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition shadow-md cursor-pointer"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {message && (
              <div
                className={`mt-4 px-4 py-2 rounded-lg text-center w-full transition-all duration-300
                  ${
                    isSuccess
                      ? "bg-white-500 text-green-500"
                      : "bg-white-500 text-red-500"
                  }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="mt-4 px-2 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition shadow-md cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
