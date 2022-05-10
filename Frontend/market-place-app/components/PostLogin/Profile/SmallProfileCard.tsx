import React from 'react';
import Image from 'next/image';
import { UserLocalStorage } from '../../../interfaces';
import { Link, useNavigate } from 'react-router-dom';

const SmallProfileCard = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex items-center justify-start">
      <div className="h-32 w-32 relative">
        <Link to="profile">
          <Image
            src={user.info.picture}
            alt="https://picsum.photos/id/1/200/300"
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="rounded-full cursor-pointer"
          />
        </Link>
      </div>
      <h4 className="ml-6 text-3xl font-bold leading-normal mt-2 dark:text-gray-800">
        {user.info.username}
      </h4>
    </div>
  );
};

export default SmallProfileCard;
