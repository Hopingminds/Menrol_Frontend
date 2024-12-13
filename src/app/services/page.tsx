import Layout from "@/components/Layout";
import LatestProjects from "@/components/Sercices/LatestProjects";
import OurValue from "@/components/Sercices/OurValue";
import Reviews from "@/components/Sercices/Reviews";
import ServicesHeader from "@/components/Sercices/ServicesHeader";
import React from "react";

function Services() {
  return (
    <Layout>
      <ServicesHeader />
      <Reviews />
      <LatestProjects />
      <OurValue />
    </Layout>
  );
}

export default Services;
