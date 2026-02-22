import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/layouts/loading";
import DashboardLayout from "../components/layouts/layout";
import UserProfileInfo from "../components/userProfileInfo";
import PostCard from "../components/postCard";
import moment from "moment";
import ProfileModal from "../components/profileModal";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Profile() {
    const currentUser = useSelector((state) => state.user.value);
    const { profileId } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(true); // new loading state

    const fetchUser = async (id) => {
        const token = localStorage.getItem("token");

        if (!id) return; // don't fetch if no id
        if (!token) {
            toast.error("You are not logged in");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosInstance.post(
                API_PATHS.USER.PROFILE,
                { profileId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("API response:", data); // debug

            if (data.success && data.profile) {
                setUser(data.profile); // make sure it's lowercase 'profile'
                setPosts(data.posts || []);
            } else {
                setUser(null);
                setPosts([]);
                toast.error(data.message || "User not found");
            }
        } catch (error) {
            setUser(null);
            setPosts([]);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const id = profileId || currentUser?._id;
        if (!id) return;
        fetchUser(id);
    }, [profileId, currentUser]);

    // Show loading component while fetching user
    if (loading) return <Loading />;

    // If user not found after fetch
    if (!user) return (
        <DashboardLayout activeMenu="Profile">
            <div className="relative h-full overflow-y-scroll bg-gray-50 p-6 flex items-center justify-center">
                <p className="text-gray-500 text-lg">User not found</p>
            </div>
        </DashboardLayout>
    );

    // Main Profile page
    return (
        <DashboardLayout activeMenu="Profile">
            <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
                <div className="max-w-3xl mx-auto">
                    {/*Profile Photo */}
                    <div className="bg-white rounded-2xl shadow overflow-hidden">
                        {/*Cover Photo */}
                        <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-blue-200 to-pink-200">
                            {user.cover_photo && (
                                <img
                                    src={user.cover_photo}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {/*User Info */}
                        <UserProfileInfo
                            user={user}
                            posts={posts}
                            profileId={profileId}
                            setShowEdit={setShowEdit}
                        />
                    </div>

                    {/*Tabs */}
                    <div className="mt-6">
                        <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
                            {["posts", "media", "likes"].map((tab) => (
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    key={tab}
                                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                                        activeTab === tab
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/*Posts */}
                        {activeTab === "posts" && (
                            <div className="mt-6 flex flex-col items-center gap-6">
                                {posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        )}

                        {/*Media */}
                        {activeTab === "media" && (
                            <div className="flex flex-wrap mt-6 max-w-6xl">
                                {posts
                                    .filter((post) => post.image_urls.length > 0)
                                    .map((post) => (
                                        <div key={post._id}>
                                            {post.image_urls.map((image, index) => (
                                                <Link
                                                    target="_blank"
                                                    to={image}
                                                    key={index}
                                                    className="relative group"
                                                >
                                                    <img
                                                        src={image}
                                                        className="w-64 aspect-video object-cover"
                                                        alt=""
                                                    />
                                                    <p className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300">
                                                        Posted {moment(post.createdAt).fromNow()}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
            </div>
        </DashboardLayout>
    );
}
