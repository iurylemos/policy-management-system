import React from "react";
import Sidebar from "@/src/client/components/molecules/Sidebar";
import Link from "next/link";

type ContentProviderProps = {
  children: React.ReactNode;
};

const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-200">
      <div className="bg-indigo-800 text-gray-100 flex justify-between md:hidden">
        <Link href="/" className="block p-4 text-white font-bold">
          Gerenciador de Apólices
        </Link>
        <button className="mobile-menu-btn p-4 focus:outline-none focus:bg-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <Sidebar />
      <div className="flex-1 p-4 md:p-10">{children}</div>
    </div>
  );
};

export default ContentProvider;
