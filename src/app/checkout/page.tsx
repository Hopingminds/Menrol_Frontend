"use client";

import Checkout from '@/components/AddTocart/Checkout';
import Layout from '@/components/Layout';

const page = () => {
  const userAddress = "123 Main St, Cityville";

  return (
    <Layout>
        <Checkout address={userAddress} />
    </Layout>
  );
};

export default page;
