"use client";

import { use } from 'react';
import useSWR from 'swr';
import NavbarSignedIn from "@/components/NavbarSignedIn";
import Workspace from "@/components/problems/Workspace";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Problem } from "@/types/problems";

const fetcher = (url: string) => fetch(url).then(res => res.json());

function ProblemsPage({
  params,
}: {
  params: Promise<{ slug: string }> // params Promise sifatida
}) {
  // React.use() yordamida params ni "unwrap" qilish
  const { slug } = use(params);
  
  const { data: problemData, error, isLoading } = useSWR<{
    problem: Problem;
    currentProblem: any; // Adjust this type as needed
  }>(
    `/api/problems/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );


  if (error) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex flex-col">
        <div className="bg-[#282828] shadow-md h-[52px]">
          <NavbarSignedIn problemPage id={slug} />
        </div>
        <div className="flex-1 flex items-center justify-center text-red-500">
          {error.status === 404 
            ? "Problem not found" 
            : "Failed to load problem. Please try again."}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col">
      <NavbarSignedIn problemPage id={slug} />
      <div className="relative">
        {isLoading || !problemData ? (
          <LoadingSkeleton />
        ) : (
          <Workspace 
            problem={problemData.problem} 
            currentProblem={problemData.currentProblem}
            id={slug} 
          />
        )}
      </div>
    </div>
  );
}

export default ProblemsPage;