import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserLocalStorage } from '../../../interfaces';
import ProfileCardWithInfo from './ProfileCardWithInfo';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProfileAbout from './About';
import ProfileCreation from './Creation';
import AboutCreationSelectionBar from './About_CreationBar';

const Profile = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();

  const [bIsInAbout, setbIsInAbout] = useState(true);

  useEffect(() => {
    switch (location.pathname) {
      case '/home/profile':
        setbIsInAbout(true);
        break;
      case '/home/profile/creation':
        setbIsInAbout(false);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className="mt-10">
      <ProfileCardWithInfo user={user} />
      <AboutCreationSelectionBar bIsInAbout={bIsInAbout} />
      <Routes>
        <Route path="creation/*" element={<ProfileCreation />}></Route>
        <Route path="/" element={<ProfileAbout />}></Route>
      </Routes>
    </div>
  );
};

export default Profile;
