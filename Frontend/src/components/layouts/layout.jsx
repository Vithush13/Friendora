import React, {  useContext } from "react";
import { UserContext } from "../context/userContext";
import SideMenu from "./sideBar";
import Navbar from "./navbar";
import Loading from "./loading";
export default function DashboardLayout ({children, activeMenu}) {
    const {user} = useContext(UserContext);
    
    

    return(
        <div className="">
            <Navbar activeMenu ={activeMenu}/>
            
            
                <div className="flex" >
                    <div className="max-[1080px]:hidden">
                       <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            
        </div>
    );
}