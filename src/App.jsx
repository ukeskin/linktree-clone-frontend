import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";

import { Login, Register } from "./pages/Auth";
import PublicUserList from "./pages/PublicUserList";
import { List, Me, MyLists } from "./pages/User";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/:username/:listName",
      element: <PublicUserList />,
    },
    {
      path: "/me",
      element: <Me />,
    },
    {
      path: "/mylists",
      element: <MyLists />,
    },
    {
      path: "/list/:slug",
      element: <List />,
    },
  ]);
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
