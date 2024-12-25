"use client";
import React from "react";
import HowToApply from "@/components/Careers/HowToApply";
import DynamicHeader from "@/components/About/DynamicHeader";
import PhoenixSterling from "@/components/Careers/PhoenixSterling";
import CleaningTechnician from "@/components/CareerDetails/CleaningTechnician";
import RelatedJobs from "@/components/CareerDetails/RelatedJobs";
import Layout from "@/components/Layout";

const careerdetails = () => {
  return (
    <Layout>
      <DynamicHeader title="careerdetails" />
      <CleaningTechnician />
      <RelatedJobs />
      <PhoenixSterling />
      <HowToApply />
    </Layout>
  );
};

export default careerdetails;
