"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import useSWR from 'swr';
import { useRouter } from "next/navigation";

type Props = {
  problemPage?: boolean;
  id?: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

function NavbarSignedIn({ problemPage, id }: Props) {
  const router = useRouter();
  
  // Fetch problems data using SWR
  const { data: problems } = useSWR('/api/problems', fetcher, {
    fallbackData: {} // Provide empty object as fallback
  });
  
  // Fetch session using SWR instead of useSession
  const { data: session } = useSWR('/api/auth/session', fetcher);

  const handleProblemChange = (isForward: boolean) => {
    if (!id || !problems) return;
    
    const currentProblem = problems[id];
    if (!currentProblem) return;

    const currentOrder = currentProblem.order;
    const problemKeys = Object.keys(problems);
    const problemCount = problemKeys.length;
    
    let nextProblemKey: string | undefined;
    
    if (isForward) {
      // Next problem
      if (currentOrder === problemCount) {
        nextProblemKey = problemKeys.find(key => problems[key].order === 1);
      } else {
        nextProblemKey = problemKeys.find(key => problems[key].order === currentOrder + 1);
      }
    } else {
      // Previous problem
      if (currentOrder === 1) {
        nextProblemKey = problemKeys.find(key => problems[key].order === problemCount);
      } else {
        nextProblemKey = problemKeys.find(key => problems[key].order === currentOrder - 1);
      }
    }

    if (nextProblemKey) {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', {
      method: 'POST'
    });
    router.refresh(); // Refresh to update auth state
  };

  return (
    <div className="flex w-full h-full justify-center py-1 z-10 bg-[#282828] border-b border-[#393939]">
      <div
        className={`flex items-center ${
          problemPage ? "w-full mx-5" : "w-11/12 max-w-6xl"
        } justify-between`}
      >
        {/* Logo & Site Name */}
        <a href="/" className="flex items-center">
          <div>
            <img
              className={`mr-4 ${problemPage ? "h-5" : "h-7"}`}
              src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
              alt="LeetCloned Logo"
            />
          </div>
          {!problemPage && <div className="text-xl mr-6 text-white">LeetCloned</div>}
        </a>

        {problemPage && (
          <div className="flex items-center mr-auto space-x-2">
            <a
              href="/"
              className="flex group items-center gap-2 text-[#777777] hover:text-white hover:bg-[#393939] px-2 py-1 rounded mr-2 transition-colors"
            >
              <Bars4Icon className="h-5" />
              <span className="mb-[1px] mr-[2px] text-[#f5f5f5bf] group-hover:text-white font-medium text-sm">
                Problem List
              </span>
            </a>
            <button
              onClick={() => handleProblemChange(false)}
              className="text-gray-400 border-[#f7faff1f] border-[1.4px] hover:text-white hover:border-[#505051] rounded px-1 py-1 cursor-pointer hover:bg-[#393939] transition-colors"
              aria-label="Previous problem"
            >
              <ChevronLeftIcon className="h-3" />
            </button>
            <button
              onClick={() => handleProblemChange(true)}
              className="text-gray-400 border-[#f7faff1f] border-[1.4px] hover:text-white hover:border-[#505051] rounded px-1 py-1 cursor-pointer hover:bg-[#393939] transition-colors"
              aria-label="Next problem"
            >
              <ChevronRightIcon className="h-3" />
            </button>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex items-center space-x-4">
          <a
            href="https://bmc.link/SanathTech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-[#464646] text-sm rounded-md px-3 py-1 cursor-pointer text-[#fea116] bg-[#ffffff1a] transition-colors"
          >
            Buy Me A Coffee
          </a>

          {!session ? (
            <div className="animate-pulse">
              <div className="h-7 w-7 rounded-full bg-gray-600"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="h-7 w-7 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  width={28}
                  height={28}
                />
                <div className="absolute hidden group-hover:block min-w-max top-full right-0 mt-2 py-1 px-3 text-sm text-black bg-gray-200 rounded-md shadow-lg">
                  {session.user?.email}
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="text-[#fea116] hover:bg-[#464646] rounded-md px-2 py-1 cursor-pointer bg-[#ffffff1a] transition-colors"
                aria-label="Sign out"
              >
                <ArrowRightOnRectangleIcon className="h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarSignedIn;