import React from "react";
import Ourmission from "../../components/About/Ourmission";
import CoreValues from "../../components/About/CoreValues";
import FAQSection from "../../components/About/FaqSection";
import Gallery from "../../components/About/Gallery";
import FooterPage from "@/components/Footer/FooterPage";
import DynamicHeader from "../../components/About/DynamicHeader";
import Header from "@/components/About/Header";
import Home from "../../components/About/Home";
import Content from "../../components/About/Content";
import Discount from "@/components/About/Discount";



const AboutUs: React.FC = () => {
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
  const values = [
    {
      title: "Excellence in Every Detail",
      description:
        "We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every time",
    },
    {
      title: "Personalized Care",
      description:
        "We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every tim",
    },
    {
      title: "Transparent Communication",
      description:
        "Experience personalized care with services designed to address your specific needs for optimal satisfaction",
    },
    {
      title: "Eco-Friendly Approach",
      description:
        "Our commitment to transparent communication means no surprises—just clear, honest, and consistent updates every time.",
    },
  ];
  const progressBars = [
    { label: "Experienced", percentage: 98 },
    { label: "Reliable", percentage: 86 },
    { label: "Skilled & Capable", percentage: 90 },
    { label: "Flexible", percentage: 80 },
  ];
  const images = [
    "/Images/plumber1.jpg",
    "/Images/plumber2.jpg",
    "/Images/plumber3.jpg",
    "/Images/plumber4.jpg",
    "/Images/plumber5.jpg",
    "/Images/plumber6.jpg",
  ];
  return (
    <section className="bg-white ">
      <Header></Header>
      <DynamicHeader title="About Us" />
      <Home></Home>
      <Content></Content>
      <Ourmission missions={missionData} />
      <CoreValues values={values} progressBars={progressBars} />
      <Gallery images={images} />
      <Discount></Discount>
      <FAQSection></FAQSection>
      <FooterPage></FooterPage>
    </section>

  );
};

export default AboutUs;
