import React from "react";
import Image from "next/image";
import { User, UserInfo, UserLocalStorage } from "../../../interfaces";
import Carousel from "react-grid-carousel";

const UserWearing = ({}) => {
  const user: UserLocalStorage = JSON.parse(localStorage.getItem("user"));

  const userInfo: UserInfo = user.info;

  const wearingInfo: { name: string; imagePath: string; link: string }[] = [
    {
      name: "wearing_hair",
      imagePath: userInfo.wearing_hair,
      link: "",
    },
    {
      name: "wearing_face",
      imagePath: userInfo.wearing_face,
      link: "",
    },
    {
      name: "wearing_top",
      imagePath: userInfo.wearing_top,
      link: "",
    },
    {
      name: "wearing_right_arm",
      imagePath: userInfo.wearing_right_arm,
      link: "",
    },
    {
      name: "wearing_left_arm",
      imagePath: userInfo.wearing_left_arm,
      link: "",
    },
    {
      name: "wearing_left_leg",
      imagePath: userInfo.wearing_left_leg,
      link: "",
    },
    {
      name: "wearing_right_leg",
      imagePath: userInfo.wearing_right_leg,
      link: "",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold leading-normal mt-2 dark:text-gray-800">
        Currently Wearing
      </h1>
      <div className="grid grid-cols-2 bg-gray-100 ">
        <div className="relative ">
          <Image
            className="rounded-sm"
            src={userInfo.picture}
            alt="https://picsum.photos/id/1/200/200"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>
        <div className="flex items-center justify-center mt-5">
          <Carousel cols={2} rows={2} gap={1} hideArrow={true} showDots={true}>
            {wearingInfo?.map((context, index) => {
              return (
                <Carousel.Item key={context.name}>
                  <div
                    key={context.name}
                    className="relative h-32 w-32 mb-2 -mr-12"
                  >
                    <Image
                      className="rounded-lg cursor-pointer"
                      src={`https://picsum.photos/id/${index}/200/200`}
                      alt="https://picsum.photos/id/1/200/200"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default UserWearing;
