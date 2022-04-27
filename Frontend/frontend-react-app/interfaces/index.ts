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
