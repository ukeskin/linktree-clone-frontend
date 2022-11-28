import React from "react";

const LinkCard = ({ id, title, url }) => {
  return (
    <a
      key={id}
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-blue-500 hover:text-blue-700 p-2 border rounded-lg hover:bg-slate-100"
    >
      {title}
    </a>
  );
};

export default LinkCard;
