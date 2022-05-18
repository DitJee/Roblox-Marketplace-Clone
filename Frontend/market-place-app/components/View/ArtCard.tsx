import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CubeIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { useCachedImage } from "../../Hooks/useArt";
const ArtCard = ({ uri, onLeftButtonClicked, onRightButtonClicked }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { cachedBlob } = useCachedImage(uri || "");

  useEffect(() => {
    console.log("uri", uri);
  }, []);
  return (
    <div className="flex flex-col place-items-center grow items-center content-center p-5 bg-gray-200 h-full ">
      {/* <div className="flex justify-between">
        <button
          type="button"
          className="rounded-full   text-center text-gray-900 "
          onClick={onLeftButtonClicked}
        >
          <CubeIcon className="h-6"></CubeIcon>
        </button>
        <button
          type="button"
          className="rounded-full   text-center text-gray-900 "
          onClick={onRightButtonClicked}
        >
          <DotsHorizontalIcon className="h-6"></DotsHorizontalIcon>
        </button>
      </div> */}

      <div className="flex place-items-center items-center ">
        <div className=" ">
          <img
            className="rounded-lg align-middle content-center"
            src={cachedBlob}
            alt="https://picsum.photos/id/1/200/300"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
