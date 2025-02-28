"use client";
import React from "react";
import Layout from "@/components/Layout";
import Ourservices from "@/components/ServiceDetails/Ourservices";
import Testimonials from "@/components/ServiceDetails/Testimonials";
import WhyChooseUs from "@/components/ServiceDetails/WhyChooseUs";

const ServiceDetails: React.FC = () => {
  return (
    <Layout>
      <Ourservices />
      <WhyChooseUs />
      <Testimonials />
    </Layout>
  );
};

export default ServiceDetails;

