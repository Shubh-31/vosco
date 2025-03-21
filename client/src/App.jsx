import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

function App() {
  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");

  const sendToken = async () => {
    if (!user) return;

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:4000/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, token: accessToken }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error sending token:", error);
      setMessage("Failed to send token.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!user ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Please log in to continue
          </h2>
          <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Hi! Greetings {' '} {user.name}
          </h2>
          <p className="text-gray-500">Email: {' '}{user.email}</p>
          <button
            onClick={sendToken}
            className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Send Token
          </button>
          {message && <p className="mt-2 text-gray-600">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
