import React, { useEffect, useState } from "react";
import { IMetadataExtension } from "../../interfaces";

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

export default useArtworkFiles;
