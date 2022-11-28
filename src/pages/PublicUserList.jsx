import React, { useEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import LinkList from "../components/LinkList";
import LinkCard from "../components/LinkCard";

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
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-500 p-5">
      <div className="shadow-md py-12 px-8 rounded-xl bg-gray-100 flex flex-col relative max-w-[450px] w-full">
        <h2 className="text-2xl font-medium text-gray-700">{list?.title}</h2>
        <p className="text-lg font-semibold text-gray-400">{list?.desc}</p>
        <LinkList>
          {list.links?.map((item) => (
            <LinkCard key={item._id} title={item.title} url={item.url} />
          ))}
        </LinkList>
      </div>
    </div>
  );
}
