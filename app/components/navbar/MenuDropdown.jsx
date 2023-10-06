import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { MiniLoginButton, MiniLogoutButton } from "../buttons/UserButtons";

const MenuDropdown = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="absolute right-0 z-10  w-max overflow-hidden rounded-lg bg-amber-50 font-semibold  shadow transition-all">
      <ul className="text-sm  ">
        <li>
          {session.status === "authenticated" ? (
            <MiniLogoutButton />
          ) : (
            <MiniLoginButton />
          )}
        </li>
        <li onClick={() => router.push("/cart")}>
          <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
            <HiOutlineShoppingBag className="me-3 text-lg" /> Cart
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;
