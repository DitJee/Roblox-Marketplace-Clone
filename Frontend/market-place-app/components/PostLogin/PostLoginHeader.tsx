import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  OfficeBuildingIcon,
  SearchIcon,
  UserCircleIcon,
  CashIcon,
  BellIcon,
} from "@heroicons/react/solid";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

import Wallet from "../Wallet";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import AddCreatorModal from "./AddCreatorModal/AddCreatorModal";

const PostLoginHeader = ({ isVisible, onClickSidebarToggle, showSidebar }) => {
  return (
    <div>
      <header className="sticky top-0 z-50 grid grid-cols-3 items-center   bg-gray-300 shadow-md p-5 md:px-10">
        {/* 
            left 
        */}
        <div className="relative flex items-center  space-x-14 h-10 my-auto">
          <button onClick={onClickSidebarToggle}>
            <MenuIcon className=" h-6 cursor-pointer "></MenuIcon>
          </button>
          <Link to="">
            <div className="flex items-center  cursor-pointer ">
              <OfficeBuildingIcon className="h-8  "></OfficeBuildingIcon>

              <h1 className=" flex text-3xl font-normal leading-normal mt-0  text-gray-700 cursor-pointer">
                ROBLOCK
              </h1>
            </div>
          </Link>

          {[
            {
              context: "Discover",
              link: "discover",
            },
            {
              context: "Shop",
              link: "avatar-shop",
            },
            {
              context: "Create",
              link: "create/0",
            },
            {
              context: "Robuck",
              link: "robuck",
            },
          ].map((element) => (
            <Link key={element.context} to={element.link}>
              <h1 className=" flex text-1xl font-bold text-gray-700 leading-normal mt-0 cursor-pointer">
                {element.context}
              </h1>
            </Link>
          ))}
        </div>
        {/* 
            middle 
        */}
        <div className="ml-40 flex items-center  justify-center text-gray-500">
          <div className=" flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
            <input
              className="hidden md:inline-flex flex-grow pl-4 w-full bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400 "
              type="text"
              placeholder="Start Searching"
            />
            <SearchIcon className="ml-36 h-8 bg-gray-800 text-white rounded-full p-2  cursor-pointer md:mx-3" />
          </div>
        </div>
        {/* 
            Right 
        */}
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <BellIcon className="h-6 cursor-pointer"></BellIcon>
          <CashIcon className="h-6 cursor-pointer"></CashIcon>
          <div className="flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer">
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
          <AddCreatorModal />
          <Wallet />
        </div>
      </header>
      {showSidebar && <Sidebar isVisible={isVisible} />}
    </div>
  );
};

export default PostLoginHeader;
