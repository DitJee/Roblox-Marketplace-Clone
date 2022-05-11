import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, FormEvent, useEffect, useState } from "react";
import {
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
    royaltyPercentage: Yup.number()
      .min(0, "The percentage must be more than 0%")
      .max(100, "The percentage must be less than 100%")
      .required("Royalty percentage is required"),
  });
};

const RoyaltiesStep = (props: {
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
  confirm: () => void;
}) => {
  // const file = props.attributes.image;
  const { publicKey, connected } = useWallet();
  const [creators, setCreators] = useState<Array<UserValue>>([]);
  const [fixedCreators, setFixedCreators] = useState<Array<UserValue>>([]);
  const [royalties, setRoyalties] = useState<Array<Royalty>>([]);
  const [totalRoyaltyShares, setTotalRoyaltiesShare] = useState<number>(0);
  const [showCreatorsModal, setShowCreatorsModal] = useState<boolean>(false);
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

  const initialValues: RoyaltiesInfo = {
    royaltyPercentage: 0,
    royaltySplit: [
      {
        creatorKey: shortenAddress(publicKey.toBase58()),
        splitPercentage: 0,
      },
    ],
  };

  const handleGoToReview = () => {};

  useEffect(() => {
    if (publicKey) {
      const key = publicKey.toBase58();
      setFixedCreators([
        {
          key,
          label: shortenAddress(key),
          value: key,
        },
      ]);
    }
  }, [connected, setCreators]);

  useEffect(() => {
    setRoyalties(
      [...fixedCreators, ...creators].map((creator) => ({
        creatorKey: creator.key,
        amount: Math.trunc(100 / [...fixedCreators, ...creators].length),
      }))
    );
  }, [creators, fixedCreators]);

  useEffect(() => {
    // When royalties changes, sum up all the amounts.
    const total = royalties.reduce((totalShares, royalty) => {
      return totalShares + royalty.amount;
    }, 0);

    setTotalRoyaltiesShare(total);
  }, [royalties]);

  return (
    <div className="flex flex-col bg-slate-200 p-5">
      <h1 className="">Set royalties and creator splits</h1>
      <h3 className="">
        Royalties ensure that you continue to get compensated for your work
        after its initial sale.
      </h3>
      <h3 className="">Royalty Percentage</h3>
      <h3 className="">Royalty Percentage</h3>
      <h4 className="">
        This is how much of each secondary sale will be paid out to the
        creators.
      </h4>
    </div>
  );
};

export default RoyaltiesStep;
