import React, { useEffect, useState, useCallback } from "react";
import {
  Steps,
  Row,
  Button,
  Upload,
  Col,
  Input,
  Statistic,
  Slider,
  Progress,
  Spin,
  InputNumber,
  Form,
  Typography,
  Space,
} from "antd";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MintLayout } from "@solana/spl-token";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import useWindowDimensions from "../../../utils/layout";

import { string } from "yup";
import {
  IMetadataExtension,
  MetaData,
  MetadataCategory,
} from "../../../interfaces";
import { Connection, programs } from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { MetaplexOverlay } from "./MetaplexOverlay";
import CategoryStep from "./Steps/CategoryStep";
import StepComponent from "./StepComponent";
import UploadStep from "./Steps/UploadStep";
import InfoStep from "./Steps/InfoStep/InfoStep";
import RoyaltiesStep from "./Steps/RoyaltiesStep/RoyaltiesStep";

const {
  metadata: { Metadata },
} = programs;

const { Step } = Steps;
const { Text } = Typography;

const Create = () => {
  const connection = new Connection("devnet");
  const { publicKey, sendTransaction, wallets } = useWallet();
  const [alertMessage, setAlertMessage] = useState<string>();
  const { step_param } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [stepsVisible, setStepsVisible] = useState<boolean>(true);

  const [step, setStep] = useState<number>(0);

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
      category: MetadataCategory.Image,
    },
  });

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

  const loadMetaData = async (
    connection: Connection,
    tokenPublicKey: string
  ) => {
    try {
      const NFT_MINT_ADDRESS = new PublicKey(tokenPublicKey);
      //I'm searching for this: C79iLmxdRoyVfKcaKU7YBppECTtqhSH8erXYPzxxhsH8

      const pda = await Metadata.getPDA(NFT_MINT_ADDRESS);
      console.log("pda", pda.toBase58());

      const ownedMetadata = await Metadata.load(connection, pda);
      console.log(ownedMetadata);
    } catch (err) {
      console.log("Failed to fetch metadata", err);
    }
  };

  const stepComponent = (_step: number) => {
    switch (_step) {
      case 0:
        return (
          <CategoryStep
            confirm={(category: MetadataCategory) => {
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
        break;

      case 5:
        break;

      default:
        return (
          <CategoryStep
            confirm={(category: MetadataCategory) => {
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
