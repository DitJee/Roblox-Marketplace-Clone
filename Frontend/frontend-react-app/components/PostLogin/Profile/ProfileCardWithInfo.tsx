import React from 'react';
import Image from 'next/image';

const ProfileCardWithInfo = ({ user }) => {
  // TODO: fetch the real number
  const bigNumber = (number) => {
    return (
      <div className=" ml-3 mr-3 text-2xl font-bold  dark:text-gray-800">
        {number}
      </div>
    );
  };

  const smallContext = (context) => {
    return <div className="mt-1">{context + ':'}</div>;
  };

  return (
    <div className="grid grid-cols-4 bg-gray-100 rounded-md py-2 ">
      <div className=" my-4 h-32 w-32 relative md:mx-4 xl:mx-10">
        <Image
          src={user.info.picture}
          alt="https://picsum.photos/id/1/200/300"
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-full "
        />
      </div>
      <div className="py-2 flex flex-col text-left items-start row-span-3 md:ml-5 xl:ml-1">
        <h4 className="text-3xl font-bold leading-normal mt-2 dark:text-gray-800">
          {user.info.username}
        </h4>
        <h4 className="text-1xl font-normal leading-normal dark:text-gray-800">
          {'@' + user.info.username}
        </h4>
        <div className="flex flex-row items-center">
          {[
            {
              context: 'Friends',
            },
            {
              context: 'Followers',
            },
            {
              context: 'Following',
            },
          ].map((info) => {
            return (
              <h4
                key={info.context}
                className="flex text-1xl font-normal leading-normal dark:text-gray-600 mt-4"
              >
                {smallContext(info.context)}
                {bigNumber(5)}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardWithInfo;
