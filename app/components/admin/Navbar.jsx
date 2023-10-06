"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faClipboardList,
  faShoppingBag,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    text: "New Product",
    icon: faPlus,
    href: "/admin/new",
    matchPath: "new",
  },
  {
    text: "Dashboard",
    icon: faTachometerAlt,
    href: "/admin/dashboard",
    matchPath: "dashboard",
  },
  {
    text: "Products",
    icon: faShoppingBag,
    href: "/admin/products",
    matchPath: "products",
  },
  {
    text: "Orders",
    icon: faClipboardList,
    href: "/admin/orders",
    matchPath: "/orders",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div>
      <aside
        className={
          "shadow-l fixed -left-32  top-28 flex-col gap-3   overflow-hidden rounded-r-xl text-white transition-all duration-500 ease-in-out hover:-left-6"
        }
      >
        <nav className="flex flex-col py-4 ">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="mr-2 mt-2 flex items-end justify-end rounded-r-md px-4 py-4 odd:bg-orange-500 even:bg-orange-400 "
            >
              <div className="px-2 text-center text-lg ">{item.text}</div>
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-2xl ${
                  pathname.includes(item.matchPath) ? "animate-bounce " : ""
                }`}
              />
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
