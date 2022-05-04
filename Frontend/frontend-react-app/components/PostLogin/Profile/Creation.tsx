import React from 'react';
import Image from 'next/image';
import { UserLocalStorage } from '../../../interfaces';

const ProfileCreation = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="mt-10">
      <div className="mt-8 h-96 w-200 relative">
        <Image
          src={user.info.picture}
          alt="https://picsum.photos/id/2/200/300"
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-full "
        />
      </div>
    </div>
  );
};

export default ProfileCreation;
