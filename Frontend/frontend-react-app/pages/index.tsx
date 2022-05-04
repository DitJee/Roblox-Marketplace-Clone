import Layout from '../components/Layout';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import Header from '../components/PreLogin/Header';
import SignupForm from '../components/PreLogin/SignupForm';
import Login from '../components/PreLogin/Login';
import Register from '../components/PreLogin/Register';
import Home from '../components/PostLogin/Home';

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );
  // var fetchedData = await fetch("https://links.papareact.com/pyp")
  // const exploreData = await fetchedData.json()

  return {
    props: {
      exploreData: exploreData,
    },
  };
}

export default function StartingPage(props) {
  return (
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
  );
}
