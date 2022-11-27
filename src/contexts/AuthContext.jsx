import { useState, useEffect } from "react";
import axios from "../api/axios";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
      });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    toast.success("Signed out successfully", {
      duration: 2000,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
