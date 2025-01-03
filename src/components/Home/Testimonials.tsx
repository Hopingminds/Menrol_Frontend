"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 3000,     // Slides every 3 seconds
    pauseOnHover: true,      // Pauses on mouse hover
    cssEase: "linear",       // Smooth transition
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };


  const testimonialsData = [
    {
      name: "Simran Kaur",
      image: "/Images/testimonials/pics/person.jpg",
      rating: "⭐⭐⭐⭐",
      service: "Home Service",
      feedback: "Such a great experience! The experts were punctual and did a detailed job throughout my home.",
    },
    {
      name: "Jaspal singh",
      image: "/Images/testimonials/pics/person1.jpg",
      rating: "⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Gurkirat singh",
      image: "/Images/testimonials/pics/person2.jpg",
      rating: "⭐⭐⭐⭐⭐",
      service: "Kitchen Service",
      feedback: "Highly recommend these kitchen services! They left the kitchen spotless and completely odor-free,friendly,and good.",
    },
    {
      name: "Akhil",
      image: "/Images/testimonials/pics/person3.jpg",
      rating: "⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Preeti",
      image: "/Images/testimonials/pics/person4.jpg",
      rating: "⭐⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    {
      name: "Ramdaas",
      image: "/Images/testimonials/pics/person5.jpg",
      rating: "⭐⭐⭐",
      service: "Office Service",
      feedback: "Our office space has never looked like this. The service providers were efficient, friendly, and thorough.",
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="container  mx-auto px-[7%] xsm:px-[2%] my-[10vh]">
      <Slider {...settings} className="gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="px-4 xsm:px-0">
            <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full py-10">
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
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default Testimonials;
