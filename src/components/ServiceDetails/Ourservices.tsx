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
    <div className="gap-4 px-[10%] relative py-10 ">
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

      <h1
        className="text-[#51DC98] uppercase font-bold text-center"
        style={{ wordSpacing: "0.1em" }}
      >
        {"/ Our Service".split("").join(" ")}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[45px] xsm:text-base  font-dm-sans tracking-wide leading-relaxed">
          Elevate Your Cleanliness
        </h1>
        <h1 className="text-[45px] xsm:text-base font-dm-sans tracking-wide leading-relaxed">
          With Supaklin
        </h1>
      </div>

      <div className="grid grid-cols-1 xsm:flex xsm:overflow-x-auto xsm:w-full xsm:gap-4 sm:grid-cols-1 md:grid-cols-3 gap-6 pt-10">
  {services?.map((service) => (
    <div
      key={service?._id}
      className="p-4 shadow-lg rounded-lg xsm:min-w-[80%] sm:w-auto sm:h-auto md:w-full md:h-full"
    >
      <Image
        src={service?.categoryImage}
        alt={service?.category}
        className="w-full h-[30vh] xsm:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg object-cover"
        height={400}
        width={400}
      />
      <div className="text-center px-2 mt-4">
        <h3 className="font-bold text-[#24232A] text-[16px] xsm:text-[14px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-dm-sans tracking-wide leading-relaxed">
          {service?.category}
        </h3>
        <p className="text-xs xsm:text-[12px] sm:text-sm md:text-[16px] lg:text-[18px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed">
          {service?.categoryDescription}
        </p>

        <button
          className="h-[5vh] w-[10vw] xsm:w-[20vw] sm:w-[15vw] md:w-[10vw] lg:w-[6vw] bg-[#24232A] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]"
          onClick={() => handleServiceDetails(service._id)}
        >
          <FaArrowRightLong className="h-6 w-6" />
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default Ourservices;
