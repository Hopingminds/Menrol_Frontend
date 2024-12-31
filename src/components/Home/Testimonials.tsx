"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enables padding on the sides
    centerPadding: "30px", // Adjusts the spacing between cards
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };
  

  const testimonialsData = [
    {
      name: "Rahul Rana",
      image: "/Images/AllImages/person3.webp",
      rating: "⭐⭐⭐⭐⭐",
      service: "Home Service",
      feedback: "Such a great experience! The experts were punctual and did a detailed job throughout my home.",
    },
    {
      name: "Prajjwal Sharma",
      image: "/Images/AllImages/person4.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Kammal Prakash",
      image: "/Images/AllImages/person5.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Kitchen Service",
      feedback: "Highly recommend these kitchen services! They left the kitchen spotless and completely odor-free.",
    },
    {
      name: "Prajjwal Sharma",
      image: "/Images/AllImages/person4.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Prajjwal Sharma",
      image: "/Images/AllImages/person4.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Prajjwal Sharma",
      image: "/Images/AllImages/person4.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="px-[10%] h-[100%] py-10">
      <div className="px-4 mt-6">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[70%] font-lexend tracking-wide leading-relaxed">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
  <Slider {...settings} className="gap-24">
    {testimonialsData.map((testimonial, index) => (
      <div key={index} className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-[200px] py-10 mx-auto">
        <div className="flex items-start space-x-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover"
            height={100}
            width={100}
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">
              {testimonial.name}
            </h2>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm">{testimonial.rating}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed">
          {testimonial.service}
        </h3>
        <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed">
          {testimonial.feedback}
        </p>
      </div>
    ))}
  </Slider>
</div>

<style jsx>{`
  .gap-slider .slick-slide {
    padding: 0 15px; /* Add horizontal padding to create a gap */
  }
`}</style>

    </div>
  );
};

export default Testimonials;
