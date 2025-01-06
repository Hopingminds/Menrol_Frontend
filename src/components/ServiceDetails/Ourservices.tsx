"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

// Type definitions
interface Pricing {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface Subcategory {
  description: string | null;
  dailyWageWorker: number;
  hourlyWorker: number;
  contractWorker: number;
  title: string;
  image: string;
  _id: string;
  pricing: Pricing[];
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: Subcategory[];
}

interface ApiResponse {
  success: boolean;
  all: Service[];
}

const Ourservices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchServices = async () => {
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
        setError("Failed to load services.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceDetails = (serviceId: string) => {
    router.push(`/IndividualServices?data=${encodeURIComponent(serviceId)}`);
  };

  return (
    <div className="gap-4 px-[10%] relative py-10  ">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin w-16 h-16 border-4 border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-white z-50">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col justify-center font-lexend lg:font-bold items-center">
        <h1 className="text-[45px] xsm:text-base  tracking-wide leading-relaxed">
          Simplify your Tasks
        </h1>
        <h1 className="text-[45px] xsm:text-base tracking-wide leading-relaxed">
          with our services
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-10">
        {services?.map((service) => (
          <div
            key={service._id}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {/* Image Section */}
            <Image
              src={service?.categoryImage}
              alt={service?.category}
              className="w-full h-[40vh] md:h-[45vh] lg:h-[30vh] object-cover"
              height={400}
              width={400}
            />
            {/* Content Section */}
            <div className="p-5">
              <h3 className="font-bold text-xl text-[#0054A5] mb-2 font-lexend tracking-wide cursor-pointer"
                onClick={() => handleServiceDetails(service._id)}>
                {service?.category}
              </h3>
              <p className="text-gray-600 text-sm font-dm-sans tracking-wide leading-relaxed">
                {service?.categoryDescription}
              </p>
            </div>
            {/* Button Section */}
            <div className="absolute top-4 right-4">
              <button
                className="h-10 w-10 bg-[#0054A5] text-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-700"
                onClick={() => handleServiceDetails(service._id)}
              >
                <FaArrowRightLong className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Ourservices;
