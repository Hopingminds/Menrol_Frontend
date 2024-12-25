import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      heading: "STEP 1",
      title: "Request a Quote",
      description:
        "One step closer to your solution—request a service quote and receive timely responses.",
    },
    {
      heading: "STEP 2",
      title: "Schedule for service",
      description:
        "Choose your desired time slot and schedule professional services with ease.",
    },
    {
      heading: "STEP 3",
      title: "Service Team Arrives",
      description:
        "Our team arrives as scheduled, ensuring your service experience is smooth and stress-free.",
    },
  ];

  return (
    <section className="pb-[10vh] p-10 mt-[15vh] bg-gray-100 px-[10%]">
      <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend xsm:text-[10px]">
        /HOW IT WORKS
      </p>
      <h2 className="text-5xl font-bold text-start mb-8 text-[rgba(36,35,42,1)] mt-4 xsm:text-base">
        How to Apply
      </h2>
      <div className="flex mb-12 items-center xsm:flex-col">
        {steps.map((step, index) => (
          <div key={index} className=" p-6 sm:w-[30%]">
            <div className="flex ">
              <div className="border w-20 px-1 h-6 text-center rounded-xl bg-[rgba(193,244,88,1)] text-[rgba(36,35,42,1)] xsm:z-10">
                {step.heading}
              </div>
              <div className="text-[rgba(188,187,201,1)] tracking-wider sm:tracking-tighter xsm:hidden sm:hidden">
                ---------------------------------
              </div>
            </div>

            <h3 className="text-xl text-[rgba(36,35,42,1)] font-bold mb-4 xsm:text-base sm:text-sm">
              {step.title}
            </h3>
            <p className="text-gray-600 xsm:text-sm sm:text-xs">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-[rgba(94,147,198,1)] w-[95%] h-80 rounded-2xl xsm:h-[26vh] shadow-md flex items-center justify-center text-center relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full xsm:w-full  h-full object-cover"
          src="/Images/solar.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>
    </section>
  );
};

export default HowItWorks;
