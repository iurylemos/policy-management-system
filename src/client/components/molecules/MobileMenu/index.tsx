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
        <Link href="/" className="flex flex-row gap-3 p-4 text-white font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span className="text-xl font-extrabold">Apólice Tool</span>
        </Link>
        <button
          className="mobile-menu-btn p-4 focus:outline-none focus:bg-indigo-700"
          data-testid="mobile-menu-hamburguer"
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
                    (route.path !== "/" && pathname.includes(route.path)) ||
                    pathname === route.path
                      ? "font-bold"
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
