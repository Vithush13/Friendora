import{ LuHouse,LuMessageSquare,LuUsers,LuMessageCircle, LuUser, LuLogOut} from"react-icons/lu";

export const SIDE_MENU_DATA =[
    {
        id:"01",
        label:"Home",
        icon: LuHouse,
        path:"/home"
    },
    {
        id:"02",
        label:"Friends",
        icon:LuUsers,
        path:"/friends"
    },
    {
        id:"03",
        label:"Message",
        icon:LuMessageSquare,
        path:"/message"
    },
    {
        id:"04",
        label:"Chat",
        icon:LuMessageCircle,
        path:"/chatbox"
    },
    {
        id:"05",
        label:"Profile",
        icon:LuUser,
        path:"/profile"
    },
    {
        id:"06",
        label:"Logout",
        icon:LuLogOut,
        path:"logout",
        className: "text-red-500 hover:text-red-600"
    },
];