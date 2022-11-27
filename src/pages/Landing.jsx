import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigateTo = useNavigate();
  return (
    <div className="flex h-screen w-full">
      <div className="m-auto text-center gap-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome to Linktree Clone
        </h1>
        <p className="text-2xl font-medium text-gray-600">
          A simple link sharing app
        </p>
        <div className="flex gap-2 items-center">
          <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            <a href="/register">Register</a>
          </button>
        </div>
      </div>
    </div>
  );
}
