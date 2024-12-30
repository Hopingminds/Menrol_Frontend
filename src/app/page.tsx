"use client";
import { useEffect, useState } from "react";
import Supakling from "@/components/Home/Supakling";
import OurServises from "@/components/Home/OurServises";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import LatestOffer from "@/components/Home/LatestOffer";
import Blogs from "@/components/Home/Blogs";
import DreamTeam from "@/components/Home/DreamTeam";
import Testimonials from "@/components/Home/Testimonials";
import ScanAndDownload from "@/components/Home/ScanAndDownload";
import CallToAction from "@/components/Home/CallToAction";
import Layout from "@/components/Layout";
import DynamicHeader from "@/components/About/DynamicHeader";

export default function Home() {
  const [isXsm, setIsXsm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsXsm(window.innerWidth >= 320 && window.innerWidth <= 480);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      {isXsm && <DynamicHeader title="" />}
      <Supakling />
      <OurServises />
      <WhyChooseUs />
      <LatestOffer />
      <Blogs />
      <DreamTeam />
      <Testimonials />
      <ScanAndDownload />
      <CallToAction />
    </Layout>
  );
}
