"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Problem } from "@/types/problems";
import CircleSkeleton from "./CircleSkeleton";
import RectangleSkeleton from "./RectangleSkeleton";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  StarIcon as StarIconOutline,
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";

// "use client";
// import React, { useEffect, useState } from 'react';
// import { Problem } from "@/types/problems";
// ... other imports ...

type Props = {
  problem: Problem;
  currentProblem: any; // Add this prop
  _solved: boolean;
};

function ProblemDescription({ problem, currentProblem, _solved }: Props) {
  const [userData, setUserData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [updating, setUpdating] = useState(false);

  // Remove the SWR call since we get data from props now
  const examples = problem.examples || [];
  const isLoading=false
  // Difficulty class with fallback
  const problemDifficultyClass = 
    currentProblem?.problemList?.difficulty === "Easy" ? "text-[#00AD7C]" :
    currentProblem?.problemList?.difficulty === "Medium" ? "text-[#FFA11B]" :
    "text-[#FF3750]";

  const handleLike = async () => {
    if (updating) return;
    setUpdating(true);
    
    try {
      const newData = { ...userData };
      if (newData.liked) {
        newData.liked = false;
      } else {
        if (newData.disliked) newData.disliked = false;
        newData.liked = true;
      }
      
      localStorage.setItem(`problem-${problem.id}-data`, JSON.stringify(newData));
      setUserData(newData);
    } finally {
      setUpdating(false);
    }
  };

  const handleDislike = async () => {
    if (updating) return;
    setUpdating(true);
    
    try {
      const newData = { ...userData };
      if (newData.disliked) {
        newData.disliked = false;
      } else {
        if (newData.liked) newData.liked = false;
        newData.disliked = true;
      }
      
      localStorage.setItem(`problem-${problem.id}-data`, JSON.stringify(newData));
      setUserData(newData);
    } finally {
      setUpdating(false);
    }
  };

  const handleStar = async () => {
    if (updating) return;
    setUpdating(true);
    
    try {
      const newData = { ...userData, starred: !userData.starred };
      localStorage.setItem(`problem-${problem.id}-data`, JSON.stringify(newData));
      setUserData(newData);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-[#282828] rounded-lg flex flex-col min-w-[354px]">
      {/* Tabs */}
      <div className="flex w-full gap-8 px-4 h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
        <button className="flex items-center border-b-[2px] border-[#B3B3B3] h-full text-white">
          Description
        </button>
        <button className="hover:text-white">Editorial</button>
        <button className="hover:text-white">Solutions</button>
        <button className="hover:text-white">Submissions</button>
      </div>
      
      {/* Content */}
      <div className="flex flex-col w-full h-[calc(100vh-105px)] overflow-y-auto bg-[#282828] rounded-b-lg p-5">
        {/* Title */}
        <div className="flex w-full justify-between">
          <div className="text-lg font-medium">
            {problem.title || "Untitled Problem"}
          </div>
          <div className="flex items-center text-[#8A8A8A]">
            <button className="mr-5 text-sm hover:text-white hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              Hint
            </button>
            <button className="hover:text-white hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              <EllipsisHorizontalCircleIcon className="h-5" />
            </button>
          </div>
        </div>
        
        {/* Difficulty and Actions */}
        {isLoading ? (
          <div className="flex gap-[19px] mt-3">
            <RectangleSkeleton />
            {userData.solved && <CircleSkeleton />}
            <RectangleSkeleton />
            <RectangleSkeleton />
            <CircleSkeleton />
            <CircleSkeleton />
          </div>
        ) : (
          <div className="flex gap-5 items-center mt-3 text-[#8A8A8A]">
            <div className={`${problemDifficultyClass} text-sm`}>
              {currentProblem?.problemList?.difficulty || "Unknown"}
            </div>
            
            {(userData.solved || _solved) && (
              <div className="text-[#2CBB5D]">
                <CheckCircleIcon className="h-[18px]" />
              </div>
            )}
            
            <button
              className="flex items-center hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleLike}
              disabled={updating}
            >
              <div className="mr-1">
                {updating ? (
                  <ArrowPathIcon className="h-[17px] animate-spin" />
                ) : userData.liked ? (
                  <HandThumbUpIcon className="h-[17px] text-blue-600" />
                ) : (
                  <HandThumbUpIcon className="h-[17px]" />
                )}
              </div>
              <div className="text-xs">
                {currentProblem?.dbProblem?.likes || 0}
              </div>
            </button>
            
            <button
              className="flex items-center hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleDislike}
              disabled={updating}
            >
              <div className="mr-1">
                {updating ? (
                  <ArrowPathIcon className="h-[17px] animate-spin" />
                ) : userData.disliked ? (
                  <HandThumbDownIcon className="h-[17px] text-red-600" />
                ) : (
                  <HandThumbDownIcon className="h-[17px]" />
                )}
              </div>
              <div className="text-xs">
                {currentProblem?.dbProblem?.dislikes || 0}
              </div>
            </button>
            
            <button
              className="hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleStar}
              disabled={updating}
            >
              {updating ? (
                <ArrowPathIcon className="h-[17px] animate-spin" />
              ) : userData.starred ? (
                <StarIconSolid className="h-[18px] text-yellow-500" />
              ) : (
                <StarIconOutline className="h-[18px]" />
              )}
            </button>
            
            <button className="hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              <ArrowTopRightOnSquareIcon className="h-4" />
            </button>
          </div>
        )}

        {/* Problem Description */}
        <div className="text-sm mt-4">
          {problem.description ? (
            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
          ) : (
            <div className="text-[#8A8A8A]">No description available</div>
          )}
        </div>
        
        {/* Examples */}
        <div className="mt-12 space-y-4">
          {examples.length > 0 ? (
            examples.map((example, index) => (
              <div key={example.id || `example-${index}`}>
                <p className="font-bold text-sm">Example {index + 1}:</p>
                {example.img && (
                  <img 
                    src={example.img} 
                    alt={`Example ${index + 1}`} 
                    className="mt-3 max-w-full h-auto rounded"
                  />
                )}
                <div className="bg-[#373737] text-[#eff1f6bf] rounded-lg py-3 px-4 mt-[18px]">
                  <pre className="whitespace-pre-wrap">
                    <strong className="text-white">Input: </strong>
                    {example.inputText || "No input provided"}
                    <br />
                    <strong className="text-white">Output: </strong>
                    {example.outputText || "No output provided"}
                    <br />
                    {example.explanation && (
                      <>
                        <strong className="text-white">Explanation: </strong>
                        {example.explanation}
                      </>
                    )}
                  </pre>
                </div>
              </div>
            ))
          ) : (
            <div className="text-[#8A8A8A]">No examples provided</div>
          )}
        </div>
        
        {/* Constraints */}
        <div className="mt-12">
          <div className="text-sm">
            <p className="font-bold text-sm">Constraints:</p>
            {problem.constraints ? (
              <ul className="list-disc ml-5 mt-5">
                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
              </ul>
            ) : (
              <div className="text-[#8A8A8A] mt-2">No constraints specified</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;