"use client";

import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import Search from "../search";
import MenuDropdown from "./MenuDropdown";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
// const { token } = useAuthContext();
// const { cart } = useCartContext();
// const { wishlist } = useWishlistContext();
// const navigate = useRouter();

const Navbar = () => {
  const navigate = useRouter();
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
          <Search />
        </div>

        <section className="flex items-center">
          <ul className=" hidden md:flex justify-between ps-1">
            <Link
              href="/products"
              className="mx-2 px-3 py-1 shadow-sm rounded-xl text-white bg-yellow-700 text-sm hover:bg-yellow-800 transition"
            >
              <span className="text-lg xs:hidden">Explore</span>
              <MdOutlineExplore className=" hidden xs:block" />
            </Link>
            <li className="mx-2 px-3 py-1 shadow-sm rounded-xl text-white bg-yellow-500 text-sm hover:bg-yellow-800 transition">
              {session.status === "authenticated" ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )}

              {/* <BsBookmarkHeart /> */}
              {/* {token && wishlist.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-rose-600 border-2 border-[--theme-color] rounded-full -top-2 -right-2 ">
                  {wishlist.length}
                </div> */}
              {/* )} */}
            </li>
            <li
              className="relative bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-900 cursor-pointer mx-2 transition shadow-sm"
              onClick={() => navigate.push("/cart")}
            >
              <HiOutlineShoppingBag />
              {/* {token && cart.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-rose-600 border-2 border-[--theme-color] rounded-full -top-2 -right-2 ">
                  {cart.length}
                </div> */}
              {/* )} */}
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

      <section className="mt-4 sm:hidden relative">
        <Search />
      </section>
    </nav>
  );
};

export default Navbar;
