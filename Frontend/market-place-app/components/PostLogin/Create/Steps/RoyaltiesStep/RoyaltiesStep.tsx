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
import RoyaltiesSpiltter from "./RoyaltiesSpiltter";

const validationSchema = () => {
  return Yup.object().shape({
    royaltyPercentage: Yup.number()
      .min(0, "The percentage must be more than 0%")
      .max(100, "The percentage must be less than 100%")
      .required("Royalty percentage is required"),
  });
};

const successfulClassName: { bar: string; icon: string } = {
  bar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-teal-500 mr-4",
};
const unSuccessfulClassName: { bar: string; icon: string } = {
  bar: "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-red-500 mr-4",
};

const RoyaltiesStep = (props: {
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
  confirm: () => void;
}) => {
  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // const file = props.attributes.image;
  const { publicKey, connected } = useWallet();
  const [creators, setCreators] = useState<Array<UserValue>>([]);
  const [fixedCreators, setFixedCreators] = useState<Array<UserValue>>([]);
  const [royalties, setRoyalties] = useState<Array<Royalty>>([]);
  const [totalRoyaltyShares, setTotalRoyaltiesShare] = useState<number>(0);
  const [showCreatorsModal, setShowCreatorsModal] = useState<boolean>(false);
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

  // TODO: add royalty split
  const initialValues: { royaltyPercentage: number } = {
    royaltyPercentage: 0,
  };

  const handleGoToReview = (formValue: { royaltyPercentage: number }) => {
    // get royaltyPercentage and royaltySplit
    const { royaltyPercentage } = formValue;

    // assign new seller_fee_basis_points
    props.setAttributes({
      ...props.attributes,
      seller_fee_basis_points: royaltyPercentage * 100,
    });

    // Find all royalties that are invalid (0)
    const zeroedRoyalties = royalties.filter((royalty) => royalty.amount === 0);

    if (zeroedRoyalties.length !== 0 || totalRoyaltyShares !== 100) {
      // Contains a share that is 0 or total shares does not equal 100, show errors.
      setIsShowErrors(true);
      console.warn(
        "Contains a share that is 0 or total shares does not equal 100, show errors."
      );
      return;
    }

    const creatorStructs: Creator[] = [...fixedCreators, ...creators].map(
      (c) =>
        new Creator({
          address: c.value,
          verified: c.value === publicKey?.toBase58(),
          share:
            royalties.find((r) => r.creatorKey === c.value)?.amount ||
            Math.round(100 / royalties.length),
        })
    );

    const share = creatorStructs.reduce((acc, el) => (acc += el.share), 0);
    if (share > 100 && creatorStructs.length) {
      creatorStructs[0].share -= share - 100;
    }
    props.setAttributes({
      ...props.attributes,
      creators: creatorStructs,
    });

    console.log("updated attributes => ", props.attributes);
    //props.confirm();
  };

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
    <div className="  bg-white  shadow-md sm:p-6 lg:p-8 dark:bg-gray-200 ">
      <h1 className="text-2xl font-bold leading-normal text-black">
        Set royalties and creator splits
      </h1>
      <h3 className="text-1xl font-normal leading-normal mt-0 mb-6 text-gray-700">
        Royalties ensure that you continue to get compensated for your work
        after its initial sale.
      </h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleGoToReview}
      >
        <Form>
          {[
            {
              context: "Royalty Percentage",
              name: "royaltyPercentage",
              type: "text",
              placeholder: "Between 0 and 100",
            },
          ].map((element, index) => {
            return (
              <div key={element.context} className="form-group">
                <label
                  htmlFor={element.name}
                  className="block  text-2xl font-semibold text-gray-900 "
                >
                  {element.context}
                </label>
                <h4 className="">
                  This is how much of each secondary sale will be paid out to
                  the creators.
                </h4>
                <Field
                  name={element.name}
                  type={element.type}
                  placeholder={element.placeholder}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white mb-4 form-control"
                />
                <ErrorMessage
                  name={element.name}
                  component="div"
                  className="mt-5 mb-5 flex items-center border dark:border-red-800 bg-gray-700  text-white text-sm font-bold px-4 py-3"
                />
                {/* 
                  RoyaltiesSpiltter 
                */}
                {[...fixedCreators, ...creators].length > 0 && (
                  <div>
                    <label className="action-field" style={{ width: "100%" }}>
                      <h1 className="text-2xl font-bold leading-normal text-black">
                        Creators Split
                      </h1>
                      <p>
                        This is how much of the proceeds from the initial sale
                        and any royalties will be split out amongst the
                        creators.
                      </p>
                      <RoyaltiesSpiltter
                        creators={[...fixedCreators, ...creators]}
                        royalties={royalties}
                        setRoyalties={setRoyalties}
                        isShowErrors={isShowErrors}
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}

          <div className="form-group flex justify-center">
            <button
              type="submit"
              className="text-purple-800 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
              disabled={bSuccessful}
            >
              <div className="flex items-center space-x-2">
                <span>Continue to Royalties</span>
                {bSuccessful && (
                  <div
                    className="flex spinner-border animate-spin  w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span className="visually-hidden"></span>
                  </div>
                )}
              </div>
            </button>
          </div>
          {message && (
            <div
              className={
                bSuccessful
                  ? successfulClassName.bar
                  : unSuccessfulClassName.bar
              }
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className={
                      bSuccessful
                        ? successfulClassName.icon
                        : unSuccessfulClassName.icon
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-normal">{}</div>
                  <div className="text-sm py-1 items-center">{message}</div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </Formik>
      {isShowErrors && (
        <div className={unSuccessfulClassName.bar} role="alert">
          <div className="flex">
            <div className="py-1">
              <svg
                className={
                  bSuccessful
                    ? successfulClassName.icon
                    : unSuccessfulClassName.icon
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <div className="font-normal">{}</div>
              <div className="text-sm py-1 items-center">
                The split percentage for this creator cannot be 0%.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyaltiesStep;
