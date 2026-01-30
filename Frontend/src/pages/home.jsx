import DashboardLayout from "../components/layouts/layout"
import React,{useState} from "react";
import { useEffect } from "react";
import { dummyPostsData,assets } from "../assets/assets";
import Loading from "../components/layouts/loading";
import StoriesBar from "../components/layouts/storiesBar";
import PostCard from "../components/postCard";
import RecentMessages from "../components/recentMessages";

export default function Home(){
     const [feeds , setfeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeeds = async ()=>{
        setfeeds(dummyPostsData)
        setLoading(false)
    }

    useEffect(()=>{
        fetchFeeds()
    },[])
    return !loading ? (
        <DashboardLayout activeMenu="Home">
        <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
            {/*Stories and post list*/}
            <div>
              <StoriesBar/>
              <div className="p-4 space-y-6">
                 {feeds.map((post)=>(
                    <PostCard key={post._id} post={post}/>
                 ))}
              </div>
            </div>
            {/*Right slidebar*/}
            <div className="max-xl:hidden sticky top-0">
                <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
                    <h3 className="text-slate-800 font-semibold">Sponsored</h3>
                    <img src={assets.sponsored_img} className="w-75 h-50 rounded-md" alt=""/>
                    <p className="text-slate-600">Email marketing</p>
                    <p className="text-slate-400">Supercharge your marketing with a powerful, easy-to-use plate built for results.</p>
                </div>
               <RecentMessages/>
            </div>        
        </div>
        </DashboardLayout>
    ) : <Loading/>
}