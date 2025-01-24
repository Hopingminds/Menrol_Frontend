"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface SubCategory {
  _id: string;
  title: string;
  image: string;
}

interface Category {
  _id: string;
  category: string;
  subcategory: SubCategory[];
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: SubCategory[];
}

interface ApiResponse {
  success: boolean;
  all: Service[];
}

const NewBanner = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [name, setname] = useState<string>("");

  const backgroundImages = [
    "/Images/banner.png",
    "/Images/man.jpg",
    "/Images/woman.jpg",
    "/Images/indian.jpg",
    "/Images/reclaimed.jpg",
  ];

  const categorySettings = {
    dots: false,
    arrows: false, // Hides side navigation buttons
    navigator: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 6 } },
      { breakpoint: 1280, settings: { slidesToShow: 8 } },
    ],
  };

  const router = useRouter();

  const handleServiceDetails1 = (serviceId: string) => {
    router.push(`/IndividualServices?data=${encodeURIComponent(serviceId)}`);
  };

  const handleServiceDetails2 = (id: string, subId: string) => {
    const query = `subcategory=${id}&service=${subId}`;
    router.push(`/AddDetail?${query}`);
  };

  console.log(error);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://api.menrol.com/api/v1/getCategory?categoryId=677cfaf7607e149e63802e11`
        );
        const apiResponse = await response.json();

        if (apiResponse?.success && apiResponse.data?.subcategory) {
          setCategories([{ ...apiResponse.data }]);
        } else {
          console.error(
            "Invalid API response: Expected 'data.subcategory' to be an array",
            apiResponse
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchServices1 = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data: ApiResponse = await response.json();

        if (data.success) {
          setServices(data.all);
        } else {
          setError("Failed to load services.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services.");
      }
    };

    fetchServices1();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `https://api.menrol.com/api/v1/getCategory?categoryId=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data?.subcategory) {
            setSubcategories(data.data.subcategory);
          } else {
            setSubcategories([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
          setSubcategories([]);
        });
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Swiper */}
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {backgroundImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex xsm:flex-col justify-center gap-0 bg-black bg-opacity-55 items-center h-screen  px-[7%] font-sans">
        <div className="md:w-[50%] xsm:w-full">
          <div className="md:py-10 xsm:py-5 px-7 lg:w-[90%] md:w-[90%] rounded-xl backdrop-blur-2xl border border-white">
            <div className="text-white xsm:w-full md:w-[90%]">
              <h1 className="font-thin font-sans mb-2 2xl:font-bold">
                Get Skilled Experts Quickly
              </h1>
              <p className="font-sans font-semibold text-xs tracking-wide leading-relaxed">
                From construction to finishing, find dependable professionals in
                just a few taps!
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-5">
              <input
                className="w-full lg:h-[3.6rem] xsm:h-[3rem] md:h-[2rem] rounded-lg px-3"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <select
                className="w-full lg:h-[3.6rem] xsm:h-[3rem] md:h-[2rem] rounded-lg px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Choose category</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.category}
                  </option>
                ))}
              </select>
              <select
                className="w-full lg:h-[3.6rem] xsm:h-[3rem] md:h-[2rem] rounded-lg px-3"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Choose subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.title}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (!selectedCategory || !selectedSubcategory) {
                    toast.warning("please select the services");
                    return;
                  }
                  if (!name) {
                    toast.warning("Please enter your name");
                    return;
                  }
                  handleServiceDetails2(selectedSubcategory, selectedCategory);
                }}
                className="group relative inline-flex items-center justify-center px-2 py-1 text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 md:w-[60%] lg:w-[50%] xsm:h-full md:h-[40px] lg:h-[60px]"
              >
                <div className="absolute inset-0 bg-[#0054A5] rounded-xl transition-all duration-300 group-hover:scale-110 animate-gradient pulse-animation" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl pulse-animation" />
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="glitter-container">
                    <div className="glitter" />
                    <div className="glitter" />
                    <div className="glitter" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="wave pulse-animation" />
                </div>
                <span className="relative z-10 flex items-center">
                  <span className=" xsm:text-[10px] lg:text-sm md:text-xs">
                    Book your service
                  </span>
                </span>
              </button>

              <style jsx>{`
                @keyframes pulse {
                  0% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.1);
                  }
                  100% {
                    transform: scale(1);
                  }
                }

                .pulse-animation {
                  animation: pulse 2s infinite ease-in-out;
                }
              `}</style>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] py-2 xsm:w-full">
          <div className="text-white">
            <h1 className="lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold lg:tracking-widest md:text-3xl">
              Welcome to Menrol Hub Labor Partner!
            </h1>
            <p className="leading-relaxed mt-5 xsm:text-xs">
              Your{" "}
              <Typewriter
                words={[" Trusted Skilled Labor Partner!"]}
                loop={0}
                cursor
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </p>
          </div>
          <div className="xsm:mt-10 lg:mt-10 md:mt-10 xl:mt-10 backdrop-blur-md xsm:p-2 p-4 w-screen rounded-xl border border-white">
            <Slider {...categorySettings}>
              {categories.map((category) =>
                category.subcategory.map((sub) => (
                  <div key={sub._id} className="">
                    <div className="relative">
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="lg:w-[120px] xl:w-[140px] 2xl:w-[170px] md:w-[110px] xsm:w-[90px] rounded-xl lg:h-[130px] xl:h-[150px] xsm:h-[80px] md:h-[120px] object-cover"
                      />
                      <div
                        onClick={() =>
                          handleServiceDetails1("677cfaf7607e149e63802e11")
                        }
                        className="absolute cursor-pointer p-4 bottom-0 left-0 bg-black bg-opacity-50 h-full flex flex-col justify-end items-center rounded-xl text-white xsm:h-[80px] xsm:w-[90px] 2xl:w-[170px] md:w-[110px] lg:w-[120px] xl:w-[140px]"
                      >
                        <h3 className="md:text-[7px] 2xl:text-xs lg:text-[5px] xl:text-[8px] xsm:text-[5px] xsm:font-thin font-semibold">
                          {sub.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
