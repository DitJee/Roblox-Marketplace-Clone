import React from 'react';
import Image from 'next/image';
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Header from './Header';
import SignupForm from './SignupForm';

const Register = () => {
  return (
    <div>
      <Header />
      <SignupForm />

      <main className="max-w-4xl mx-auto px-8 sm:px-16">
        <section className="pt-4"></section>
      </main>
    </div>
  );
};

export default Register;
