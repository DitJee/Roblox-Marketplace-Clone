import { Row } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import React, { FC, useEffect, useState } from "react";
import { IMetadataExtension, MetadataCategory } from "../../../../interfaces";

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
    </div>
  );
};

export default UploadStep;
