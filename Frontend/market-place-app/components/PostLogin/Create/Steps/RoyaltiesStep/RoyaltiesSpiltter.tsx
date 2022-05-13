import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  Creator,
  IMetadataExtension,
  RoyaltiesInfo,
  Royalty,
  UserValue,
} from "../../../../../interfaces";
import { shortenAddress } from "../../../../../utils/string";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = () => {
  return Yup.object().shape({
    royaltySplitPercentage: Yup.number()
      .min(0, "The percentage must be more than 0%")
      .max(100, "The percentage must be less than 100%")
      .required("Royalty split percentage is required"),
  });
};

const RoyaltiesSpiltter = (props: {
  creators: Array<UserValue>;
  royalties: Array<Royalty>;
  setRoyalties: Function;
  isShowErrors?: boolean;
  publicKey;
}) => {
  const initialValues: {
    royaltyPercentage: { creatorKey: string; splitPercentage: number }[];
  } = {
    royaltyPercentage: [
      {
        creatorKey: shortenAddress(props.publicKey.toBase58()),
        splitPercentage: 0,
      },
    ],
  };

  return (
    <div>
      <h1>RoyaltiesSpiltter</h1>
    </div>
  );
};

export default RoyaltiesSpiltter;
