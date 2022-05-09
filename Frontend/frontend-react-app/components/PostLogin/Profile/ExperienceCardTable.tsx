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
    <div className="">
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
