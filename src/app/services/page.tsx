import Layout from "@/components/Layout";
import FAQ from "@/components/Sercices/FAQ";
import HowItWorks from "@/components/Sercices/HowItWorks";
import LatestProjects from "@/components/Sercices/LatestProjects";
import OurServises from "@/components/Sercices/OurServices";
import OurValue from "@/components/Sercices/OurValue";
import Reviews from "@/components/Sercices/Reviews";
import ServicesHeader from "@/components/Sercices/ServicesHeader";
import DynamicHeader from "@/components/About/DynamicHeader";
import React from "react";

function Services() {
  return (
    <Layout>
      <DynamicHeader title="Our Services / Service Details" />
      <ServicesHeader />
      <Reviews />
      <LatestProjects />
      <OurValue />
      <HowItWorks />
      <OurServises />
      <FAQ />
    </Layout>
  );
}

export default Services;
