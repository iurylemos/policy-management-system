import Link from "next/link";
import React from "react";

const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className="sidebar bg-indigo-800 text-indigo-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      {/* <!-- logo --> */}
      <a href="#" className="flex items-center text-white space-x-2 px-4">
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
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
        <span className="text-2xl font-extrabold">Gerenciador de apólice</span>
      </a>
      {/* <!-- nav --> */}
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          Home
        </Link>
        <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-700">
          About
        </a>
        <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-700">
          Features
        </a>
        <Link
          href="/apolice"
          className="block py-2.5 px-4 rounded hover:bg-indigo-700"
        >
          Apólices
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
