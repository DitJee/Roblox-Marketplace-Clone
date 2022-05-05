import React from 'react';
import Image from 'next/image';
import { UserInfo, UserLocalStorage } from '../../../interfaces';
import ExperienceToggle from './ExperienceToggle';
import { Route, Routes } from 'react-router-dom';
import ExperienceCardTable from './ExperienceCardTable';

const Experience_TableView = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userInfo: UserInfo = user.info;

  // FIXME: receive the card information from parent component

  return (
    <div className="mt-10">
      <ExperienceCardTable
        thumbnail={userInfo.picture}
        name={userInfo.username}
        description={userInfo.about}
        active={1}
        visit={2}
        like={3}
      />
    </div>
  );
};

export default Experience_TableView;
