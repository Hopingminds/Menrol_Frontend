"use client";

import React, { Suspense } from "react";
import Layout from "@/components/Layout";
import IndividualService from "@/components/IndividualServices/IndividualServices";

const IndividualServices = () => {
  return (
    <Layout>
      {/* Suspense boundary for IndividualService */}
      <Suspense fallback={<p>Loading service details...</p>}>
        <IndividualService />
      </Suspense>
    </Layout>
  );
};

export default IndividualServices;
