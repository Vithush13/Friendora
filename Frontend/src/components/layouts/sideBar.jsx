import { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../context/userContext";
import {  Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

export default function SideMenu({activeMenu}){
    const {user,clearUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) =>{
        if (route == "logout"){
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = ()=>{
        localStorage.clear();
        clearUser();
        navigate("/login");
    }
    return(
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 ">
       
        {SIDE_MENU_DATA.map((item,index) => (
            <button key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${item.className } ${
                        activeMenu=== item.label ? "text-white bg-blue-500 ":"text-gray-700 hover:bg-gray-100"}` } 
                          onClick= {()=> handleClick(item.path)}>
                          <item.icon className="text-lg shrink-0" />
                             <span className="leading-none cursor-pointer">{item.label}</span>
                          </button>
                    ))}

            <Link to='/createpost' className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95
                                              transition text-white cursor-pointer">
             <FaCirclePlus className="w-5 h-5"/> Create
            </Link>
        </div>
    )  
}