import React, { useEffect, useState } from "react";
import { IMetadataExtension } from "../../../../../interfaces";
import { Connection, programs } from "@metaplex/js";
import ArtCard from "../../../../View/ArtCard";
import useArtworkFiles from "../../../../../Hooks/Create/useArtworkFiles";
import { MintLayout } from "@solana/spl-token";
import StoreHelper, {
  LAMPORT_MULTIPLIER,
  MAX_METADATA_LEN,
} from "../../../../../Services/store.service";
import { solToUSD } from "../../../../../context/coingecko";
import { CurrencyDollarIcon } from "@heroicons/react/solid";

const {
  metaplex: { Store, AuctionManager, SetWhitelistedCreator },
  metadata: { Metadata },
  auction: { Auction },
  vault: { Vault },
} = programs;

const LaunchStep = (props: {
  confirm: () => void;
  attributes: IMetadataExtension;
  files: File[];
  connection: Connection;
}) => {
  const [cost, setCost] = useState(0);
  const { image, animation_url } = useArtworkFiles(
    props.files,
    props.attributes
  );
  const files = props.files;
  const metadata = props.attributes;

  const [bSuccessful, setBSuccessful] = useState<boolean>(false);

  const [priceUSD, setPriceUSD] = useState<number | undefined>(undefined);

  const getSolprice = async () => {
    const _solPrice = await solToUSD();
    setPriceUSD(_solPrice * cost);
  };

  useEffect(() => {
    getSolprice();
  }, [cost]);

  const calculateCost = async (_rentCall: Promise<[number, number]>) => {
    const lamports: number = await StoreHelper.getAssetCostToStore([
      ...files,
      new File([JSON.stringify(metadata)], "metadata.json"),
    ]);

    const sol = lamports / LAMPORT_MULTIPLIER;

    const [mintRent, metadataRent] = await _rentCall;

    const additionalSol = (metadataRent + mintRent) / LAMPORT_MULTIPLIER;

    setCost(sol + additionalSol);
  };
  useEffect(() => {
    const rentCall: Promise<[number, number]> = Promise.all([
      props.connection.getMinimumBalanceForRentExemption(MintLayout.span),
      props.connection.getMinimumBalanceForRentExemption(MAX_METADATA_LEN),
    ]);
    if (files.length) {
      calculateCost(rentCall);
    }
  }, [files, metadata, setCost]);

  return (
    <div className="mt-5 grid grid-cols-2 place-items-center p-5 rounded-xl bg-gray-300">
      <div className="col-span-2 justify-start border-4 p-5 rounded-xl bg-gray-800 mb-5">
        <h1 className="text-3xl font-normal leading-normal mt-0 mb-1 text-gray-100">
          Launch your creation
        </h1>
        <h4 className="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-200 ">
          Provide detailed description of your creative process to engage with
          your audience.
        </h4>
      </div>
      <ArtCard
        uri={image}
        onLeftButtonClicked={undefined}
        onRightButtonClicked={undefined}
      />
      <div className="ml-5 flex flex-col items-start border-4 p-5 rounded-xl bg-gray-600">
        <div className="">
          <h1 className="text-xl font-normal leading-normal mt-0 mb-2 text-gray-200">
            ROYALTY PERCENTAGE
          </h1>
          <h1 className="text-2xl font-extrabold leading-normal mt-0 mb-2 text-gray-100 border-4 p-5 rounded-xl bg-gray-800">
            {`${(metadata.seller_fee_basis_points / 100).toFixed(2)} %`}
          </h1>
        </div>
        {cost ? (
          <div className="">
            <div>
              <h1 className="text-xl font-normal leading-normal mt-0 mb-2 text-gray-200">
                COST TO CREATE
              </h1>
              <div className="flex items-center">
                <h1 className="text-2xl font-extrabold leading-normal mt-0 mb-2 text-gray-100 border-4 p-5 rounded-xl bg-gray-800">
                  {`${cost.toFixed(5)} sol (${priceUSD?.toFixed(3)} $)`}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex  content-center ">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-900"></div>
          </div>
        )}
      </div>
      <div className="col-span-2 justify-start mt-5">
        <button
          type="submit"
          className="text-purple-800 bg-gray-100 px-7 py-2 shadow-md    rounded-xl font-extrabold my-2 hover:shadow-xl active:scale-90 transition duration-150"
          disabled={bSuccessful}
          onClick={props.confirm}
        >
          <div className="flex items-center space-x-2">
            <h1>PAY WITH SOL</h1>
            {bSuccessful && (
              <div
                className="flex spinner-border animate-spin  w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default LaunchStep;
