import React from "react";

const NewsCategoryHeadingTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl font-bold mb-5">
      {title.length > 0 ? title : "Tin mới nhất"}
    </h1>
  );
};

export default NewsCategoryHeadingTitle;
