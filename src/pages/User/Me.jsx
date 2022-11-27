import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
export default function Me() {
  const { user, getUser } = useAuth();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (user) {
      setFormState({
        username: user.username,
        email: user.email,
        name: user.name,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.put("/api/user", formState).then((res) => {
      getUser();
      setFormState({
        password: "",
      });
    });
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-500">
      <div className="shadow-md py-12 px-8 rounded-xl bg-gray-100 flex flex-col">
        <h2 className="text-2xl font-medium text-gray-700">Profile</h2>
        <div className="flex flex-col mt-8 gap-5">
          <div className="flex items-center gap-2 justify-between">
            <label className="text-gray-700 font-medium">Username :</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="text"
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-gray-700 font-medium">Name :</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-gray-700 font-medium">Email :</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-gray-700 font-medium">Password :</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="password"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
