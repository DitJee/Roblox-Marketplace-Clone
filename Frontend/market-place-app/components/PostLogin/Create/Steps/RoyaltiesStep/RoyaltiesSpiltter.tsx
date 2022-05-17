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
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/solid";

const successfulClassName: { bar: string; icon: string } = {
  bar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-teal-500 mr-4",
};
const unSuccessfulClassName: { bar: string; icon: string } = {
  bar: "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-red-500 mr-4",
};

const validationSchema = () => {
  return Yup.object().shape({
    royalties: Yup.array().of(
      Yup.object().shape({
        creatorWalletAddress: Yup.string().test(
          "len",
          "About section must be between 0 and 45 characters.",
          (val: any) =>
            val && val.toString().length >= 0 && val.toString().length <= 45
        ),
        splitPercentage: Yup.number()
          .min(0, "The percentage must be more than 0%")
          .max(100, "The percentage must be less than 100%")
          .required("Royalty split percentage is required"),
      })
    ),
  });
};

const RoyaltiesSpiltter = (props: {
  creators: Array<UserValue>;
  royalties: Array<Royalty>;
  setRoyalties: Function;
  isShowErrors?: boolean;
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
}) => {
  const { publicKey, connected } = useWallet();

  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues: {
    royalties: { creatorWalletAddress: string; splitPercentage: number }[];
  } = {
    royalties: [
      {
        creatorWalletAddress: shortenAddress(publicKey.toBase58()),
        splitPercentage: 100,
      },
    ],
  };

  const onRoyaltyPercentageChange = (e) => {
    let _percentage: number = 0;

    if (e.target.value >= 100) {
      _percentage = 100;
    } else if (e.target.value <= 0) {
      _percentage = 0;
    } else {
      _percentage = e.target.value;
    }

    props.setAttributes({
      ...props.attributes,
      seller_fee_basis_points: _percentage * 100,
    });
  };

  return (
    <div className="mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="royalties">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block  text-2xl font-semibold text-gray-900 ">
                    {"Royalty Percentage"}
                  </label>
                  <h4 className="">
                    This is how much of each secondary sale will be paid out to
                    the creators.
                  </h4>
                  <input
                    className="inputRow"
                    type={"number"}
                    placeholder={"100"}
                    onChange={onRoyaltyPercentageChange}
                    required
                  />
                  <div className="flex items-center justify-start mb-5 ">
                    <button
                      type="button"
                      className="secondary"
                      onClick={() =>
                        push({ creatorWalletAddress: "", splitPercentage: "" })
                      }
                    >
                      <PlusCircleIcon className="h-8" />
                    </button>
                    <label className="ml-3 font-semibold">Add Creator</label>
                  </div>

                  {values.royalties.length > 0 &&
                    values.royalties.map((friend, index) => (
                      <div
                        className="flex items-center justify-between"
                        key={index}
                      >
                        <div className="flex">
                          <label
                            htmlFor={`royalties.${index}.creatorWalletAddress`}
                            className="font-semibold"
                          >
                            Wallet Address
                          </label>
                          <Field
                            name={`royalties.${index}.creatorWalletAddress`}
                            type="text"
                            className="inputRow"
                          />
                          <ErrorMessage
                            name={`royalties.${index}.creatorWalletAddress`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="flex">
                          <label
                            htmlFor={`royalties.${index}.splitPercentage`}
                            className="font-semibold"
                          >
                            Split Percentage
                          </label>
                          <Field
                            name={`royalties.${index}.splitPercentage`}
                            type="number"
                            className="inputRow"
                          />
                          <ErrorMessage
                            name={`royalties.${index}.splitPercentage`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="mb-2">
                          <button
                            type="button"
                            onClick={() => {
                              console.log("index => ", index);
                              remove(index);
                            }}
                          >
                            <MinusCircleIcon className="h-8" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
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
        )}
      </Formik>
      {props.isShowErrors && (
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

export default RoyaltiesSpiltter;
