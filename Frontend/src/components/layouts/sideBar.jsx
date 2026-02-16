import { SIDE_MENU_DATA } from "../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";


export default function SideMenu({ activeMenu }) {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 flex flex-col justify-between">

      {/* MENU */}
      <div>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
              activeMenu === item.label
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-lg shrink-0" />
            <span className="leading-none">{item.label}</span>
          </button>
        ))}

        <Link
          to="/createpost"
          className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition text-white"
        >
          <FaCirclePlus className="w-5 h-5" /> Create
        </Link>
      </div>

      {/* USER FOOTER */}
      <div className="w-full border-t border-gray-200 pt-4 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user?.full_name?.[0] || "U"}
          </div>

          <div>
            <h1 className="text-sm font-medium">{user?.full_name || "User"}</h1>
            <p className="text-xs text-gray-500">@{user?.username || "username"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
