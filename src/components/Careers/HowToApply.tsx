"use client";
import React from 'react';

const HowToApply: React.FC = () => {
    const steps = [
        {
            heading: 'STEP 1',
            title: 'Find Job',
            description: 'Find your ideal job with ease and convenience',
        },
        {
            heading: 'STEP 2',
            title: 'Submit CV',
            description: 'Submit your CV and take the next step.',
        },
        {
            heading: 'STEP 3',
            title: 'Interview',
            description: 'Nail the interview and secure your dream job',
        },
    ];

    return (
        <section className="p-8 bg-gray-100 px-[10%]">
            <p className='text-[rgba(81,220,152,1)] uppercase font-medium text-lg xsm:text-[10px] font-lexend font-dm-sans tracking-wide leading-relaxed'>/ HOW IT WORKS</p>
            <h2 className="text-5xl font-bold text-start mb-8 text-[rgba(36,35,42,1)] mt-4 font-dm-sans tracking-wide leading-relaxed">How to Apply</h2>
            <div className="flex mb-12 xsm:items-start items-center xsm:flex-col sm:items-center sm:justify-between">
        {steps.map((step, index) => (
          <div key={index} className=" p-6 sm:w-[30%] xl:w-full">
            <div className="flex sm:items-center ">
              <div className="border w-20 px-1 h-6  text-center rounded-xl bg-[rgba(193,244,88,1)] text-[rgba(36,35,42,1)] xsm:z-10">
                {step.heading}
              </div>
              <div className="text-[rgba(188,187,201,1)] tracking-wider sm:tracking-tighter xsm:hidden lg:block sm:hidden xl:block">
                ---------------------------------
              </div>
            </div>

            <h3 className="text-xl text-[rgba(36,35,42,1)] font-bold mb-4 xsm:text-base md:text-base lg:text-lg lg:mt-5 sm:text-[12px]">
              {step.title}
            </h3>
            <p className="text-gray-600 xsm:text-sm sm:text-[10px] lg:text-lg md:text-sm sm:-mt-3">{step.description}</p>
          </div>
        ))}
      </div>
            <div className="bg-[rgba(36,35,42,1)] text-white p-8 text-center rounded-xl shadow-md w-[100%]  h-72   ">
                <h3 className="text-4xl font-bold mb-4 mt-8 font-dm-sans font-dm-sans tracking-wide leading-relaxed">Join Our  Dream Team!</h3>
                <p className="text-lg mb-4 mt-4 font-dm-sans font-dm-sans tracking-wide leading-relaxed">Be a part of our expert team and bring cleanliness and joy to every
                    space.</p>
                <button className="bg-[rgba(0,84,165,1)] text-[rgba(255,255,255,1)] font-bold py-2 px-4 rounded-md hover:bg-gray- transition mt-4 ">
                    Join Our Team
                </button>
            </div>
        </section>
    );
};

export default HowToApply;
