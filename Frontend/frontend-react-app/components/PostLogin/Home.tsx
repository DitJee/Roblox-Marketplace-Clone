import React, { useState } from 'react';
import Image from 'next/image';
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import PostLoginHeader from './PostLoginHeader';
import Footer from './Footer';
import TrackVisibility from 'react-on-screen';
import Profile from './Profile/Profile';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onClickSidebarToggle = (e) => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className=" flex flex-col h-screen justify-between">
      <TrackVisibility>
        <PostLoginHeader
          onClickSidebarToggle={onClickSidebarToggle}
          showSidebar={showSidebar}
          isVisible={undefined}
        />
      </TrackVisibility>

      <main className="max-w-8xl mx-auto  px-32 sm:px-16 main-container">
        <section className="pl-60">
          <Routes>
            <Route path="profile/*" element={<Profile />}></Route>
            <Route
              path=""
              element={<Dashboard showSidebar={showSidebar} />}
            ></Route>
          </Routes>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
