// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { PublicKey } from "@solana/web3.js";

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

export type UserInfo = {
  about?: string;
  createdAt?: string;
  email?: string;
  id?: number;
  password?: string;
  picture?: string;
  updatedAt?: string;
  username?: string;
  wearing_face?: string;
  wearing_hair?: string;
  wearing_left_arm?: string;
  wearing_left_leg?: string;
  wearing_right_arm?: string;
  wearing_right_leg?: string;
  wearing_top?: string;
};

export type ExperienceCardFullInfo = {
  thumbnail: string;
  name: string;
  description: string;
  active: number;
  visit: number;
  like: number;
};

export type CreationInfo = {
  thumbnail: string;
  name: string;
  description: string;
  active: number;
  visit: number;
  like: number;
  ownerId: number;
};

export type CreationPayload = {
  user: {
    id: number;
  };
  creations: CreationInfo[];
};

export type MetaData = {
  name: string;
  description: string;
  image: string;
};

export enum MetadataCategory {
  Audio = "audio",
  Video = "video",
  Image = "image",
  VR = "vr",
  HTML = "html",
}
export type StringPublicKey = string;

export class Creator {
  address: StringPublicKey;
  verified: boolean;
  share: number;

  constructor(args: {
    address: StringPublicKey;
    verified: boolean;
    share: number;
  }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

export type Attribute = {
  trait_type?: string;
  display_type?: string;
  value: string | number;
};

export type MetadataFile = {
  uri: string;
  type: string;
};

export type FileOrString = MetadataFile | string;

export interface IMetadataExtension {
  name: string;
  symbol: string;

  creators: Creator[] | null;
  description: string;
  // preview image absolute URI
  image: string;
  animation_url?: string;

  attributes?: Attribute[];

  // stores link to item on meta
  external_url: string;

  seller_fee_basis_points: number;

  properties: {
    files?: FileOrString[];
    category: MetadataCategory;
    maxSupply?: number;
    creators?: {
      address: string;
      shares: number;
    }[];
  };
}

export interface UserValue {
  key: string;
  label: string;
  value: string;
}

export type NFTInfo = {
  title: string;
  symbol: string;
  description: string;
  maxSupply: number;
};

export interface Royalty {
  creatorKey: string;
  amount: number;
}

export type RoyaltiesSplitInfo = {
  creatorKey: string;
  splitPercentage: number;
};

export type RoyaltiesInfo = {
  royaltyPercentage: number;
  royaltySplit: RoyaltiesSplitInfo[];
};

export type StoreInfo = {
  storeId: string;
  txId: string;
};

export type SetWhitelistedCreatorParams = {
  admin: PublicKey;
  whitelistedCreatorPDA: PublicKey;
  creator: PublicKey;
  activated: boolean;
};

export declare type ParamsWithStore<P> = P & {
  store: PublicKey;
};
