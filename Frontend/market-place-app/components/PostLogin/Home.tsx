import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import PostLoginHeader from "./PostLoginHeader";
import Footer from "./Footer";
import TrackVisibility from "react-on-screen";
import Profile from "./Profile/Profile";
import Create from "./Create/Create";
import { PublicKey, Transaction } from "@solana/web3.js";
import { actions, Connection, Wallet } from "@metaplex/js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

interface IInitStoreResponse {
  storeId: PublicKey;
  txId: string;
}

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // const { publicKey, signTransaction, signAllTransactions, connected } =
  //   useWallet();

  // const connection = new Connection("devnet");
  // const wallet: Wallet = {
  //   publicKey: publicKey,
  //   signTransaction: signTransaction,
  //   signAllTransactions: signAllTransactions,
  // };

  // const initStore = useCallback(async () => {
  //   if (!publicKey) throw new WalletNotConnectedError();

  //   try {
  //     const InitStoreResponse = await actions.initStore({
  //       connection,
  //       wallet,
  //     });

  //     console.log("storeIdz => ", InitStoreResponse);

  //     localStorage.setItem("store", JSON.stringify(InitStoreResponse));
  //   } catch (error) {
  //     console.log("error => ", error);
  //   }
  // }, [publicKey, connection, wallet]);

  // useEffect(() => {
  //   initStore();
  // }, []);

  // const [storeId, setStoreId] = useState();

  // const { connection } = useConnection();

  const onClickSidebarToggle = (e) => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className=" flex flex-col h-screen justify-between">
      <TrackVisibility>
        <PostLoginHeader
          onClickSidebarToggle={onClickSidebarToggle}
          showSidebar={showSidebar}
          isVisible={undefined}
        />
      </TrackVisibility>

      <main className="max-w-8xl mx-auto  px-32 sm:px-16 main-container">
        <section className="pl-60">
          <Routes>
            <Route path="profile/*" element={<Profile />}></Route>
            <Route path="create/:step_param" element={<Create />}></Route>
            <Route
              path=""
              element={<Dashboard showSidebar={showSidebar} />}
            ></Route>
          </Routes>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
