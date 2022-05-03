import React, { useState } from 'react';
import Image from 'next/image';
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import PostLoginHeader from './PostLoginHeader';
import Footer from './Footer';
import TrackVisibility from 'react-on-screen';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onClickSidebarToggle = (e) => {
    setShowSidebar(!showSidebar);
    console.log('toggle ', showSidebar);
  };

  return (
    <div className=" flex flex-col h-screen justify-between">
      <TrackVisibility>
        <PostLoginHeader
          onClickSidebarToggle={onClickSidebarToggle}
          showSidebar={showSidebar}
        />
      </TrackVisibility>

      <main className="max-w-8xl mx-auto  px-32 sm:px-16">
        <section className="pl-40">
          <Dashboard showSidebar={showSidebar} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

// className="
//                       sm:pl-40
//                       md:pl-40
//                       lg:pl-40
//                       xl:pl-40
//                       2xl:pl-40
//                     "

export default Home;