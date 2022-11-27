import React, { useEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
export default function PublicUserList() {
  let { username, listName } = useParams();
  const [list, setList] = React.useState([]);

  useEffect(() => {
    axios
      .get(`/api/lists/${username}/${listName}`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, listName]);

  return (
    <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-between px-6 py-4 flex-col">
          <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
            {list?.title}
          </h1>
          <p className="text-lg font-semibold text-gray-400">{list?.desc}</p>
          <div className="flex flex-col mt-4">
            {list.links &&
              list.links.map((item) => (
                <li className="list-none text-lg text-gray-200 hover:bg-gray-300 p-3 rounded-lg">
                  <a
                    className="w-full"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
