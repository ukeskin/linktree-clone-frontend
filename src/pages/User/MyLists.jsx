import React, { useEffect, useState, useCallback } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function MyLists() {
  const [lists, setLists] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    desc: "",
  });
  useEffect(() => {
    axios
      .get("/api/lists/all")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNewList = () => {
    axios
      .post("/api/lists", formState)
      .then((res) => {
        setLists([...lists, res.data]);
        handleShowAddForm();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const handleShowAddForm = () => {
    setShowAddModal(!showAddModal);
    setFormState({
      title: "",
      desc: "",
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
        <h2 className="text-2xl font-medium text-gray-700">My Lists</h2>
        <div className="flex flex-col mt-4 gap-3">
          {lists.map((list) => (
            <Link
              key={list._id}
              to={{
                pathname: `/list/${list.slug}`,
              }}
              state={{
                listId: list._id,
              }}
              className="text-blue-500 hover:text-blue-700 py-2 px-1 bg-gray-50 rounded-md shadow-sm"
            >
              {list.title}
            </Link>
          ))}
        </div>
      </div>
      {/* Add new list modal  */}

      {showAddModal && (
        <div className="w-full h-screen bg-black/50 fixed">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white rounded-xl shadow-md flex flex-col items-center justify-between p-5">
              <h2 className="text-2xl font-medium text-gray-700">New List</h2>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-xl p-2 mt-4 w-full"
                  placeholder="List Title"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-xl p-2 mt-4 w-full"
                  placeholder="List Description"
                  value={formState.desc}
                  onChange={(e) =>
                    setFormState({ ...formState, desc: e.target.value })
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
                  onClick={handleNewList}
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
