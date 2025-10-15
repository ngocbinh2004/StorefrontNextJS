import React from "react";

const NewsSearchSidebar = () => {
  return (
    <div className="gi-blog-search h-[50px] w-full p-[0] outline-[0] border-[1px] border-solid border-[#eee] text-[#4b5966] relative rounded-[5px] overflow-hidden">
      <form
        className="gi-blog-search-form flex items-center bg-[#fff]"
        action="#"
      >
        <input
          className="form-control block w-full min-h-[48px] h-[48px] px-[20px] text-[16px] font-normal leading-[1] text-[#777] bg-transparent border-[0] outline-[0] tracking-[0]"
          placeholder="Search Our Blog"
          type="text"
        />
        <button
          type="submit"
          className="submit relative h-[48px] w-[48px] text-[#4b5966]"
        >
          <i className="gicon gi-search" />
        </button>
      </form>
    </div>
  );
};

export default NewsSearchSidebar;
