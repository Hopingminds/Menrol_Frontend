import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      heading: "STEP 1",
      title: "Request a Quote",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam.",
    },
    {
      heading: "STEP 2",
      title: "Schedule Your Cleaning",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam.",
    },
    {
      heading: "STEP 3",
      title: "Cleaning Team Arrives",
      description:
        "Tellus aliquam faucibus imperdiet eget interdum risus diam.",
    },
  ];

  return (
    <section className="pb-[10vh] p-10 mt-[15vh] bg-gray-100 px-[10%]">
      <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend">
        /HOW IT WORKS
      </p>
      <h2 className="text-5xl font-bold text-start mb-8 text-[rgba(36,35,42,1)] mt-4">
        How to Apply
      </h2>
      <div className="flex mb-12 items-center">
        {steps.map((step, index) => (
          <div key={index} className=" p-6">
            <div className="flex">
              <div className="border w-16 h-5 rounded-xl bg-[rgba(193,244,88,1)] text-[rgba(36,35,42,1)]">
                {step.heading}
              </div>
              <div className="text-[rgba(188,187,201,1)] tracking-wider">
                ---------------------------------
              </div>
            </div>

            <h3 className="text-xl text-[rgba(36,35,42,1)] font-bold mb-4">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-[rgba(94,147,198,1)] w-[95%] h-80 rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
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
