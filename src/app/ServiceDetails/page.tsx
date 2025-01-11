"use client";
import React, { useEffect, useState } from "react";
import DynamicHeader from "@/components/About/DynamicHeader";
import Layout from "@/components/Layout";
import Ourservices from "@/components/ServiceDetails/Ourservices";
import Testimonials from "@/components/ServiceDetails/Testimonials";
import WhyChooseUs from "@/components/ServiceDetails/WhyChooseUs";

const ServiceDetails: React.FC = () => {
  const [isXsm, setIsXsm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsXsm(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {isXsm && <DynamicHeader title="Our Services" />}
      <Ourservices />
      <WhyChooseUs />
      <Testimonials />
    </Layout>
  );
};

export default ServiceDetails;

