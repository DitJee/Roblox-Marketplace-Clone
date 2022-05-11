import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const StepComponent = ({ step }) => {
  const navigate = useNavigate();

  const changeStep = (index) => {
    navigate(`/home/create/${index.toString()}`);
  };

  const hideButtonHighlight = () => {
    return "text-gray-800 bg-gray-100 px-2 py-2 shadow-md rounded-sm font-bold mb-2 hover:shadow-xl active:scale-90 transition duration-150 mr-5 cursor-pointer";
  };

  const showButtonHighlight = () => {
    return "text-gray-800 bg-purple-600 px-2 py-2 shadow-md rounded-sm font-bold mb-2 hover:shadow-xl active:scale-90 transition duration-150 mr-5 cursor-pointer";
  };
  return (
    <div className="mt-5 flex items-baseline justify-center">
      {[
        {
          name: "Category",
        },
        {
          name: "Upload",
        },
        {
          name: "Info",
        },
        {
          name: "Royalties",
        },
        {
          name: "Launch",
        },
      ].map((element, index) => {
        return (
          <div
            key={index}
            className={
              step === index ? showButtonHighlight() : hideButtonHighlight()
            }
            onClick={() => changeStep(index)}
          >
            {element.name}
          </div>
        );
      })}
    </div>
  );
};

export default StepComponent;
