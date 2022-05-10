import React from 'react';
import Image from 'next/image';
import { UserInfo, UserLocalStorage } from '../../../interfaces';
import ExperienceToggle from './ExperienceToggle';
import { Route, Routes } from 'react-router-dom';
import ExperienceCardFull from './ExperienceCardFull';
import { CreationInfo } from '../../../interfaces/index';

const Experience_FullView = ({ creationInfo }) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userInfo: UserInfo = user.info;

  return (
    <div className="mt-10">
      <div className="my-5">
        {creationInfo.map((context, index) => {
          return (
            <ExperienceCardFull
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
    </div>
  );
};

export default Experience_FullView;
