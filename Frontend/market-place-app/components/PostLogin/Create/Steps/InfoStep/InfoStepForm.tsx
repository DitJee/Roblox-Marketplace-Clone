import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NFTInfo } from "../../../../../interfaces";

//TODO: add NFT's attributes

const validationSchema = () => {
  return Yup.object().shape({
    title: Yup.string()
      .test(
        "len",
        "The title must be between 1 and 50 characters",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 50
      )
      .required("The title is required!"),
    symbol: Yup.string()
      .test(
        "len",
        "The symbol must be between 1 and 10 characters",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 10
      )
      .required("The symbol is required!"),
    description: Yup.string()
      .test(
        "len",
        "The description must be between 1 and 500 characters",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 500
      )
      .required("The description is required!"),
    maxSupply: Yup.number()
      .min(1, "The supply must be more than 1")
      .required("Maximum supply is required"),
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

const InfoStepForm = ({ attributes, setAttributes, confirm }) => {
  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues: NFTInfo = {
    title: "flowa",
    symbol: "flowaflowa",
    description: "flowaflowaflowa",
    maxSupply: 1,
  };

  const handleGotoRoyalties = (formValue: NFTInfo) => {
    console.log("formValue", formValue);
    const { title, symbol, description, maxSupply } = formValue;

    setMessage("");
    setbSuccessful(false);

    try {
      setAttributes({
        ...attributes,
        name: title,
        symbol: symbol,
        description: description,
        properties: {
          ...attributes.properties,
          maxSupply: maxSupply,
        },
      });

      confirm();
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setbSuccessful(false);
    }
  };

  return (
    <div className="">
      <div className="top-10 p-4 max-w-sm bg-white  shadow-md sm:p-6 lg:p-8 dark:bg-gray-700 dark:border-gray-700">
        <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white">
          Describe your item
        </h1>
        <h4 className="text-1xl font-normal leading-normal mt-0 mb-2 text-white">
          Provide detailed description of your creative process to engage with
          your audience.
        </h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleGotoRoyalties}
        >
          <Form>
            {[
              {
                context: "Title",
                name: "title",
                type: "text",
                placeholder: "Title for NFT",
              },
              {
                context: "Symbol",
                name: "symbol",
                type: "text",
                placeholder: "Symbol for NFT",
              },
              {
                context: "Description",
                name: "description",
                type: "text",
                placeholder: "Description for NFT",
              },
              {
                context: "Maximum Supply",
                name: "maxSupply",
                type: "number",
                placeholder: "Maximum supply for NFT",
              },
            ].map((element) => (
              <div key={element.context} className="form-group">
                <label
                  htmlFor={element.name}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {element.context}
                </label>
                <Field
                  name={element.name}
                  type={element.type}
                  placeholder={element.placeholder}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-4 form-control"
                />
                <ErrorMessage
                  name={element.name}
                  component="div"
                  className="mt-5 mb-5 flex items-center border dark:border-red-800 bg-gray-700  text-white text-sm font-bold px-4 py-3"
                />
              </div>
            ))}
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
                    <div className="font-bold">{}</div>
                    <div className="text-sm py-1 items-center">{message}</div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default InfoStepForm;
