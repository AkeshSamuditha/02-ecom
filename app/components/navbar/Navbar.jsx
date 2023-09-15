"use client";
import React from "react";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import { useCartContext } from "@app/contexts/index";
import { LoginButton, LogoutButton } from "./UserButtons";
// import Search from "../search";
import MenuDropdown from "./MenuDropdown";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useRouter();

  const { cart } = useCartContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const session = useSession();
  return (
    <nav
      className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] bg-slate-100 ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">
          {/* <Link href="/profile">
            <Image
              className="rounded-full border-2  bg-yellow-700 me-3 hover:bg-yellow-900 cursor-pointer"
              src="defaultUser.png"
              alt="userProfileImage"
              height={40}
              width={40}
            />
          </Link> */}
          <Logo />
        </section>
        <div className="hidden sm:block sm:w-1/3 relative">
          {/* <Search /> */}
        </div>

        <section className="flex items-center">
          <ul className=" hidden md:flex justify-between ps-1">
            <Link
              href="/products"
              className="mx-2 px-3 shadow-sm rounded-xl text-white bg-yellow-700 hover:bg-yellow-800 transition flex items-center"
            >
              <span className="text-lg">Explore</span>
              <MdOutlineExplore className="hidden xs:block ml-2" />
            </Link>
            <li className="mx-2 px-3 shadow-sm rounded-xl text-white bg-yellow-500 text-sm hover:bg-yellow-800 transition flex items-center">
              {session.status === "authenticated" ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )}
            </li>
            <li
              className="relative bg-yellow-500 text-white rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm flex items-center justify-center w-9 h-9"
              onClick={() => navigate.push("/cart")}
            >
              <HiOutlineShoppingBag size="1.6rem" />
              {cart.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-rose-600 border-2 border-[--theme-color] rounded-full -top-2 -right-2 ">
                  {cart.length}
                </div>
              )}
            </li>
          </ul>
          <section className="md:hidden cursor-pointer relative">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && <MenuDropdown />}
          </section>
        </section>
      </div>

      <section className="mt-4 sm:hidden relative">{/* <Search /> */}</section>
    </nav>
  );
};

export default Navbar;
