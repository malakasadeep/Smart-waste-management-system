import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import vid from "../../images/66810-520427372_tiny.mp4"; // Assuming this is the correct path
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const AuthComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isSignIn ? "/api/auth/signin" : "/api/auth/signup";
      const res = await axios.post(endpoint, formData);
      setLoading(false);
      toast.success(
        isSignIn ? "Signed in successfully!" : "Signed up successfully!",
        { autoClose: 3000 }
      );
      navigate(
        isSignIn
          ? res.data.isAdmin
            ? "/admin-dashboard"
            : "/profile"
          : "/sign-in"
      );
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          `${isSignIn ? "Sign in" : "Sign up"} failed!`,
        { autoClose: 3000 }
      );
    }
  };

  return (
    <>
      <Navbar transparent />
      <div className="flex h-screen bg-gray-300">
        <div className="w-1/2 relative overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-customGreen-dark bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">
                Create And Sell Extraordinary Products
              </h1>
              <p className="text-xl">Adopt the peace of nature!</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-customGreen-dark text-center mb-6">
              {isSignIn ? "Welcome Back!" : "Create an Account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
                required
              />
              <button
                type="submit"
                className={`w-full py-2 rounded transition-all duration-300 ${
                  loading
                    ? "bg-customGreen-light text-gray-700 cursor-not-allowed"
                    : "bg-customGreen hover:bg-customGreen-dark text-white"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="ml-1 text-customGreen-dark hover:underline focus:outline-none"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthComponent;
