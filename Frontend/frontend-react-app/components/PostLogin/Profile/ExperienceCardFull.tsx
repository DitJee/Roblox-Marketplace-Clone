import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
type ExperienceCardFullInfo = {
  thumbnail: string;
  name: string;
  description: string;
  active: number;
  visit: number;
  like: number;
};

const ExperienceCardFull = ({
  thumbnail,
  name,
  description,
  active,
  visit,
  like,
}: ExperienceCardFullInfo) => {
  return (
    <div className="mb-5">
      <div className="grid grid-cols-2 bg-gray-100 ">
        <div className="flex items-center justify-center bg-gray-200 ">
          <Link className="m-5 relative h-40 w-40 cursor-pointer" to={''}>
            <Image
              className="rounded-lg"
              src={thumbnail}
              alt="https://picsum.photos/id/1/200/200"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </Link>
        </div>

        <div className="flex flex-col items-start p-5">
          <div className="flex-grow border-b border-gray-800 ">
            <h1 className="text-3xl font-bold ">{name + `'s Place`}</h1>
          </div>
          <div className=" relative flex py-2 items-center">{description}</div>

          <h1 className="grid grid-cols-2  justify-between ">
            {[
              {
                name: 'Active',
                count: active,
              },
              {
                name: 'Visits',
                count: visit,
              },
            ].map((context, index) => {
              return (
                <div className="flex flex-col items-center mt-6 mx-10 ">
                  <h1 className="text-1xl font-bold ">{context.name}</h1>
                  <h1 className="text-1xl font-bold ">{context.count}</h1>
                </div>
              );
            })}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardFull;
