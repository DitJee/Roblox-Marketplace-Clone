import React from 'react';
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

const Home = () => {
  return (
    <div>
      <PostLoginHeader />

      <main className="max-w-8xl mx-auto px-8 sm:px-16">
        <section className="pt-4">
          <Dashboard />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
