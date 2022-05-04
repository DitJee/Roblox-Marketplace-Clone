import React from 'react';
import Image from 'next/image';
import { UserLocalStorage } from '../../../interfaces';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AboutForm from './AboutForm';

const ProfileAbout = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="mt-10">
      <AboutForm user={user} />
    </div>
  );
};

export default ProfileAbout;
