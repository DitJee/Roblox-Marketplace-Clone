import Head from "next/head";
import Image from "next/image";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import Login from "../components/PreLogin/Login";
import Register from "../components/PreLogin/Register";
import Home from "../components/PostLogin/Home";

const isBrowser = typeof window !== "undefined";

const StartingPage = (props) => {
  return isBrowser ? (
    <Router>
      <div className="App">
        <Head>
          <title>ROBLOCK</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
          <Route path="" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  ) : null;
};

export default StartingPage;
