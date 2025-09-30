import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-200 relative overflow-hidden">
      {/* Left content */}
      <div className="w-screen h-screen max-w-[50%] p-8 flex flex-col justify-center">
        
        {children}
      </div>

      {/* Background shapes (now applied globally) */}
      <div className="absolute w-72 h-72 top-[-10%] left-[10%] bg-blue-400/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-96 h-96 bottom-[-15%] right-[-10%] bg-blue-300/25 rounded-full animate-pulse-slow"></div>
      <div className="absolute w-48 h-48 top-[20%] right-[15%] bg-gradient-to-tr from-blue-400 to-blue-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute w-32 h-2 bg-gradient-to-r from-blue-500 to-blue-300 top-[35%] left-[20%] opacity-30 rotate-12"></div>
      <div className="absolute w-24 h-2 bg-gradient-to-r from-blue-500 to-blue-300 bottom-[40%] right-[15%] opacity-30 rotate-[-25deg]"></div>

      {/* Right side content */}
      <div className="hidden md:flex w-[60%] justify-center items-center text-center relative z-10 p-8">
        <div className="max-w-[80%] flex flex-col items-center mx-auto px-4 py-25">
        

          {/* Text */}
          <h1 className="text-3xl font-semibold text-blue-900 mb-2">
            Discover, connect, and grow together.
          </h1>
          <p className="text-sm text-blue-800 leading-relaxed text-center">
            Build lasting friendships, share your moments, and stay connected with
            the people who matter most — only on Friendora.
          </p>
        </div>
      </div>
    </div>
  );
}
