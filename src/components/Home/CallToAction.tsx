"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing type
      once: true, // Whether animation should happen only once
    });
  }, []);

  // const handleGoContact = () => {
  //   setLoading(true);
  //   router.push("/contactus");
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  const handleGoContact = () => {
    router.push("/contactus");
  };

  return (
    <div className="px-[10%] flex flex-row justify-between mt-[10vh]">
      {/* Text Section */}
      <div
        className="w-[50%]"
        data-aos="fade-right" // AOS animation
      >
        <p className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[100%] font-lexend">
          Time for a Refresh: Book Your Service Today
        </p>
        <p className="mt-2 text-[20px] 2xl:text-[25px] text-[#6B6A7E] xsm:text-[10px]">
          Enjoy a fresh, clean environment by booking our service today and
          feel the difference.
        </p>
        <button
          onClick={handleGoContact}
          className="group relative inline-flex items-center justify-center px-4  text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 xsm:mt-3 lg:mt-20 xsm:w-[10rem] xsm:h-[40px] w-[20rem] h-[60px] 2xl:mt-28
          mb-[5vh]"
        >
          <div className="absolute inset-0 bg-[#0054A5] rounded-xl xsm:w-[130px] xsm:h-[40px] transition-all duration-300 group-hover:scale-110 animate-gradient"></div>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl"></div>
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="glitter-container">
              <div className="glitter"></div>
              <div className="glitter"></div>
              <div className="glitter"></div>
            </div>
          </div>
          {/* <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div> */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="wave"></div>
          </div>
          <span className="relative z-10 flex items-center   gap-2 xsm:gap-0">
            <span className="tracking-wider">Contact us</span>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </button>
      </div>
      {/* Image Section */}
      <div
        className="w-[40%]"
        data-aos="fade-left" // AOS animation
      >
        <Image
          src="/Images/AllImages/BookingImage.png"
          alt="Call to Action"
          className="w-full h-[68vh] xl:h-auto lg:h-auto md:h-auto sm:h-auto xsm:h-auto rounded-lg object-cover pt-0"
          height={100}
          width={500}
        />
      </div>
    </div>
  );
};

export default CallToAction;