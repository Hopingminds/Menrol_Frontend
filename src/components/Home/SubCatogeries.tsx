"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Pricing {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface SubCategory {
  _id: string;
  title: string;
  image: string;
  description: string;
  hourlyWorker: number;
  dailyWageWorker: number;
  contractWorker: number;
  pricing: Pricing[];
}

interface Category {
  _id: string;
  category: string;
  subcategory: SubCategory[];
}

const SubCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data = await response.json();
        if (data && data.all) {
          setCategories(data.all);

          // Randomly select a category initially
          const randomCategory =
            data.all[Math.floor(Math.random() * data.all.length)];
          setSelectedCategory(randomCategory);
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const HandleGoServices = ()=>{
    router.push("/ServiceDetails")
  }

  const allSubcategories = categories.flatMap((cat) => cat.subcategory);

  const handleNavigation = (subId: string) => {
    // Uncomment and update navigation logic
    // router.push(`/services/${subId}`);
  };

  return (
    <div className="px-[10%] py-8">
      <h2 className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[100%] font-lexend">
        What are you looking for?
      </h2>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {allSubcategories.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Stop autoplay on hover
          }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {allSubcategories.map((sub) => (
            <SwiperSlide key={sub._id}>
              <div
                className="p-4 cursor-pointer"
                onClick={() => handleNavigation(sub._id)}
              >
                <Image
                  src={sub.image || "/placeholder.png"}
                  alt={sub.title}
                  className="w-full h-48 object-cover rounded-md shadow-md hover:scale-105"
                  onClick={HandleGoServices}
                  width={200}
                  height={200}

                />
                <h4 className="text-lg font-semibold text-center mt-2">
                  {sub.title}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Loading subcategories...</p>
      )}
    </div>
  );
};

export default SubCategories;
