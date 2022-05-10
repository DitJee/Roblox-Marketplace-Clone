import React from "react";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md p-5 md:px-10">
      {/* 
            left 
        */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        {/* <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                /> */}
        <h1 className="flex text-6xl font-normal leading-normal mt-0 mb-2 text-gray-800">
          ROBLOCK
        </h1>
      </div>

      {/* 
            Mid 
        */}

      {/* 
            Right 
        */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <Link to="/login">
          <div className="flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer">
            <div className=" md:inline cursor-pointer">LOGIN</div>
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
