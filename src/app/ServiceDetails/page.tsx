
import Layout from "@/components/Layout";
import HowItWorks from "@/components/Sercices/HowItWorks";
import Ourservices from "@/components/ServiceDetails/Ourservices";
import Testimonials from "@/components/ServiceDetails/Testimonials";
import WhyChooseUs from "@/components/ServiceDetails/WhyChooseUs";
import React from "react";

const ServiceDetails = () => {
  return (
    <Layout>
      <div>
        <Ourservices />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </Layout>
  );
};

export default ServiceDetails;
