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
import { LoginButton, LogoutButton } from "../buttons/UserButtons";
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
      className={`max-w-screen fixed left-0 right-0 mb-3 flex flex-col bg-slate-100 px-[4%] py-3 sm:flex-row md:px-[10%] ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex w-full items-center justify-between">
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
        <div className="relative hidden sm:block sm:w-1/3">
          {/* <Search /> */}
        </div>

        <section className="flex items-center">
          <ul className=" hidden justify-between ps-1 md:flex">
            <Link
              href="/products"
              className="mx-2 flex items-center rounded-xl bg-yellow-700 px-3 text-white shadow-sm transition hover:bg-yellow-800"
            >
              <span className="text-lg">Explore</span>
              <MdOutlineExplore className="xs:block ml-2 hidden" />
            </Link>
            <li className="mx-2 flex items-center rounded-xl bg-yellow-500 px-3 text-sm text-white shadow-sm transition hover:bg-yellow-800">
              {session.status === "authenticated" ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )}
            </li>
            <li
              className="relative mx-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-white shadow-sm transition hover:bg-yellow-800"
              onClick={() => navigate.push("/cart")}
            >
              <HiOutlineShoppingBag size="1.6rem" />
              {cart.length > 0 && (
                <div className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[--theme-color] bg-rose-600 text-xs font-bold text-white ">
                  {cart.length}
                </div>
              )}
            </li>
          </ul>
          <section className="relative cursor-pointer md:hidden">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && <MenuDropdown />}
          </section>
        </section>
      </div>

      <section className="relative mt-4 sm:hidden">{/* <Search /> */}</section>
    </nav>
  );
};

export default Navbar;
