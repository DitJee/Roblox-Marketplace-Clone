import React, { useEffect, useState, useCallback } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MintLayout } from "@solana/spl-token";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import useWindowDimensions from "../../../utils/layout";

import { string } from "yup";
import {
  IMetadataExtension,
  MetaData,
  StringPublicKey,
} from "../../../interfaces";
import {
  Connection,
  programs,
  actions,
  Wallet,
  MetadataJson,
  MetadataJsonCreator,
  MetadataJsonProperties,
  MetaDataJsonCategory,
  MetadataJsonFile,
} from "@metaplex/js";

import CategoryStep from "./Steps/CategoryStep";
import StepComponent from "./StepComponent";
import UploadStep from "./Steps/UploadStep";
import InfoStep from "./Steps/InfoStep/InfoStep";
import RoyaltiesStep from "./Steps/RoyaltiesStep/RoyaltiesStep";
import LaunchStep from "./Steps/LaunchStep/LaunchStep";
import { MintNFTParams, MintNFTResponse } from "@metaplex/js/lib/actions";
import useArtworkFiles from "../../../Hooks/Create/useArtworkFiles";
import WaitingStep from "./Steps/WaitingStep/WaitingStep";

import { mintNFT } from "../../../Services/creation/NFT";

const {
  metadata: { Metadata },
} = programs;

const Create = () => {
  const connection = new Connection("devnet");
  const { publicKey, sendTransaction, signAllTransactions, signTransaction } =
    useWallet();
  const [alertMessage, setAlertMessage] = useState<string>();
  const { step_param } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [stepsVisible, setStepsVisible] = useState<boolean>(true);

  const [step, setStep] = useState<number>(0);

  const [isMinting, setMinting] = useState<boolean>(false);
  const [nft, setNft] = useState<MintNFTResponse | undefined>(undefined);

  const [files, setFiles] = useState<File[]>([]);
  const [attributes, setAttributes] = useState<IMetadataExtension>({
    name: "",
    symbol: "",
    description: "",
    external_url: "",
    image: "",
    animation_url: undefined,
    attributes: undefined,
    seller_fee_basis_points: 0,
    creators: [],
    properties: {
      files: [],
      maxSupply: 0,
      category: "image",
    },
  });

  // store files
  const mint = async () => {
    setStepsVisible(false);
    setMinting(true);

    try {
      const _nft: MintNFTResponse = await mintNFT(
        publicKey,
        signAllTransactions,
        signTransaction,
        connection,
        attributes
      );
      console.log(" _nft #1 => ", _nft);

      if (_nft) setNft(_nft);

      console.log(" _nft #2 => ", _nft);
    } catch (e: any) {
      setAlertMessage(e.message);
      console.error(e);
      console.log(" e.message => ", e.message);
    } finally {
      setMinting(false);
    }
  };

  const gotoStep = useCallback(
    (_step: number) => {
      navigate(`/home/create/${_step.toString()}`);
      if (_step === 0) setStepsVisible(true);
    },
    [navigate]
  );

  useEffect(() => {
    if (step_param) {
      setStep(parseInt(step_param));
    } else {
      gotoStep(0);
    }

    console.debug("attributes", attributes);
    console.debug("files", files);
  }, [step_param, gotoStep]);

  const stepComponent = (_step: number) => {
    switch (_step) {
      case 0:
        return (
          <CategoryStep
            confirm={(category: MetaDataJsonCategory) => {
              setAttributes({
                ...attributes,
                properties: {
                  ...attributes.properties,
                  category,
                },
              });
              gotoStep(1);
            }}
          />
        );
        break;

      case 1:
        return (
          <UploadStep
            attributes={attributes}
            setAttributes={setAttributes}
            files={files}
            setFiles={setFiles}
            confirm={() => gotoStep(2)}
          />
        );
        break;

      case 2:
        return (
          <InfoStep
            attributes={attributes}
            files={files}
            setAttributes={setAttributes}
            confirm={() => gotoStep(3)}
          />
        );

        break;

      case 3:
        return (
          <RoyaltiesStep
            attributes={attributes}
            setAttributes={setAttributes}
            confirm={() => gotoStep(4)}
          />
        );
        break;

      case 4:
        return (
          <LaunchStep
            attributes={attributes}
            files={files}
            confirm={() => gotoStep(5)}
            connection={connection}
          />
        );
        break;

      case 5:
        return (
          <WaitingStep
            mint={mint}
            minting={isMinting}
            confirm={() => gotoStep(6)}
          />
        );
        break;

      default:
        return (
          <CategoryStep
            confirm={(category: MetaDataJsonCategory) => {
              setAttributes({
                ...attributes,
                properties: {
                  ...attributes.properties,
                  category,
                },
              });
              gotoStep(1);
            }}
          />
        );
        break;
    }
  };

  return (
    <div className=" grid grid-col-2 items-center  p-10 bg-gray-100">
      <StepComponent step={step} />
      {stepComponent(parseInt(step_param))}
    </div>
  );
};

export default Create;
