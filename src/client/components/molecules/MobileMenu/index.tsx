"use client";

import React, { useState } from "react";
import useDeviceType from "@/src/client/hooks/useDeviceType.hook";
import Link from "next/link";
import { routesSystem } from "@/src/client/routes/index.route";
import { usePathname } from "next/navigation";

const MobileMenu: React.FC = (): JSX.Element => {
  const [statusOptions, setStatusOptions] = useState<boolean>(false);
  const isMobile = useDeviceType("mobile-640");
  const pathname = usePathname();

  const handleOptionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    setStatusOptions(!statusOptions);
  };

  return (
    <section>
      <div className="bg-indigo-800 text-gray-100 flex justify-between md:hidden">
        <Link href="/" className="block p-4 text-white font-bold">
          Gerenciador de Apólices
        </Link>
        <button
          className="mobile-menu-btn p-4 focus:outline-none focus:bg-indigo-700"
          onClick={handleOptionClick}
        >
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
      {/* <!--nav--> */}
      <nav
        className={`${
          (!statusOptions && isMobile) || !isMobile ? "hidden" : "block"
        } bg-indigo-800 p-4`}
      >
        <ul className="list-reset md:flex md:items-center">
          {routesSystem.map((route, idx) => {
            return (
              <li className="md:ml-4" key={Math.random() + idx}>
                <Link
                  href={route.path}
                  className={`flex flex-row gap-3 py-2 text-white no-underline md:border-none md:p-0 hover:underline ${
                    pathname === route.path
                      ? "font-semibold pointer-events-none"
                      : ""
                  }`}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default MobileMenu;
