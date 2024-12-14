import React from "react";
import Feature from "../../components/About/Feature";
import Ourmission from "../../components/About/Ourmission";
import CoreValues from "../../components/About/CoreValues";
import FAQSection from "../../components/About/FaqSection";
import Gallery from "../../components/About/Gallery";
import Layout from "@/components/Layout";

const AboutUs: React.FC = () => {
  const missionData = [
    {
      number: "01",
      title: "Excellent Pioneers",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
    {
      number: "02",
      title: "Spotless Solutions",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
    {
      number: "03",
      title: "Healthy Environments",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
    {
      number: "04",
      title: "Sustainable Practices",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
    {
      number: "05",
      title: "Empowered Team",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
    {
      number: "06",
      title: "Lasting Bonds",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus.",
    },
  ];
  const values = [
    {
      title: "Excellence in Every Detail",
      description:
        "Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.",
    },
    {
      title: "Personalized Care",
      description:
        "Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.",
    },
    {
      title: "Transparent Communication",
      description:
        "Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.",
    },
    {
      title: "Eco-Friendly Approach",
      description:
        "Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.",
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
    <Layout>
      <section className="bg-white py-16">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend px-24">
            / About Us
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between  px-24 mt-4">
            {/* Left Section: Heading */}
            <h2 className="text-5xl font-lexend md:text-4xl   font-bold text-gray-900 md:w-1/2  tracking-wider leading-relaxed ">
              Elevating Cleanliness to Perfection
            </h2>

            {/* Right Section: Paragraph */}
            <div className="flex justify-end w-2/3 mt-6">
              <div className="flex justify-end">
                <p className="text-gray-500 md:w-1/2 text-sm self-end  text-justify">
                  Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris
                  nuncaliquam nunc ullamcorper tincidunt morbi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid ">
          <div className="grid grid-cols-3 gap-4 px-24">
            <div className="flex-col">
              <div className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-72 w-72">
                <div className="text-6xl font-bold text-white mt-9">99%</div>
                <p className="text-gray-600 mt-2">Satisfied Clients</p>
                <div className="absolute top-4 left-4 text-lg">⭐</div>
                <div className="absolute bottom-4 right-4 text-gray-700 text-lg">
                  ★
                </div>
              </div>
              <div className="col-span-1">
                <Feature
                  title="Professional Cleaners"
                  description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center col-span-2">
              <div className="bg-[rgba(94,147,198,1)] w-[95%] h-72 rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="/Images/solar.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>

              <div className="col-span-2 grid grid-cols-2 md:grid-cols-2 gap-20 ">
                {" "}
                {/* Reduced gap and added margin top */}
                <Feature
                  title="Flexible Scheduling"
                  description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
                />
                <Feature
                  title="Attention to Detail"
                  description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-14 mt-12 px-24">
          <div
            className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-72 w-72"
            style={{
              backgroundImage: "url('/Images/businessman.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
          </div>
          {/* Content Section */}
          <div className="w-1/2 flex flex-col  ">
            <h1 className="text-black text-4xl font-bold mb-4">
              Embracing Cleanliness and Beyond:
            </h1>
            <button className="bg-[rgba(193,244,88,1)] text-white w-[50%] h-10 px-2 py-2 mb-4 flex items-center justify-center gap-1 ">
              <span className="text-md">🎤</span>
              <span className="text-sm">A message from the founder</span>
            </button>

            <p className="text-gray-600 text-justify">
              Scelerisque risus in sagittis malesuada. Praesent nec vestibulum
              ipsum odio enim risus. Egestas tempor morbi felis faucibus
              vulputate lorem lectus tortor bibendum. Molestie id aliquam ornare
              in imperdiet nisi.
            </p>
          </div>
        </div>

        <div>
          <Ourmission missions={missionData} />
        </div>
        <div>
          <CoreValues values={values} progressBars={progressBars} />
        </div>
        <div>
          <Gallery images={images} />
        </div>

        <div className="flex justify-center gap-16 items-center bg-[rgba(0,84,165,1)]  h-screen">
          {/* First Div */}
          <div
            className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl h-80 w-72 mx-4 px-24"
            style={{
              backgroundImage: "url('/Images/OfferImage.png')",
              backgroundSize: "cover",
              backgroundPosition: "",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* New Box */}
            <div className="absolute top-16 right-[-40px] bg-[rgba(36,35,42,1)] text-white p-4 w-28 h-36 rounded-lg shadow-lg">
              {/* Content for the overlapping box */}
            </div>
          </div>


          {/* Second Div */}
          <div className="mx-4">
            <p className="text-sm font-bold text-green-500">
              /DISCOUNT UP TO 50%
            </p>
            <h1 className="text-4xl font-bold mt-2 leading-relaxed">
              Limited Time Offer-
              <br />
              Enjoy Exclusive
              <br />
              Cleaning Discounts!
            </h1>
            <p className="mt-4 text-sm">
              Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris
              nunc
              <br />
              aliquam nunc ullamcorper tincidunt morbi.
            </p>
            <p className="mt-4 text-sm font-bold underline cursor-pointer">
              Contact Us
            </p>
          </div>
        </div>
        <div className="border">
          <FAQSection></FAQSection>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
