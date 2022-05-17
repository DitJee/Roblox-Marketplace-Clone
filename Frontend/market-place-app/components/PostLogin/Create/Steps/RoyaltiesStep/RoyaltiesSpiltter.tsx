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
        royaltySplitPercentage: Yup.number()
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
        splitPercentage: 0,
      },
    ],
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="royalties">
              {({ insert, remove, push }) => (
                <div>
                  {values.royalties.length > 0 &&
                    values.royalties.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label
                            htmlFor={`royalties.${index}.creatorWalletAddress`}
                          >
                            Wallet Address
                          </label>
                          <Field
                            name={`royalties.${index}.creatorWalletAddress`}
                            placeholder="Jane Doe"
                            type="text"
                          />
                          <ErrorMessage
                            name={`royalties.${index}.creatorWalletAddress`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`royalties.${index}.email`}>
                            Email
                          </label>
                          <Field
                            name={`royalties.${index}.email`}
                            placeholder="jane@acme.com"
                            type="email"
                          />
                          <ErrorMessage
                            name={`royalties.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ name: "", email: "" })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoyaltiesSpiltter;
