"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation"; 

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

const SubCatogeries = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const router = useRouter(); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.menrol.com/api/v1/getServices");
        const data = await response.json();
        if (data && data.all) {
          setCategories(data.all);

          // Randomly select a category initially
          const randomCategory = data.all[Math.floor(Math.random() * data.all.length)];
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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (_: number, next: number) => {
      const subcategory = selectedCategory?.subcategory[next];
      if (subcategory) {
        const parentCategory = categories.find((cat) =>
          cat.subcategory.some((sub) => sub._id === subcategory._id)
        );
        if (parentCategory) setSelectedCategory(parentCategory);
      }
    },
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: Infinity, settings: { slidesToShow: 5, slidesToScroll: 1 } },
    ],
  };

  const allSubcategories = categories.flatMap((cat) => cat.subcategory);

  // Function to handle navigation
  const handleNavigation = (subId: string) => {
    // router.push(`/services`);  
  };

  return (
    <div className="px-[10%] py-8">
      <h2 className="text-3xl font-bold text-center mb-8">What are you looking for</h2>
      {allSubcategories.length > 0 ? (
        <Slider {...sliderSettings}>
          {allSubcategories.map((sub) => (
            <div
              key={sub._id}
              className="p-4 cursor-pointer"  // Add cursor pointer for better UX
              onClick={() => handleNavigation(sub._id)}  // Navigate on click
            >
              <img
                src={sub.image || "/placeholder.png"}
                alt={sub.title}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
              <h4 className="text-lg font-semibold text-center mt-2">{sub.title}</h4>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Loading subcategories...</p>
      )}
    </div>
  );
};

export default SubCatogeries;
