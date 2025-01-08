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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  
  const backgroundImages = [
    "/Images/banner.png",
    "/Images/man.jpg",
    "/Images/woman.jpg",
    "/Images/indian.jpg",
    "/Images/reclaimed.jpg"
  ];

  const router = useRouter();

  const handleServiceDetails1 = (serviceId: string) => {
    router.push(`/IndividualServices?data=${encodeURIComponent(serviceId)}`);
  };
  
  const handleServiceDetails2 = (id: string, subId: string) => {
    router.push(`/IndividualServices?data=${id}&subcategory=${subId}`);
  };

  // Fetch Categories and Services
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
          console.error("Invalid API response: Expected 'data.subcategory' to be an array", apiResponse);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch("https://api.menrol.com/api/v1/getServices");
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

    fetchCategories();
    fetchServices();
  }, []);

  // Fetch Subcategories based on selected category
  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://api.menrol.com/api/v1/getCategory?categoryId=${selectedCategory}`)
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
      <div className="relative z-10 flex xsm:flex-col backdrop-blur-sm justify-between items-center h-screen py-10 px-[7%] font-sans">
        <div className="md:w-[50%] xsm:w-full">
          <div className="md:py-10 xsm:py-5 px-7 lg:w-[80%] md:w-[90%] rounded-xl backdrop-blur-2xl border border-white">
            <div className="text-white xsm:w-full md:w-[90%]">
              <h1 className="font-thin font-sans mb-2">Get Skilled Experts Quickly</h1>
              <p className="font-sans font-semibold text-xs tracking-wide leading-relaxed ">
              From construction to finishing, find dependable professionals in just a few taps!
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-5">
              <input
                className="w-full lg:h-[3.6rem] xsm:h-[3rem] md:h-[2rem] rounded-lg px-3"
                type="text"
                placeholder="Name"
              />
              <select
                className="w-full lg:h-[3.6rem] xsm:h-[3rem] md:h-[2rem] rounded-lg px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Choose category</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service?.category}
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

              <div>
                {/* <button
                  className="bg-[#0B5597] rounded-xl p-3 text-sm text-white"
                  onClick={() => handleServiceDetails2(selectedCategory, selectedSubcategory)}
                >
                  Book your service
                </button> */}
                <button
          onClick={() => handleServiceDetails2(selectedCategory, selectedSubcategory)}
          className="group relative inline-flex items-center justify-center px-4  text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 xsm:mt-3  xsm:w-[10rem] xsm:h-[40px] h-[60px] 
          "
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
            <span className="tracking-wider">Book your service</span>
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
            </div>
          </div>
        </div>

        <div className="md:w-[50%] py-2 xsm:w-full">
          <div className="text-white">
            <h1 className="lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold lg:tracking-widest md:text-3xl ">
              Welcome to Menrol Hub Labor Partner!
            </h1>
            <p className="leading-relaxed mt-5 xsm:text-xs ">
              Your
              <Typewriter
                words={[" Trusted Skilled Labor Partner!"]}
                loop={0}
                cursor
                cursorStyle=""
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </p>
          </div>

          <div className="xsm:mt-10 lg:mt-10 xl:mt-10 backdrop-blur-md xsm:p-2 p-4 w-screen rounded-xl border border-white">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={5}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
                1536: { slidesPerView: 8 },
              }}
            >
              {categories.map((category) =>
                category.subcategory.map((sub) => (
                  <SwiperSlide key={sub._id}>
                    <div className="relative">
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="lg:w-[150px] xl:w-[170px] md:w-[170px] xsm:w-[90px] rounded-xl lg:h-[130px] xl:h-[150px] xsm:h-[80px] md:h-[150px] object-cover"
                      />
                      <div
                        onClick={() => handleServiceDetails1("677cfaf7607e149e63802e11")}
                        className="absolute cursor-pointer p-4 bottom-0 left-0 bg-black bg-opacity-50 h-full flex flex-col justify-between items-center rounded-xl text-white xsm:h-[80px] xsm:w-full md:w-[170px] lg:w-[150px] xl:w-[170px]"
                      >
                        <div></div>
                        <h3 className="md:text-xs xsm:text-[5px] xsm:font-thin font-semibold">
                          {sub.title}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;