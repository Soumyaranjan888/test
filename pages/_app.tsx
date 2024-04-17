// pages/_app.js

import React from 'react';
import Layout from '../components/Layout';
import { AppProps } from 'next/app'; // Import the AppProps type from Next.js

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
