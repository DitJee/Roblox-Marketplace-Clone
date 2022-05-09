import React from 'react';
import { AppProps } from 'next/app';

import '../styles/index.css';
import '../styles/Home.module.css';
require('../styles/globals.css');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
