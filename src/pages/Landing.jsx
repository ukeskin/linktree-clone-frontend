import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Landing() {
  const navigateTo = useNavigate();
  const { user, signOut } = useAuth();
  return (
    <div className="flex h-screen w-full">
      <div className="m-auto text-center gap-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome to Linktree Clone
        </h1>
        <p className="text-2xl font-medium text-gray-600">
          A simple link sharing app
        </p>
        {user ? (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
            <button
              onClick={() => navigateTo("/mylists")}
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              My Lists
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigateTo("/login")}
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigateTo("/register")}
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
