import{ LuHouse,LuMessageSquare,LuUsers, LuUser, LuSearch} from"react-icons/lu";

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
        label:"Discover",
        icon:LuSearch,
        path:"/discover"
    },
    {
        id:"05",
        label:"Profile",
        icon:LuUser,
        path:"/profile"
    },
   
];