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
}) => {
  const { publicKey, connected } = useWallet();

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
                  <div className="flex items-center justify-start mb-5 ">
                    <button
                      type="button"
                      className=""
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
          </Form>
        )}
      </Formik>
      <button type="submit">asdd</button>
    </div>
  );
};

export default RoyaltiesSpiltter;
