import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav>
      <div className="bg-gray-200 w-full py-1 text-gray-700 flex items-center gap-5">
        <Link href={"/create"}>
          <a className="flex items-center justify-center w-28 gap-1 bg-gray-300 p-3 m-4 rounded-xl">
            <span>Create</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </Link>
        <Link href={"/polls"}>
          <a className="flex items-center justify-center gap-1">
            <span>Take Polls</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
