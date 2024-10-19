import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signin", formData);
      setLoading(false);
      toast.success("Signed in successfully!", { autoClose: 3000 });

      // Redirect based on user role
      if (res.data.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Signin failed!", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-customGreen-dark text-center mb-4">
          Sign In
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
          required
        />
        <button
          type="submit"
          className="w-full bg-customGreen hover:bg-customGreen-lighter text-white py-2 rounded transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
