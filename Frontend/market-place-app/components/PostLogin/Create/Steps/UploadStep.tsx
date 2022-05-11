import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  IMetadataExtension,
  MetadataCategory,
  MetadataFile,
} from "../../../../interfaces";
import { UploadIcon } from "@heroicons/react/solid";
import { getLast } from "../../../../utils/string";
import * as Yup from "yup";
import Error from "next/error";
import { Row, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";

const { Dragger } = Upload;

const validationSchema = () => {
  return Yup.object().shape({
    url: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please enter a vaild url!"
      )
      .required("Please enter absolute url"),
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

const UploadStep: FC = (props: {
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  confirm: () => void;
}) => {
  const [coverFile, setCoverFile] = useState<File | undefined>(
    props.files?.[0]
  );
  const [mainFile, setMainFile] = useState<File | undefined>(props.files?.[1]);

  const [customURL, setCustomURL] = useState<string>("");
  const [customURLErr, setCustomURLErr] = useState<string>("");
  const disableContinue = !coverFile || !!customURLErr;

  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    props.setAttributes({
      ...props.attributes,
      properties: {
        ...props.attributes.properties,
        files: [],
      },
    });
  }, []);

  const uploadMsg = (category: MetadataCategory) => {
    switch (category) {
      case MetadataCategory.Audio:
        return "Upload your audio creation (MP3, FLAC, WAV)";
      case MetadataCategory.Image:
        return "Upload your image creation (PNG, JPG, GIF)";
      case MetadataCategory.Video:
        return "Upload your video creation (MP4, MOV, GLB)";
      case MetadataCategory.VR:
        return "Upload your AR/VR creation (GLB)";
      case MetadataCategory.HTML:
        return "Upload your HTML File (HTML)";
      default:
        return "Please go back and choose a category";
    }
  };

  const acceptableFiles = (category: MetadataCategory) => {
    switch (category) {
      case MetadataCategory.Audio:
        return ".mp3,.flac,.wav";
      case MetadataCategory.Image:
        return ".png,.jpg,.gif";
      case MetadataCategory.Video:
        return ".mp4,.mov,.webm";
      case MetadataCategory.VR:
        return ".glb";
      case MetadataCategory.HTML:
        return ".html";
      default:
        return "";
    }
  };

  const initialValues: { url: string } = {
    url: "",
  };

  const handleOnChange = (event) => {
    setCustomURL(event.target.defaultValue);
  };

  const handleContinueToMint = () => {
    setMessage("");
    setbSuccessful(false);

    // TODO: mint from custom url
    try {
      props.setAttributes({
        ...props.attributes,
        properties: {
          ...props.attributes.properties,
          files: [coverFile, mainFile, customURL]
            .filter((f) => f)
            .map((f) => {
              const uri = typeof f === "string" ? f : f?.name || "";
              const type =
                typeof f === "string" || !f
                  ? "unknown"
                  : f.type || getLast(f.name.split(".")) || "unknown";

              return {
                uri,
                type,
              } as MetadataFile;
            }),
        },
        image: coverFile?.name || "",
        animation_url:
          props.attributes.properties?.category !== MetadataCategory.Image &&
          customURL
            ? customURL
            : mainFile && mainFile.name,
      });
      props.setFiles([coverFile, mainFile].filter((f) => f) as File[]);
      props.confirm();
    } catch (error) {
      console.error(error);

      setMessage(error.message);
      setbSuccessful(false);
    }
  };

  return (
    <div className="flex flex-col item-center mt-4 px-2">
      <div className="text-start ">
        <h2 className="text-3xl mb-5">Now, let's upload your creation</h2>
        <p style={{ fontSize: "1.2rem" }}>
          Your file will be uploaded to the decentralized web via Arweave.
          Depending on file type, can take up to 1 minute. Arweave is a new type
          of storage that backs data with sustainable and perpetual endowments,
          allowing users and developers to truly store data forever – for the
          very first time.
        </p>
      </div>
      <div className="mt-5 border rounded-2xl p-6 bg-purple-500">
        <h3>Upload a cover image (PNG, JPG, GIF, SVG)</h3>
        <Dragger
          accept=".png,.jpg,.gif,.mp4,.svg"
          style={{ padding: 20 }}
          multiple={false}
          customRequest={(info) => {
            // dont upload files here, handled outside of the control
            info?.onSuccess?.({}, null as any);
          }}
          fileList={coverFile ? [coverFile as any] : []}
          onChange={async (info) => {
            const file = info.file.originFileObj;
            if (file) setCoverFile(file);
          }}
        >
          <div className="ant-upload-drag-icon">
            <h3 style={{ fontWeight: 700 }}>
              Upload your cover image (PNG, JPG, GIF, SVG)
            </h3>
          </div>
          <p className="ant-upload-text">Drag and drop, or click to browse</p>
        </Dragger>
      </div>
      {props.attributes.properties?.category !== MetadataCategory.Image && (
        <Row
          className="mt-5 border rounded-2xl p-6 bg-purple-500"
          style={{ marginBottom: 5, marginTop: 30 }}
        >
          <h3>{uploadMsg(props.attributes.properties?.category)}</h3>
          <Dragger
            accept={acceptableFiles(props.attributes.properties?.category)}
            style={{ padding: 20, background: "rgba(255, 255, 255, 0.08)" }}
            multiple={false}
            customRequest={(info) => {
              // dont upload files here, handled outside of the control
              info?.onSuccess?.({}, null as any);
            }}
            fileList={mainFile ? [mainFile as any] : []}
            onChange={(info) => {
              const file = info.file.originFileObj;

              // Reset image URL
              setCustomURL("");
              setCustomURLErr("");

              if (file) setMainFile(file);
            }}
            onRemove={() => {
              setMainFile(undefined);
            }}
          >
            <div className="ant-upload-drag-icon">
              <h3 style={{ fontWeight: 700 }}>Upload your creation</h3>
            </div>
            <p className="ant-upload-text">Drag and drop, or click to browse</p>
          </Dragger>
        </Row>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleContinueToMint}
      >
        <Form onChange={handleOnChange}>
          <div className="form-group">
            <label
              htmlFor="url"
              className="block mb-2 text-2xl font-medium text-gray-900 "
            >
              OR use absolute URL to content
            </label>
            <Field
              name="url"
              type="text"
              className="bg-purple-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 mb-4 form-control"
              placeholder={"Please enter a valid absolute URL"}
            />
            <ErrorMessage
              name="url"
              component="div"
              className="mt-5 mb-5 flex items-center border dark:border-red-800   text-black text-sm font-bold px-4 py-3 "
            />
          </div>
          <div className="form-group flex justify-center">
            <button
              type="button"
              className="text-gray-900 bg-purple-500 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
              disabled={bSuccessful}
              onClick={handleContinueToMint}
            >
              <div className="flex items-center space-x-2">
                <span>Continue to Mint</span>
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
  );
};

export default UploadStep;
