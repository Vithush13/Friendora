import React from "react";
import SideMenu from "./sideBar";
import Navbar from "./navbar";
import Loading from "./loading";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children, activeMenu }) {
  const user = useSelector((state) => state.user.value);

  if (!user) {
    return <Loading />;   // show loader until user exists
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
}
