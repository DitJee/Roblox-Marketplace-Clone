// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type PORTs = {
  Node: string;
  React: string;
};

export type GameInfo = {
  thumbnail: string;
  name: string;
  likePercentage: number;
  viewCount: number;
  category: number;
};

export type CategoryInfo = {
  id: number;
  category: string;
};

export type UserLocalStorage = {
  accessToken: string;
  info: {
    about?: string;
    createdAt: string;
    email: string;
    id: number;
    password: string;
    picture: string;
    updatedAt: string;
    username: string;
    wearing_face: string;
    wearing_hair: string;
    wearing_left_arm: string;
    wearing_left_leg: string;
    wearing_right_arm: string;
    wearing_right_leg: string;
    wearing_top: string;
  };
};
