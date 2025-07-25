import { CiShoppingCart, CiLogout } from "react-icons/ci";
import { BiSolidCookie } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "./SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
} from "react-icons/io5";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <BiSolidCookie />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <CiShoppingCart />,
    title: "Products",
    path: "/dashboard/products",
  }
];

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-gray-400 bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-2">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image
              src="https://cdn.dealspotr.com/io-images/logo/tailus.jpg?fit=contain&trim=true&flatten=true&extend=0&width=500&height=200"
              alt="tailus logo"
              width={110}
              height={25}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="https://avatars.githubusercontent.com/u/68236786?v=4"
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Cynthia J. Watts
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-400">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
