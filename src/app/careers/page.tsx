import React from "react";
import Ourmission from "../../components/About/Ourmission";
import CultureSection from "../../components/Careers/CultureSection";
import HowToApply from "../../components/Careers/HowToApply";
import JobCard from "@/components/CareerDetails/JobCard";
import Header from "@/components/Home/Header";
import DynamicHeader from "@/components/About/DynamicHeader";
import Content from "@/components/About/Content";

const Careers: React.FC = () => {
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
  const jobData = [
    {
      title: "Janitorial Crew Member",
      salary: "$13 - $16 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
    {
      title: "Eco-Cleaning Supervisor",
      salary: "$17 - $20 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
    {
      title: "Remote Quality Control",
      salary: "$14 - $17 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
    {
      title: "Remote Quality Control",
      salary: "$14 - $17 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
    {
      title: "Remote Quality Control",
      salary: "$14 - $17 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
    {
      title: "Remote Quality Control",
      salary: "$14 - $17 per hour",
      tags: ["Full-time", "Part-time", "Remote"],
      description:
        "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
      buttonText: "Learn More",
    },
  ];

  return (
    <section className="bg-white">
      <div className="border ">
        <Header></Header>
      </div>
      <div>
        <DynamicHeader title="careers" />
      </div>
      <div className="flex  mt-12  justify-around ">
        <div className="flex-col text-justify  w-[40%] leading-relaxed  ">
          <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend ">
            /JOIN OUR TEAM
          </p>
          <h1 className="text-5xl font-semibold w-[90%] font-lexend leading-normal">Make a Difference with a Rewarding Cleaning Career </h1>
          <p className="mt-2 font-sans">
            Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris
            nunc aliquam nunc ullamcorper tincidunt morbi.{" "}
          </p>
          <button className="bg-[rgba(0,84,165,1)] rounded-full mt-4 h-12 w-32">
            Learn More
          </button>
        </div>
        <div
          className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-80 w-80 border border-black"
          style={{
            backgroundImage: "url('/Images/ServiceImg/closeup service (1).jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>

      </div>
      <div>
        <Content></Content>
      </div>
      <div>
        <Ourmission missions={missionData} />
      </div>
      <div>
        <CultureSection></CultureSection>
      </div>

      <div className="flex  px-24  mt-12 bg-[rgba(0,84,165,1)]  h-screen ">

        <div className=" w-[65%] text-justify mt-20 ">
          <div className="flex items-center gap-3">
            <p className="text-2xl tracking-wider">Phoenix Sterling</p>
            <span className="text-green-500">✔</span>
          </div>

          <p>
            Supaklin Employee
          </p>
          <div>
            <p className="mt-4 text-sm w-[75%]">
              “Working at Supaklin has been a rewarding experience. The company's dedication to excellence and sustainable practices has inspired me to grow both professionally and personally.</p>
            <p className="mt-4 text-sm w-[75%]">
              The supportive and close-knit team has made every day enjoyable, and knowing that our efforts contribute to creating healthier and safer spaces for our clients gives me a sense of fulfillment in my work. Supaklin is more than just a workplace; it feels like a family where everyone's contributions are valued, and I am grateful to be a part of it.”
            </p>
          </div>
        </div>
        <div
          className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl mt-20 h-80 w-72 mx-2 px-24"
          style={{
            backgroundImage: "url('/Images/plumber.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>

      </div>

      <div className=" px-24 border  flex items-center mx-auto">
        <div className="flex justify-between flex-col">
          <p className="text-green-500 mt-20 ml-8">
            /Available job positions
          </p>
          <h1 className="text-5xl font-semibold mb-10  ml-8">
            Current Job Openings:
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-x-1">
            {jobData.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                salary={job.salary}
                tags={job.tags}
                description={job.description}
                buttonText={job.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <HowToApply></HowToApply>
      </div>
    </section>
  );
};

export default Careers;
