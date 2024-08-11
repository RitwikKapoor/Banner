import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/user/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard/main");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
          Login to Your Admin Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Test Email: <span className="font-medium">admin@example.com</span>
          </p>
          <p>
            Test Password: <span className="font-medium">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
