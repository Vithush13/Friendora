import React from "react";

export default function Loading ({height = '100vh'}) {
    return (
        <div style={{height}} className="flex itms-center justify-center h-screen">
            <div className=" w-10 h-10 rounded-full border-3 border-blue-500 border-t-transparent animate-spin">

            </div>
        </div>
    )
}
