"use client";
import React from "react";

export const LoadingSkeleton = () => {
  // Fixed widths for consistent server-client rendering
  const codeLineWidths = [
    "85%", "70%", "90%", "60%", "75%", 
    "80%", "65%", "95%", "55%", "70%",
    "85%", "50%", "75%", "90%", "65%"
  ];

  return (
    <div className="flex w-full h-[calc(100vh-52px)]">
      {/* Problem Description Skeleton */}
      <div className="flex bg-[#1A1A1A] w-1/2 h-full">
        <div className="bg-[#282828] w-full m-2 mr-[5px] rounded-lg animate-pulse">
          {/* Title */}
          <div className="h-6 bg-[#373737] rounded w-3/4 mt-4 mx-4"></div>
          {/* Difficulty */}
          <div className="h-4 bg-[#373737] rounded w-1/4 mt-3 mx-4"></div>
          
          {/* Description sections */}
          <div className="space-y-3 mt-6 mx-4">
            <div className="h-3 bg-[#373737] rounded w-full"></div>
            <div className="h-3 bg-[#373737] rounded w-full"></div>
            <div className="h-3 bg-[#373737] rounded w-3/4"></div>
          </div>

          {/* Example section */}
          <div className="mt-8 mx-4">
            <div className="h-4 bg-[#373737] rounded w-1/5 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[#373737] rounded w-1/6"></div>
              <div className="h-16 bg-[#373737] rounded"></div>
              <div className="h-3 bg-[#373737] rounded w-1/6"></div>
              <div className="h-16 bg-[#373737] rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Skeleton */}
      <div className="flex bg-[#1A1A1A] w-1/2 h-full">
        <div className="flex flex-col justify-between w-full m-2 ml-[5px] rounded-lg">
          {/* Editor Top Bar */}
          <div className="bg-[#282828] w-full h-9 rounded-t-lg"></div>
          
          {/* Code Editor */}
          <div className="bg-[#282828] w-full h-[calc(60%-5px)] rounded-lg">
            <div className="space-y-2 p-4">
              {codeLineWidths.map((width, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-3 bg-[#373737] rounded w-4"></div>
                  <div 
                    className="h-3 bg-[#373737] rounded w-full" 
                    style={{ width }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Console */}
          <div className="bg-[#282828] w-full h-[calc(40%-5px)] rounded-b-lg">
            <div className="flex p-2 border-b border-[#373737]">
              <div className="h-4 bg-[#373737] rounded w-16 mr-4"></div>
              <div className="h-4 bg-[#373737] rounded w-16"></div>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-3 bg-[#373737] rounded w-1/4"></div>
              <div className="h-8 bg-[#373737] rounded"></div>
              <div className="h-3 bg-[#373737] rounded w-1/4"></div>
              <div className="h-8 bg-[#373737] rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;