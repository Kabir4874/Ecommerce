import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import { get_products } from "../../store/reducers/productReducer";
import { GiKnightBanner } from "react-icons/gi";

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, perPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <Search
          setPerPage={setPerPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className=" relative overflow-x-auto mt-8">
          <table className="w-full text-sm text-left text-iron">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-1 px-4">
                  No.
                </th>
                <th scope="col" className="py-1 px-4">
                  Image
                </th>
                <th scope="col" className="py-1 px-4">
                  Name
                </th>
                <th scope="col" className="py-1 px-4">
                  Category
                </th>
                <th scope="col" className="py-1 px-4">
                  Brand
                </th>
                <th scope="col" className="py-1 px-4">
                  Price
                </th>
                <th scope="col" className="py-1 px-4">
                  Discount
                </th>
                <th scope="col" className="py-1 px-4">
                  Stock
                </th>
                <th scope="col" className="py-1 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <img
                      src={d.images[0]}
                      alt=""
                      className="w-[45px] h-[45px]"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d?.name?.slice(0, 16)}...</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.category}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.brand}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>${d.price}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.discount === 0 ? (
                      <span>no discount</span>
                    ) : (
                      <span>{d.discount}%</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.stock}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${d._id}`}
                        className="p-[6px] bg-yellow-600 rounded hover:shadow-lg hover:shadow-yellow-600/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </button>
                      <Link
                        to={`/seller/dashboard/add-banner/${d._id}`}
                        className="p-[6px] bg-cyan-500 rounded hover:shadow-lg hover:shadow-cyan-500/50"
                      >
                        <GiKnightBanner />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalProduct <= perPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              perPage={perPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
