import { useState, useEffect } from "react";
import axios from "../api/axios";
import { createContext, useContext } from "react";

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
