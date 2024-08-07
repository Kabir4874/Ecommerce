import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  // calculate total pages
  const totalPage = Math.ceil(totalItem / perPage);

  // calculate startPage and endPage
  let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
  let endPage = Math.min(totalPage, startPage + showItem - 1);

  // Adjust startPage if endPage exceeds totalPage
  if (endPage - startPage < showItem - 1) {
    startPage = Math.max(1, endPage - showItem + 1);
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          className={`${
            pageNumber === i
              ? "bg-slate-700 shadow-lg shadow-slate-300/50 text-iron"
              : "bg-slate-300 hover:bg-slate-300 shadow-lg hover:shadow-slate-300/50 hover:text-slate-800 text-slate-800"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer select-none`}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer"
        >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer"
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};
export default Pagination;
