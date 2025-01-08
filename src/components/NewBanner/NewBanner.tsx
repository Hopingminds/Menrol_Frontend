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

  const backgroundImages = [
    "/Images/banner.png",
    "/Images/man.jpg",
    "/Images/woman.jpg",
    "/Images/indian.jpg",
    "/Images/reclaimed.jpg",
  ];

  const router = useRouter();

  const handleServiceDetails1 = (serviceId: string) => {
    router.push(`/IndividualServices?data=${encodeURIComponent(serviceId)}`);
  };

  const handleServiceDetails2 = (id: string, subId: string) => {
    router.push(`/IndividualServices?data=${id}&subcategory=${subId}`);
  };
  console.log(error)

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

    fetchServices1();
    fetchCategories();
  }, []);

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
      <div className="relative z-10 flex xsm:flex-col justify-center gap-0 bg-black bg-opacity-55 items-center h-screen py-10 px-[7%] font-sans">
        <div className="md:w-[50%] xsm:w-full">
          <div className="md:py-10 xsm:py-5 px-7 lg:w-[90%] md:w-[90%] rounded-xl backdrop-blur-2xl border border-white">
            <div className="text-white xsm:w-full md:w-[90%]">
              <h1 className="font-thin font-sans mb-2">Get Skilled Experts Quickly</h1>
              <p className="font-sans font-semibold text-xs tracking-wide leading-relaxed">
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
              {/* <button
                onClick={() => handleServiceDetails2(selectedCategory, selectedSubcategory)}
                className="group relative inline-flex items-center justify-center px-4 text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 xsm:mt-3 xsm:w-[10rem] xsm:h-[40px] h-[60px]"
              >
                Book your service
              </button> */}
              <button
  onClick={() => {
    if (!selectedCategory || !selectedSubcategory) {
      toast.warning("please select the services")
      return;
    }
    handleServiceDetails2(selectedCategory, selectedSubcategory);
  }}
  className="group relative inline-flex items-center justify-center px-2 py-1 text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-[40%] h-[60px]"
>
  <div
    className="absolute inset-0 bg-[#0054A5] rounded-xl transition-all duration-300 group-hover:scale-110 animate-gradient pulse-animation"
  />
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
    <span className="">Book your service</span>
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
                        className="absolute cursor-pointer p-4 bottom-0 left-0 bg-black bg-opacity-50 h-full flex flex-col justify-end items-center rounded-xl text-white xsm:h-[80px] xsm:w-full md:w-[170px] lg:w-[150px] xl:w-[170px]"
                      >
                        <h3 className="md:text-xs xsm:text-[5px] xsm:font-thin font-semibold ">
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
