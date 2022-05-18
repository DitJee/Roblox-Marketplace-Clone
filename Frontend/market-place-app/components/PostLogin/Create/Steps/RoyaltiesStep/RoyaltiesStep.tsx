import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  Creator,
  IMetadataExtension,
  RoyaltiesInfo,
  Royalty,
  UserValue,
} from "../../../../../interfaces";
import { shortenAddress } from "../../../../../utils/string";
import RoyaltiesSpiltter from "./RoyaltiesSpiltter";

const RoyaltiesStep = (props: {
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
  confirm: () => void;
}) => {
  // const file = props.attributes.image;
  const { publicKey, connected } = useWallet();
  const creators = useRef<Array<UserValue>>([]);
  const fixedCreators = useRef<Array<UserValue>>([]);
  const royalties = useRef<Array<Royalty>>([]);
  const totalRoyaltyShares = useRef<number>(0);
  const [showCreatorsModal, setShowCreatorsModal] = useState<boolean>(false);
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);
  const [errorTotalPercentage, setErrorTotalPercentage] = useState<number>(0);

  const updateTotalRoyaltyShares = () => {
    // When royalties changes, sum up all the amounts.
    const total = royalties.current.reduce((totalShares, royalty) => {
      return totalShares + royalty.amount;
    }, 0);

    console.log("-------------- total -------------- ", total);

    setErrorTotalPercentage(total);

    totalRoyaltyShares.current = total;
    console.log("totalRoyaltyShares => ", totalRoyaltyShares.current);
  };

  const handleGoToReview = (formValue) => {
    console.log("royalties => ", royalties);

    updateTotalRoyaltyShares();

    // Find all royalties that are invalid (0)
    const zeroedRoyalties = royalties.current.filter(
      (royalty) => royalty.amount === 0
    );

    if (zeroedRoyalties.length !== 0 || totalRoyaltyShares.current !== 100) {
      // Contains a share that is 0 or total shares does not equal 100, show errors.
      setIsShowErrors(true);
      console.warn(
        "Contains a share that is 0 or total shares does not equal 100, show errors."
      );
      return;
    }

    console.log("[...fixedCreators, ...creators]", [
      ...fixedCreators.current,
      ...creators.current,
    ]);
    const creatorStructs: Creator[] = [
      ...fixedCreators.current,
      ...creators.current,
    ].map(
      (c) =>
        new Creator({
          address: c.value,
          verified: c.value === publicKey?.toBase58(),
          share: royalties.current.find((r) => r.creatorKey === c.value)
            ?.amount,
        })
    );

    console.log("creatorStructs => ", creatorStructs);

    const share = creatorStructs.reduce((acc, el) => (acc += el.share), 0);
    if (share > 100 && creatorStructs.length) {
      creatorStructs[0].share -= share - 100;
    }
    props.setAttributes({
      ...props.attributes,
      creators: creatorStructs,
    });

    console.log("updated attributes => ", props.attributes);
    props.confirm();
  };

  useEffect(() => {
    if (publicKey) {
      const key = publicKey.toBase58();
      fixedCreators.current = [
        {
          key,
          label: shortenAddress(key),
          value: key,
        },
      ];
    }
  }, [connected, publicKey]);

  useEffect(() => {}, [royalties.current]);

  return (
    <div className="  bg-white  shadow-md sm:p-6 lg:p-8 dark:bg-gray-200 ">
      <h1 className="text-2xl font-bold leading-normal text-black">
        Set royalties and creator splits
      </h1>
      <h3 className="text-1xl font-normal leading-normal mt-0 mb-6 text-gray-700">
        Royalties ensure that you continue to get compensated for your work
        after its initial sale.
      </h3>

      <div className="form-group">
        {/* 
          Royalties Form
        */}
        {[...fixedCreators.current, ...creators.current].length > 0 && (
          <div>
            <label className="action-field" style={{ width: "100%" }}>
              <h1 className="text-2xl font-bold leading-normal text-black">
                Creators Split
              </h1>
              <p>
                This is how much of the proceeds from the initial sale and any
                royalties will be split out amongst the creators.
              </p>
              <RoyaltiesSpiltter
                fixedCreators={fixedCreators.current}
                creators={creators.current}
                royalties={royalties}
                isShowErrors={isShowErrors}
                attributes={props.attributes}
                setAttributes={props.setAttributes}
                handleGoToReview={handleGoToReview}
                errorTotalPercentage={errorTotalPercentage}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoyaltiesStep;
