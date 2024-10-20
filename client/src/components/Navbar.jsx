import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

// Navbar menu items
const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Services",
    path: "#",
  },
  {
    id: 3,
    title: "About Us",
    path: "#",
  },
  {
    id: 4,
    title: "Our Team",
    path: "#",
  },
  {
    id: 5,
    title: "Contact Us",
    path: "#",
  },
];

const Navbar = () => {
  return (
    <nav className="z-20 bg-transparent fixed top-0 left-0 w-full">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto py-5 flex justify-between items-center w-11/12 lg:w-10/12"
      >
        {/* Logo section */}
        <div>
          <h1 className="font-bold text-2xl text-customGreen-dark">
            <Link to="/" className="flex items-center">
              <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-1 md:mr-2" />
              <div className="flex flex-col">
                <span className="font-bold text-base md:text-lg text-white">
                  Zero2Hero
                </span>
                <span className="text-[8px] md:text-[10px] text-gray-500 -mt-1">
                  ETHOnline24
                </span>
              </div>
            </Link>
          </h1>
        </div>

        {/* Desktop Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  className="inline-block py-2 px-3 text-white hover:text-customGreen-light relative group"
                >
                  <div className="w-2 h-2 bg-customGreen-light absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </a>
              </li>
            ))}
            <Link to="/auth">
              <button className="py-2 px-5 bg-customGreen hover:bg-customGreen-dark text-white rounded-full transition-all duration-300">
                Sign In
              </button>
            </Link>
          </ul>
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl text-customGreen-dark" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
