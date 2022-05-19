import React, { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
const WaitingStep = (props: {
  mint: Function;
  minting: boolean;
  setShowWaitingStep: Function;
  confirm: Function;
}) => {
  const mintNFT = async () => {
    await props.mint();
  };
  useEffect(() => {
    mintNFT();
  }, []);

  return (
    <div className="flex justify-center items-center place-content-between overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900/50 backdrop-blur">
      <div className="relative w-screen p-2 mx-auto max-w-4xl bg-gray-500 border rounded-2xl">
        {props.minting ? (
          <div className="grid grid-cols place-content-center p-5 px-10 bg-violet-900">
            <h3 className="my-5 text-4xl font-semibold text-white">
              Minting your Creation ...
            </h3>
            <div className="my-5 text-center animate-spin rounded-full h-24 w-24 border-b-4 border-white"></div>
          </div>
        ) : (
          <>
            <div className="p-5 flex justify-end bg-violet-900">
              <button
                className=" "
                onClick={() => {
                  props.setShowWaitingStep(false);
                  props.confirm();
                }}
              >
                <XCircleIcon className=" w-9 text-white" />
              </button>
            </div>
            <div className="grid grid-cols place-content-center   bg-violet-900">
              <h3 className="mb-10 text-4xl font-semibold text-white">
                Finished Minting your Creation!
              </h3>
              <CheckCircleIcon className="mb-10 h-36 text-center text-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitingStep;
