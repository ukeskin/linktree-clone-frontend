import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

import LinkList from "../../components/LinkList";
import LinkCard from "../../components/LinkCard";
export default function List() {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formState, setFormState] = useState({
    desc: "",
    title: "",
    links: [],
  });
  const { slug } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    axios.get(`/api/lists/${state?.listId}`).then((res) => {
      setFormState({
        desc: res.data.desc,
        title: res.data.title,
        links: res.data.links,
      });
      setLinks(res.data.links);
      setLinks((prev) => {
        return prev.map((item, index) => {
          return { ...item, id: index };
        });
      });
    });
  }, [state.listId]);

  const handleCopyPageLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${user.username}/${slug}`
    );
    toast.success("Copied to clipboard");
  };

  const handleShowAddForm = () => {
    setShowAddModal(!showAddModal);
    setFormState({
      title: "",
      url: "",
    });
  };

  const handleShowEditForm = () => {
    setShowEditModal(!showEditModal);
  };

  const handleSave = () => {
    axios
      .put(`/api/lists/${state?.listId}`, {
        desc: formState.desc,
        title: formState.title,
        links: links,
      })
      .then((res) => {
        handleShowEditForm();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-500 p-5">
      <div className="shadow-md py-12 px-8 rounded-xl bg-gray-100 flex flex-col relative max-w-[450px] w-full">
        <button
          onClick={handleCopyPageLink}
          className="bg-lime-500 hover:bg-lime-600 text-white font-bold h-12 w-12 rounded-xl absolute right-16 -top-4 border-4 shadow-sm flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
        <button
          onClick={handleShowEditForm}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 w-12 rounded-xl absolute right-2 -top-4 border-4 shadow-sm flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-medium text-gray-700">
          {formState.title}
        </h2>
        <LinkList>
          {links?.map((link) => (
            <LinkCard id={link._id} title={link.title} url={link.url} />
          ))}
        </LinkList>
        {links?.length === 0 && (
          <span className="text-gray-500 text-sm mt-1">Link bulunamadı</span>
        )}
      </div>
      {showEditModal && (
        <div className="w-full h-screen bg-black/50 fixed flex items-center justify-center p-2">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-between p-5">
              <h2 className="text-2xl font-medium text-gray-700">Edit List</h2>
              <div className="flex flex-col w-full gap-4 h-full max-h-[400px] overflow-auto">
                {links.map((link) => (
                  <div className="flex items-center gap-3 justify-between">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) =>
                        setLinks(
                          links.map((l) =>
                            l.id === link.id
                              ? { ...l, title: e.target.value }
                              : l
                          )
                        )
                      }
                      className="w-full h-12 rounded-xl border-2 border-gray-300 px-4 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="url"
                      value={link.url}
                      onChange={(e) =>
                        setLinks(
                          links.map((l) =>
                            l.id === link.id ? { ...l, url: e.target.value } : l
                          )
                        )
                      }
                      className="w-full h-12 rounded-xl border-2 border-gray-300 px-4 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() =>
                        setLinks(links.filter((l) => l.id !== link.id))
                      }
                      className="bg-red-500 hover:bg-red-600 text-white font-bold h-12 w-12 rounded-xl border-4 shadow-sm flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center w-full pt-4 gap-1">
                <button
                  onClick={() =>
                    setLinks([
                      ...links,
                      {
                        id: links.length,
                        title: "",
                        url: "",
                      },
                    ])
                  }
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Add New Link
                </button>
                <button
                  onClick={handleShowEditForm}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
