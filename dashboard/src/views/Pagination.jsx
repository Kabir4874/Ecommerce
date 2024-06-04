import React from "react";
import { BsChevronDoubleLeft,BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  // calculate total page
  let totalPage = Math.ceil(totalItem / perPage);
  // start page
  let startPage = pageNumber;
  // difference
  let dif = totalItem - pageNumber;
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }
  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          className={`${
            pageNumber === i
              ? " bg-indigo-500 shadow-lg shadow-indigo-500/50 text-iron"
              : " bg-slate-700 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-white"
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
        <li onClick={()=>setPageNumber(pageNumber-1)} className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-iron cursor-pointer" >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li onClick={()=>setPageNumber(pageNumber+1)} className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-iron cursor-pointer" >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
