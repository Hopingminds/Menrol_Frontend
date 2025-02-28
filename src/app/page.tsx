"use client";
import Supakling from "@/components/Home/Supakling";
import OurServises from "@/components/Home/OurServises";
import LatestOffer from "@/components/Home/LatestOffer";
import Testimonials from "@/components/Home/Testimonials";
import ScanAndDownload from "@/components/Home/ScanAndDownload";
import CallToAction from "@/components/Home/CallToAction";
import Layout from "@/components/Layout";
import SubCatogeries from "@/components/Home/SubCatogeries";
import NewBanner from "@/components/NewBanner/NewBanner";

export default function Home() {

  return (
    <Layout>
      <NewBanner/>
      <Supakling />
      <OurServises />
      <LatestOffer />
      <SubCatogeries />
      <ScanAndDownload />
      <CallToAction />
      <Testimonials />
    </Layout>
  );
}
