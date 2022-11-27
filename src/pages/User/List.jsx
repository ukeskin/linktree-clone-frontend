import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
export default function List() {
  const [links, setLinks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    url: "",
  });
  const { slug } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    axios.get(`/api/lists/${state?.listId}`).then((res) => {
      setLinks(res.data.links);
    });
  }, [state.listId]);

  const handleNewLink = () => {
    axios
      .put(`/api/lists/${state?.listId}`, formState)
      .then((res) => {
        handleShowAddForm();
        setLinks([...links, formState]);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const handleShowAddForm = () => {
    setShowAddModal(!showAddModal);
    setFormState({
      title: "",
      url: "",
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-500 p-5">
      <div className="shadow-md py-12 px-8 rounded-xl bg-gray-100 flex flex-col relative max-w-[450px] w-full">
        <button
          onClick={handleShowAddForm}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl absolute -right-2 -top-2 border-4"
        >
          +
        </button>
        <h2 className="text-2xl font-medium text-gray-700">Link</h2>
        <div className="flex flex-col mt-5">
          {links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {link.title}
            </a>
          ))}
        </div>
        {links.length === 0 && (
          <span className="text-gray-500 text-sm mt-1">Link bulunamadı</span>
        )}
      </div>
      {showAddModal && (
        <div className="w-full h-screen bg-black/50 fixed">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white rounded-xl shadow-md flex flex-col items-center justify-between p-5">
              <h2 className="text-2xl font-medium text-gray-700">New Link</h2>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-xl p-2 mt-4 w-full"
                  placeholder="Link Title"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-xl p-2 mt-4 w-full"
                  placeholder="Link URL"
                  value={formState.url}
                  onChange={(e) =>
                    setFormState({ ...formState, url: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center w-full gap-4">
                <button
                  onClick={handleShowAddForm}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl mt-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewLink}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl mt-4"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
