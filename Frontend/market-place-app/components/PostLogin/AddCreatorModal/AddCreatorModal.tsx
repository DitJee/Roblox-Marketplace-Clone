import React, { useCallback, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  SetWhitelistedCreatorParams,
  StoreInfo,
  ParamsWithStore,
} from "../../../interfaces";
import { Account } from "@metaplex-foundation/mpl-core";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, programs } from "@metaplex/js";
import { TransactionCtorFields, Signer, Keypair } from "@solana/web3.js";
import { toPublicKey } from "../../../utils/string";
import { decode, encode } from "bs58";
import * as anchor from "@project-serum/anchor";
const {
  metaplex: { Store, AuctionManager, SetWhitelistedCreator },
  metadata: { Metadata },
  auction: { Auction },
  vault: { Vault },
} = programs;

const successfulClassName: { bar: string; icon: string } = {
  bar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-teal-500 mr-4",
};
const unSuccessfulClassName: { bar: string; icon: string } = {
  bar: "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md",
  icon: "fill-current h-6 w-6 text-red-500 mr-4",
};

const validationSchema = () => {
  return Yup.object().shape({
    walletAddress: Yup.string()
      .test(
        "len",
        "The wallet address must be 44 characters",
        (val: any) =>
          val && val.toString().length >= 43 && val.toString().length <= 45
      )
      .required("The wallet address is required!"),
  });
};

const AddCreatorModal = ({}) => {
  const [creatorAddresses, setCreatorAddresses] = useState([]);
  const { publicKey, signTransaction, signAllTransactions, connected } =
    useWallet();

  const storeInfo: StoreInfo = JSON.parse(localStorage.getItem("store"));
  console.log("storeInfo", storeInfo);

  const connection = new Connection("devnet");

  const getCreators = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    try {
      // Load store
      const store = await Store.load(connection, storeInfo.storeId);

      // Get all whitelisted creators
      const creators = await store.getWhitelistedCreators(connection);

      const _creator = [];
      await Promise.all(
        creators.map((creator, index) => {
          _creator.push({
            id: index,
            publicKey: creator.pubkey.toBase58(),
          });
        })
      );

      setCreatorAddresses(_creator);
      console.log("creators => ", creators);
      console.log("_creator => ", _creator);
      console.log("creatorAddresse => ", creatorAddresses);
    } catch (error) {
      console.log("error => ", error);
    }
  }, [publicKey, connection, storeInfo]);

  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [modalAddress, setModalAddress] = useState<string>("");

  const addCreatorToWhiteList = async (_walletAddress) => {
    const { walletAddress } = _walletAddress;
    console.log("walletAddress =>", walletAddress);

    const bIsDuplicatedAddress = (address) => address === walletAddress;

    const bCreatorAlreadyAdded: boolean =
      creatorAddresses.some(bIsDuplicatedAddress);

    if (bCreatorAlreadyAdded) {
      setModalAddress("");
      setMessage("The creator has already been added to the store");
    } else {
      await addWhitelistedCreator(walletAddress);

      setModalAddress(walletAddress);
      setMessage("");
    }

    console.log("modalAddress =>", modalAddress);
  };

  const addWhitelistedCreator = async (walletAddress: string) => {
    let recentBlockHash = await connection.getLatestBlockhash();

    const options: TransactionCtorFields = {
      /** A recent blockhash */
      recentBlockhash: recentBlockHash.blockhash,
      /** Optional nonce information used for offline nonce'd transactions */
      nonceInfo: null,
      /** The transaction fee payer */
      feePayer: toPublicKey(walletAddress),
    };
    console.log("toPublicKey(walletAddress)", toPublicKey(walletAddress));
    const params: ParamsWithStore<SetWhitelistedCreatorParams> = {
      store: toPublicKey(storeInfo.storeId),
      admin: toPublicKey(storeInfo.storeId),
      whitelistedCreatorPDA: toPublicKey(walletAddress),
      creator: toPublicKey(walletAddress),
      activated: true,
    };

    // init white listed creator
    const whiteListedCreator = new SetWhitelistedCreator(options, params);

    // get estimated fee
    const transcationFee = await whiteListedCreator.getEstimatedFee(connection);
    console.log("transcationFee =>", transcationFee);

    const signerKeyPair = Keypair.fromSeed(decode(walletAddress));

    // sign the transaction
    const _signer: Signer = {
      publicKey: signerKeyPair.publicKey,
      secretKey: signerKeyPair.secretKey,
    };
    console.log("_signer => ", _signer);

    const transferAuthority: Keypair = Keypair.generate();
    const signer: Signer = {
      publicKey: transferAuthority.publicKey,
      secretKey: transferAuthority.secretKey,
    };
    whiteListedCreator.sign(signer);
  };

  const initialValues: { walletAddress: string } = {
    walletAddress: "",
  };

  useEffect(() => {
    getCreators();
  }, [showModal]);

  return (
    <div>
      <button
        className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Creators
      </button>

      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900/50 backdrop-blur">
          <div className="relative w-screen p-2 mx-auto max-w-4xl bg-gray-500 border rounded-2xl">
            <div className="flex flex-col justify-center p-5 px-10 bg-violet-900">
              <div className="flex justify-between">
                <h3 className=" text-2xl font-semibold text-white">
                  Add Creator
                </h3>
                <button
                  className=" "
                  onClick={() => {
                    setModalAddress("");
                    setShowModal(false);
                  }}
                >
                  <XCircleIcon className=" w-9 fill-gray-200" />
                </button>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={addCreatorToWhiteList}
              >
                <Form>
                  <Field
                    name={"walletAddress"}
                    type={"text"}
                    placeholder={"ESz5bto4fkF68grek4cAhsfn7r9XBnG85RLZLkJRAzbE"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 form-control col-span-2 mt-4"
                  />
                  <ErrorMessage
                    name={"walletAddress"}
                    component="div"
                    className="mt-5 mb-5 flex items-center border dark:border-red-800 bg-gray-700  text-white text-sm font-bold px-4 py-3"
                  />
                  <div className="form-group flex justify-center">
                    <button
                      type="submit"
                      className="text-purple-800 bg-gray-100 px-3 py-1 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
                      disabled={bSuccessful}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Add</span>
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
                  {message && (
                    <div
                      className={
                        bSuccessful
                          ? successfulClassName.bar
                          : unSuccessfulClassName.bar
                      }
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className={
                              bSuccessful
                                ? successfulClassName.icon
                                : unSuccessfulClassName.icon
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-normal">{}</div>
                          <div className="text-sm py-1 items-center">
                            {message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddCreatorModal;
