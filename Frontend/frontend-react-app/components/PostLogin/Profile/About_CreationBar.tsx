import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import { BookOpenIcon, BeakerIcon } from '@heroicons/react/solid';

const AboutCreationSelectionBar = ({ bIsInAbout }) => {
  return (
    <div className="mt-8 grid grid-cols-2 items-center justify-center bg-gray-100">
      <Link className="flex justify-center items-center py-4" to={''}>
        <BookOpenIcon className="mr-2 h-5 text-gray-700"></BookOpenIcon>
        <h5 className=" font-bold text-gray-600">About</h5>
      </Link>
      <Link className="flex justify-center items-center" to={'creation'}>
        <BeakerIcon className="mr-2 h-5 text-gray-700"></BeakerIcon>
        <h5 className=" font-bold text-gray-600">Creation</h5>
      </Link>
      {bIsInAbout ? (
        <>
          <div className="flex-grow border-t border-gray-400"></div>
          <div></div>
        </>
      ) : (
        <>
          <div></div>
          <div className="flex-grow border-t border-gray-400"></div>
        </>
      )}
    </div>
  );
};

export default AboutCreationSelectionBar;
