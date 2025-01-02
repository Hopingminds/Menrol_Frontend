"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Pricing {
  hourly: string;
  daily: string;
  contract: string;
}

interface CardDetails {
  title: string;
  description: string;
  imageUrl: string;
  pricing: Pricing;
}

const AddtoCart: React.FC = () => {
  const router = useRouter();

  // Sample data (replace with props or API fetch)
  const cardDetails: CardDetails = {
    title: "Sanitary Plumber",
    description:
      "A professional skilled in installing, repairing, and maintaining sanitation systems, ensuring safe and hygienic waste disposal.",
    imageUrl: "/plumber-image.jpg", // Replace with the actual image URL
    pricing: {
      hourly: "₹40 - ₹80",
      daily: "₹400 - ₹800",
      contract: "₹1,000 - ₹2,000",
    },
  };

  const handleBackToHome = (): void => {
    router.push("/individualServices"); // Navigate back to the home page
  };

  const handleAddToCart = (): void => {
    // Add to cart functionality (implement as needed)
    alert("Added to cart!");
  };

  return (
    <div className=" justify-center items-center h-screen py-10 px-[7%] ">

        <h1 className="text-4xl text-black font-lexend font-bold p-10">
            My Cart
        </h1>
      <div className=" w-full flex bg-white items-center justify-between  p-3 overflow-hidden">
        {/* Image */}
        <img
          src={cardDetails.imageUrl}
          alt={cardDetails.title}
          className="w-full h-72 object-cover rounded-lg shadow-xl border border-black"
        />

        {/* Card Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{cardDetails.title}</h1>
          <p className="text-gray-600 mb-4">{cardDetails.description}</p>

          {/* Pricing */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Pricing Options</h2>
            <ul className="text-gray-600">
              
              <li>
                <strong>Daily:</strong> {cardDetails.pricing.daily}
              </li>
              
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBackToHome}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Check Out 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtoCart;
