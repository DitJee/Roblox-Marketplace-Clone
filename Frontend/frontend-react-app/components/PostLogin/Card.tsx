import React from 'react';
import Image from 'next/image';
import { GameInfo } from '../../interfaces';
import { EyeIcon, HeartIcon } from '@heroicons/react/solid';

function Card({
  thumbnail,
  name,
  likePercentage,
  viewCount,
  category,
}: GameInfo) {
  return (
    <div>
      <div
        className="flex justify-center space-x-4  mt-5 rounded-xl cursor-pointer
        hover:bg-gray-200
        hover:scale-105
        transition transform duration-200
        ease-out
    "
      >
        <div className="relative  h-40 w-32">
          <Image
            className="rounded-lg"
            src={thumbnail}
            alt="https://picsum.photos/id/1/200/300"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>
      </div>
      <div className="grid  grid-cols-1 items-center">
        <h2 className="text-center ">{name}</h2>
        <div className="grid  grid-cols-4 items-center mr-8">
          <EyeIcon className="h-3"></EyeIcon>
          <h3>{(viewCount / 1000).toFixed(1)}k</h3>
          <HeartIcon className="ml-6 h-3"></HeartIcon>
          <h3 className="ml-6">{likePercentage}%</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
