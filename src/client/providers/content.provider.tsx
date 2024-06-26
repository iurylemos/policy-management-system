import Link from "next/link";
import React from "react";

type ContentProviderProps = {
  children: React.ReactNode;
};

const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* <!-- mobile navbar --> */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* <!-- logo --> */}
        <a href="#" className="block p-4 text-white font-bold">
          Gerenciador de Apólices
        </a>
        {/* <!-- mobile menu --> */}
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

      {/* <!-- sidebar --> */}
      <div className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
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
          <span className="text-2xl font-extrabold">
            Gerenciador de apólice
          </span>
        </a>
        {/* <!-- nav --> */}
        <nav>
          <Link
            href="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Home
          </Link>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-700">
            About
          </a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-700">
            Features
          </a>
          <Link
            href="/apolice"
            className="block py-2.5 px-4 rounded hover:bg-blue-700"
          >
            Apólices
          </Link>
        </nav>
      </div>

      {/* <!-- main content --> */}
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default ContentProvider;
