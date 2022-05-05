import React from 'react';
import Image from 'next/image';
import { User, UserInfo, UserLocalStorage } from '../../../interfaces';
import { TemplateIcon, TableIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const ExperienceToggle = ({ bIsFullView }) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));

  const userInfo: UserInfo = user.info;

  const styles: {
    full: { focused: string; unFocused: string };
    table: { focused: string; unFocused: string };
  } = {
    full: {
      focused:
        'p-3 flex items-center py-4 bg-gray-300 border border-gray-800 cursor-pointer',
      unFocused:
        'p-3 flex items-center py-4 bg-gray-300 border border-gray-400 cursor-pointer',
    },
    table: {
      focused:
        'ml-5 p-3 flex items-center py-4 bg-gray-300 border border-gray-800 cursor-pointer',
      unFocused:
        'ml-5 p-3 flex items-center py-4 bg-gray-300 border border-gray-400 cursor-pointer',
    },
  };

  return (
    <div className="grid grid-cols-2">
      <h1 className="text-2xl font-bold leading-normal mt-2 dark:text-gray-800">
        Experience
      </h1>
      <div className="flex justify-end ">
        <Link
          className={bIsFullView ? styles.full.focused : styles.full.unFocused}
          to={''}
        >
          <TemplateIcon className=" h-4 text-gray-700"></TemplateIcon>
        </Link>

        <Link
          className={
            bIsFullView ? styles.table.unFocused : styles.table.focused
          }
          to={'tableview'}
        >
          <TableIcon className=" h-4 text-gray-700"></TableIcon>
        </Link>
      </div>
    </div>
  );
};

export default ExperienceToggle;
