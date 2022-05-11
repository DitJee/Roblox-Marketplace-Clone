import React, { FC, useEffect, useState } from "react";
// import useArtworkFiles from "../../../../../Hooks/Create/useArtworkFiles";
import {
  IMetadataExtension,
  Royalty,
  UserValue,
} from "../../../../../interfaces";
// import { ArtCard } from "../../../ArtCard";
import ArtCard from "../../../../View/ArtCard";
import InfoStepForm from "./InfoStepForm";

const useArtworkFiles = (files: File[], attributes: IMetadataExtension) => {
  const [data, setData] = useState<{ image: string; animation_url: string }>({
    image: "",
    animation_url: "",
  });

  useEffect(() => {
    if (attributes.image) {
      const file = files.find((f) => f.name === attributes.image);
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          setData((data: any) => {
            return {
              ...(data || {}),
              image: (event.target?.result as string) || "",
            };
          });
        };
        if (file) reader.readAsDataURL(file);
      }
    }

    if (attributes.animation_url) {
      const file = files.find((f) => f.name === attributes.animation_url);
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          setData((data: any) => {
            return {
              ...(data || {}),
              animation_url: (event.target?.result as string) || "",
            };
          });
        };
        if (file) reader.readAsDataURL(file);
      }
    }
  }, [files, attributes]);

  return data;
};

const InfoStep: FC = (props: {
  attributes: IMetadataExtension;
  files: File[];
  setAttributes: (attr: IMetadataExtension) => void;
  confirm: () => void;
}) => {
  const [creators, setCreators] = useState<Array<UserValue>>([]);
  const [royalties, setRoyalties] = useState<Array<Royalty>>([]);
  const { image, animation_url } = useArtworkFiles(
    props.files,
    props.attributes
  );

  const onLeftButtonClicked = () => console.log("onLeftButtonClicked");
  const onRightButtonClicked = () => console.log("onRightButtonClicked");

  useEffect(() => {
    setRoyalties(
      creators.map((creator) => ({
        creatorKey: creator.key,
        amount: Math.trunc(100 / creators.length),
      }))
    );
  }, [creators]);

  return (
    <div className="grid grid-cols-2 p-5 rounded-xl">
      <ArtCard
        uri={image}
        onLeftButtonClicked={undefined}
        onRightButtonClicked={undefined}
      />
      <InfoStepForm
        attributes={props.attributes}
        setAttributes={props.setAttributes}
        confirm={props.confirm}
      />
    </div>
  );
};

export default InfoStep;
