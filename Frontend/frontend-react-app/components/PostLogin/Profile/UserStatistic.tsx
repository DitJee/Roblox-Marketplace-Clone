import React from 'react';
import Image from 'next/image';
import { User, UserInfo, UserLocalStorage } from '../../../interfaces';
const UserStatistic = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));

  const userInfo: UserInfo = user.info;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold leading-normal mt-2 dark:text-gray-800">
        Statistics
      </h1>
      <div className="grid grid-cols-2 items-center  p-2 bg-gray-100 ">
        <h1 className=" text-center text-2xl font-bold leading-normal mt-2 dark:text-gray-800">
          Join Date
        </h1>
        <h1 className=" text-center  text-2xl font-bold leading-normal mt-2 dark:text-gray-800">
          Place Visits
        </h1>
        <h1 className="mb-2 text-center  text-1xl font-normal leading-normal mt-2 dark:text-gray-800">
          {userInfo.createdAt.split('T', 1)}
        </h1>
        <h1 className="mb-2 text-center  text-1xl font-normal leading-normal mt-2 dark:text-gray-800">
          {/* TODO: get the real visited place */}
          {0}
        </h1>
      </div>
    </div>
  );
};

export default UserStatistic;
