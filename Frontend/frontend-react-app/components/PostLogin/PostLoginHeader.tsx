import React from 'react';
import Image from 'next/image';
import {
  GlobeAltIcon,
  MenuIcon,
  OfficeBuildingIcon,
  SearchIcon,
  UserCircleIcon,
  CashIcon,
  BellIcon,
} from '@heroicons/react/solid';
const PostLoginHeader = () => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 items-center   bg-gray-300 shadow-md p-5 md:px-10">
      {/* 
            left 
        */}

      <div className="relative flex items-center  space-x-2 h-10 my-auto">
        <MenuIcon className=" h-6 cursor-pointer "></MenuIcon>
        <div className="flex items-center  cursor-pointer ">
          <OfficeBuildingIcon className="h-8  "></OfficeBuildingIcon>

          <h1 className=" flex text-3xl font-normal leading-normal mt-0  text-gray-700 cursor-pointer">
            ROBLOCK
          </h1>
        </div>

        {[
          {
            context: 'Discover',
            link: '/discover',
          },
          {
            context: 'Shop',
            link: '/avatar-shop',
          },
          {
            context: 'Create',
            link: '/create',
          },
          {
            context: 'Robuck',
            link: '/robuck',
          },
        ].map((element) => (
          <h1
            key={element.context}
            className=" flex text-1xl font-normal leading-normal mt-0  text-gray-700 cursor-pointer"
          >
            {element.context}
          </h1>
        ))}

        {/* 
            Search Bar 
            */}
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm border-gray-500">
          <input
            className="hidden md:inline-flex flex-grow pl-6 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400"
            type="text"
            placeholder="Start Searching"
          />
          <SearchIcon className=" h-8 bg-gray-800 text-white rounded-full p-2  cursor-pointer md:mx-3" />
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
      </div>
    </header>
  );
};

export default PostLoginHeader;
