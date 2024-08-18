import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNavs } from "../navigation";
import { BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";
import logo from "../assets/logo.png";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-charleston_green top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[260px] fixed bg-ebony_clay z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to={"/"} className="w-[180px] h-[50px]">
            <img className="w-full h-full" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="px-4 mt-8">
          <ul>
            {allNav.map((n, i) => (
              <li key={n.id}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? " bg-slate-600 shadow-indigo-500/30 text-white duration-500"
                      : " text-iron duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full mb-4 text-xl`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-iron duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full mb-4 text-xl"
              >
                <span>
                  <BiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
