import React from 'react';
import Image from 'next/image';
import { UserInfo, UserLocalStorage } from '../../../interfaces';
import ExperienceToggle from './ExperienceToggle';
import { Route, Routes } from 'react-router-dom';
import ExperienceCardTable from './ExperienceCardTable';

const Experience_TableView = ({ creationInfo }) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userInfo: UserInfo = user.info;

  return (
    <div
      className="mt-10 grid grid-cols-4 gap-12
    sm:grid-cols-5 
    lg:grid-cols-6
    xl:grid-cols-8 "
    >
      {creationInfo.map((context, index) => {
        return (
          <ExperienceCardTable
            key={context.name}
            thumbnail={context.thumbnail}
            name={context.name}
            description={context.description}
            active={context.active}
            visit={context.visit}
            like={context.like}
          />
        );
      })}
    </div>
  );
};

export default Experience_TableView;
