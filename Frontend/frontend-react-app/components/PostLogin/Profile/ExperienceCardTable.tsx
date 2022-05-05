import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import { ExperienceCardFullInfo } from '../../../interfaces';
import Card from '../Card';

const ExperienceCardTable = ({
  thumbnail,
  name,
  description,
  active,
  visit,
  like,
}: ExperienceCardFullInfo) => {
  return (
    <div
      className="grid grid-cols-4 gap-12
                    sm:grid-cols-5 
                    lg:grid-cols-6
                    xl:grid-cols-8 
                    "
    >
      <Card
        thumbnail={thumbnail}
        name={name}
        likePercentage={like}
        viewCount={visit}
        category={null}
      />
    </div>
  );
};

export default ExperienceCardTable;
