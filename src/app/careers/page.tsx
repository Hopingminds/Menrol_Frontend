import React from "react";
import Ourmission from "../../components/About/Ourmission";
import CultureSection from "../../components/Careers/CultureSection";
import HowToApply from "../../components/Careers/HowToApply";
import DynamicHeader from "@/components/About/DynamicHeader";
import Content from "@/components/About/Content";
import JoinOurTeam from "@/components/Careers/JoinOurTeam";
import OpenPositions from "@/components/Careers/OpenPositions";
import PhoenixSterling from "@/components/Careers/PhoenixSterling";
import Layout from "@/components/Layout";

const Careers: React.FC = () => {
  const missionData = [
    {
      number: "01",
      title: "Outstanding Innovators",
      description:
        "We empower outstanding innovators to reshape industries, consistently providing forward-thinking solutions with exceptional results",
    },
    {
      number: "02",
      title: "Spotless Solutions",
      description:
        "We provide a spotless solution, ensuring every inch of your space is cleaned to perfection",
    },
    {
      number: "03",
      title: "Healthy Environments",
      description:
        "By prioritizing cleanliness and hygiene, we create healthy environments that enhance well-being and comfort",
    },
    {
      number: "04",
      title: "Sustainable Practices",
      description:
        "Committed to sustainable practices, we focus on eco-friendly solutions that contribute to a healthier planet",
    },
    {
      number: "05",
      title: "Empowered Team",
      description:
        "Driven by passion and empowerment, our team consistently delivers outstanding results and innovative solutions",
    },
    {
      number: "06",
      title: "Timeless Connections",
      description:
        "Creating timeless connections by delivering value and trust, ensuring relationships that stand the test of tim",
    },
  ];

  return (
    <Layout>
      <section className="bg-white">

        <DynamicHeader title="careers" />
        <JoinOurTeam />

        <Content />


        <Ourmission missions={missionData} />

        <CultureSection />


        <PhoenixSterling />
        <OpenPositions />

        <HowToApply />

      </section>
    </Layout>
  );
};

export default Careers;
