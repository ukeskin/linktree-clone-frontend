import React, { useEffect } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
export default function Login() {
  const navigateTo = useNavigate();
  const { user } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/auth/login", formState).then((res) => {
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    });
  };

  useEffect(() => {
    if (user) {
      // Redirect to home page
      navigateTo("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-sm">
        <h1 className="text-center text-3xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Giriş Yap
        </button>
        <Link to="/register" className="text-center mt-4">
          Do not have an account? Register
        </Link>
      </div>
    </div>
  );
}
