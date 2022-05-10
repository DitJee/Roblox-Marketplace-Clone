import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserInfo, UserLocalStorage } from '../../../interfaces';
import ExperienceToggle from './ExperienceToggle';
import { Route, Routes, useLocation } from 'react-router-dom';
import Experience_FullView from './Experience_FullView';
import Experience_TableView from './Experience_TableView';
import CreationService from '../../../Services/creation.service';
import { CreationInfo } from '../../../interfaces/index';

const ProfileCreation = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userInfo: UserInfo = user.info;

  const [bIsFullView, setbIsFullView] = useState(true);

  const location = useLocation();

  const [creationInfo, setCreationInfo] = useState([]);

  const getCreationInfo = async (): Promise<void> => {
    try {
      const { result } = await CreationService.getCreationByUserId(userInfo.id);
      setCreationInfo(result);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    console.log();
    switch (location.pathname) {
      case '/home/profile/creation':
        setbIsFullView(true);
        break;
      case '/home/profile/creation/tableview':
        setbIsFullView(false);
        break;
      default:
        break;
    }

    // TODO: Creation APIs call
    getCreationInfo();
  }, [location]);

  // TODO: fetch user's creations and add to some array

  // TODO: use the array of infos to with .map method to generate the cards

  return (
    <div className="mt-10">
      <ExperienceToggle bIsFullView={bIsFullView} />
      <section className="">
        <Routes>
          <Route
            path=""
            element={<Experience_FullView creationInfo={creationInfo} />}
          ></Route>
          <Route
            path="tableview"
            element={<Experience_TableView creationInfo={creationInfo} />}
          ></Route>
        </Routes>
      </section>
    </div>
  );
};

export default ProfileCreation;
