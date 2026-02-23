import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";


export default function UserCard ({user}){
    const currentUser = useSelector((state) => state.user.value);
    const token = localStorage.getItem("token"); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFollow =async ()=>{
        try {
        const { data } = await axiosInstance.post(
            API_PATHS.USER.FOLLOW, { id: user._id }, { headers: { Authorization: `Bearer ${token}` } } );

        if (data.success) {
            toast.success(data.message);
            dispatch(fetchUser(token));
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
    }

    const handleConnectionRequest =async ()=>{
        if(currentUser.connections.includes(user._id)){
            return navigate('/message/' + user._id)
        }
             try {
                const { data } = await axiosInstance.post(
                 API_PATHS.USER.CONNECT, { id: user._id }, { headers: { Authorization: `Bearer ${token}` } } );

                if (data.success) {
                  toast.success(data.message);
                } else {
                   toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
       }
    }

    return(
        <div key={user._id} className="p-4 pt-6 flex flex-col justify-between w-72 shadow border-gray-200 rounded-md">
            <div className="text-center">
                <img src={user.profile_picture} alt="" className="w-16 h-16 rounded-full object-cover shadow-md mx-auto"/>
                <p className="mt-4 font-semibold">{user.full_name}</p>
                {user.username && <p className="text-gray-500 font-light">@{user.username}</p>}
                {user.bio && <p className="text-gray-600 mt-2 text-center text-sm px-4">{user.bio}</p>}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                    <MapPin className="w-4 h-4"/>{user.location}
                </div>
                <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                    <span>{user.followers.length}</span> Followers
                </div>
            </div>
            <div className="flex mt-4 gap-2">
                <button onClick={handleFollow} disabled={currentUser?.following.includes(user._id)} className="w-full py-2 rounded-md flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600
                        to-blue-500 hover:from-indigo-700 hover:to-blue-600 active:scale-95 transition text-white cursor-pointer">
                      <UserPlus className="w-4 h-4"/>{currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
                </button>
                <button onClick={handleConnectionRequest} className="flex items-center justify-center w-16 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition">
                    {currentUser?.connections.includes(user._id) ? <MessageCircle className="w-5 h-5 group-hover:scale-105 transition"/>
                    :
                    <Plus className="w-5 h-5 group-hover:scale-105 transition"/>}
                </button>
            </div>
        </div>
    )
}