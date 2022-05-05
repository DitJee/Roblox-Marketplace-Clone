import React from 'react';
import Image from 'next/image';
import { UserLocalStorage } from '../../../interfaces';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AboutForm from './AboutForm';
import UserWearing from './UserWearing';
import UserStatistic from './UserStatistic';

const ProfileAbout = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="mt-10">
      <AboutForm user={user} />
      <div className="mt-5 mb-5 flex-grow border-t border-gray-400"></div>
      <UserWearing />
      <div className="mt-10 mb-5 flex-grow border-t border-gray-400"></div>
      <UserStatistic />
    </div>
  );
};

export default ProfileAbout;
