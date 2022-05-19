import { MetaDataJsonCategory } from "@metaplex/js";
import { Row } from "antd";
import React, { FC } from "react";
import useWindowDimensions from "../../../../utils/layout";

const CategoryStep = (props: { confirm: (category) => void }) => {
  const { width } = useWindowDimensions();

  const textStyle = () => {
    return "text-center";
  };

  return (
    <div className="flex flex-col item-center mt-4 px-32">
      {[
        {
          name: "Image",
          category: "image",
          description: "JPG, PNG, GIF",
        },
        {
          name: "Video",
          category: "video",
          description: "MP4, MOV",
        },
        {
          name: "Audio",
          category: "audio",
          description: "MP3, WAV, FLAC",
        },
        {
          name: "AR/3D",
          category: "vr",
          description: "GLB",
        },
        {
          name: "HTML Asset",
          category: "html",
          description: "HTML",
        },
      ].map((element, index) => {
        return (
          <button
            key={element.name}
            type="button"
            className="text-gray-100 bg-purple-900 px-8 py-2 shadow-md    
            rounded-full font-bold my-2 hover:shadow-xl active:scale-90 
            transition duration-150 mr-5 cursor-pointer"
            onClick={() => props.confirm(element.category)}
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryStep;
