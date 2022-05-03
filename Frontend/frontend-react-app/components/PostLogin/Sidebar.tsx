import React from 'react';
import Image from 'next/image';
import {
  HomeIcon,
  UserIcon,
  AnnotationIcon,
  UsersIcon,
  EyeIcon,
  InboxIcon,
  CashIcon,
  UserGroupIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  GiftIcon,
  OfficeBuildingIcon,
  LibraryIcon,
} from '@heroicons/react/outline';

const Sidebar = ({ isVisible }) => {
  const settings: { noHeader: string; withHeader: string } = {
    noHeader:
      'top-0 left-0   bg-gray-300  px-5 text-white fixed h-screen z-40 pt-4',
    withHeader:
      'top-0 left-0   bg-gray-300  px-5 text-white fixed h-screen z-40 pt-24',
  };
  return (
    <div className={isVisible ? settings.withHeader : settings.noHeader}>
      <div className="flex items-center  cursor-pointer ">
        {!isVisible && (
          <>
            <OfficeBuildingIcon className="h-8  text-gray-700"></OfficeBuildingIcon>
            <h1 className=" flex text-3xl font-normal leading-normal mt-0  text-gray-700 cursor-pointer">
              ROBLOCK
            </h1>
          </>
        )}
      </div>
      {[
        {
          name: 'Home',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <HomeIcon className="mr-2 h-5 text-gray-700"></HomeIcon>,
        },
        {
          name: 'Profile',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <UserIcon className="mr-2 h-5 text-gray-700"></UserIcon>,
        },
        {
          name: 'Messages',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: (
            <AnnotationIcon className="mr-2 h-5 text-gray-700"></AnnotationIcon>
          ),
        },
        {
          name: 'Friends',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <UsersIcon className="mr-2 h-5 text-gray-700"></UsersIcon>,
        },
        {
          name: 'Avatar',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <EyeIcon className="mr-2 h-5 text-gray-700"></EyeIcon>,
        },
        {
          name: 'Inventory',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <InboxIcon className="mr-2 h-5 text-gray-700"></InboxIcon>,
        },
        {
          name: 'Trade',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <CashIcon className="mr-2 h-5 text-gray-700"></CashIcon>,
        },
        {
          name: 'Groups',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: (
            <UserGroupIcon className="mr-2 h-5 text-gray-700"></UserGroupIcon>
          ),
        },
        {
          name: 'Blog',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: (
            <BookOpenIcon className="mr-2 h-5 text-gray-700"></BookOpenIcon>
          ),
        },
        {
          name: 'Official Store',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: (
            <ShoppingCartIcon className="mr-2 h-5 text-gray-700"></ShoppingCartIcon>
          ),
        },
        {
          name: 'Gift Cards',
          link: 'https://www.linkedin.com/company/earthshine-games/mycompany/',
          icon: <GiftIcon className="mr-2 h-5 text-gray-700"></GiftIcon>,
        },
      ].map((context) => {
        return (
          <div className="flex items-center justify-left mb-1 mt-2">
            {context.icon}
            <a key={context.name} href={context.link}>
              <h5 className=" font-bold text-gray-600">{context.name}</h5>
            </a>
          </div>
        );
      })}
      <button className="bg-gray-500  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        Get Premium
      </button>
      <div className="flex items-center justify-left mb-1 mt-2">
        <LibraryIcon className="mr-2 h-5 text-gray-700"></LibraryIcon>
        <a href="https://www.linkedin.com/company/earthshine-games/mycompany/">
          <h5 className=" font-bold text-gray-600">Events</h5>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
