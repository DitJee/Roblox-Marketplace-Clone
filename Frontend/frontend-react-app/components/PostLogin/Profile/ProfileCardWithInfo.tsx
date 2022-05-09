import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserService from '../../../Services/user.service';
import { UserInfo } from '../../../interfaces';

const ProfileCardWithInfo = ({ user }) => {
  // TODO: fetch the real number

  const [friendCount, setFriendCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const userInfo: UserInfo = user.info;

  const getProfileInfo = async () => {
    try {
      const friends = await UserService.getFriends(userInfo.id);
      const followers = await UserService.getFollower(userInfo.id);
      const followings = await UserService.getFollowing(userInfo.id);

      setFriendCount(friends.friends.length);
      setFollowerCount(followers.result.length);
      setFollowingCount(followings.result.length);
    } catch (error) {
      setFriendCount(0);
      setFollowerCount(0);
      setFollowingCount(0);

      console.error(error);
    }
  };

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

  useEffect(() => {
    getProfileInfo();
  }, []);

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
              count: friendCount,
            },
            {
              context: 'Followers',
              count: followerCount,
            },
            {
              context: 'Following',
              count: followingCount,
            },
          ].map((info) => {
            return (
              <div
                key={info.context}
                className="flex items-center text-center text-1xl font-normal leading-normal dark:text-gray-600 mt-4 mr-3"
              >
                <h4>{smallContext(info.context)}</h4>
                <h4 className="flex items-center font-bold text-2xl font-normal leading-normal dark:text-gray-600  ml-2">
                  {info.count}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardWithInfo;
