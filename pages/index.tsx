// pages/index.js (or any other page)

import React from 'react';
import Layout from '../components/Layout';
import InvestmentType from "./InvestmentType";
const Home = () => {
  return (
    // <Layout>
    <div>
      {/* Your page content goes here
        <h2>Welcome to my website</h2>
        <p>This is the home page content</p> */}
      <InvestmentType />
    </div>
    // </Layout>
  );
};

export default Home;
