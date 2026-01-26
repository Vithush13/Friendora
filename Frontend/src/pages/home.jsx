import DashboardLayout from "../components/layouts/layout"
import React,{useState} from "react";
import { useEffect } from "react";
import { dummyPostsData } from "../assets/assets";
import Loading from "../components/layouts/loading";
import StoriesBar from "../components/layouts/storiesBar";

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
                List of post
              </div>
            </div>
            {/*Right slidebar*/}
            <div>
                <div>
                    <h1>Sponsored</h1>
                </div>
               <h1> Resent message</h1>
            </div>        
        </div>
        </DashboardLayout>
    ) : <Loading/>
}