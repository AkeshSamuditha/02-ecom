"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogoutButton } from "../navbar/UserButtons";

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
      className={`flex justify-between sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] bg-slate-100 ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <Link href="/">
        <div className="flex items-center justify-center space-x-2 text-4xl font-semibold hover:text-orange-600 cursor-pointer transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
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
      <div className="mx-2 px-6 py-2 shadow-sm rounded-xl text-white bg-amber-600 text-sm hover:bg-yellow-500 transition flex items-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminLogo;
