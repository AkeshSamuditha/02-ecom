"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogoutButton } from "../buttons/UserButtons";

const AdminLogo = () => {
  const [colorChange, setColorChange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
    return () => window.removeEventListener("scroll", changeNavbarColor);
  });
  return (
    <div
      className={`max-w-screen fixed left-0 right-0 mb-3 flex justify-between bg-slate-100 px-[4%] py-3 sm:flex-row md:px-[10%] ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <Link href="/">
        <div className="flex cursor-pointer items-center justify-center space-x-2 text-4xl font-semibold transition hover:text-orange-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <span>Pulse Admin</span>
        </div>
      </Link>
      <div className="mx-2 flex items-center rounded-xl bg-amber-600 px-6 py-2 text-sm text-white shadow-sm transition hover:bg-yellow-500">
        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminLogo;
