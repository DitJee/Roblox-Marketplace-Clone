import React, { useEffect } from "react";

const WaitingStep = (props: {
  mint: Function;
  minting: boolean;
  confirm: Function;
}) => {
  const mintNFT = async () => {
    await props.mint();
    //props.confirm();
  };
  useEffect(() => {
    mintNFT();
  }, []);

  return (
    <div className="">
      <div className="flex  content-center ">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-900"></div>
      </div>
    </div>
  );
};

export default WaitingStep;
