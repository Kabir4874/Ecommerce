import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNavs } from "../navigation";

const Sidebar = () => {
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs("admin");
    setAllNav(navs);
  }, []);
  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-ebony_clay z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to={"/"} className="w-[180px] h-[50px]">
            <img
              className="w-full h-full"
              src="http://localhost:3000/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="px-4">
          <ul>
            {allNav.map((n, i) => (
              <li key={n.id}>
                <Link to={n.path}>
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
