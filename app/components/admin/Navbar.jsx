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
          "fixed flex-col gap-3  text-white shadow-l rounded-r-xl   overflow-hidden transition-all ease-in-out duration-500 -left-32 top-28 hover:-left-6"
        }
      >
        <nav className="flex flex-col py-4 ">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-end justify-end px-4 py-4 odd:bg-orange-500 even:bg-orange-400 rounded-r-md mt-2 mr-2 "
            >
              <div className="text-lg px-2 text-center ">{item.text}</div>
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
