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


      <div className="flex flex-col justify-center font-lexend lg:font-bold items-center">
        <h1 className="text-[45px] xsm:text-base  tracking-wide leading-relaxed">
          Simplify your Tasks
        </h1>
        <h1 className="text-[45px] xsm:text-base tracking-wide leading-relaxed">
          with our services
        </h1>
      </div>

      <div className="grid  grid-cols-1 xsm:flex xsm:overflow-x-auto xsm:w-full xsm:gap-4 sm:flex sm:w-full sm:overflow-x-auto md:grid-cols-2 md:grid lg:grid xl:grid xl:grid-cols-3 gap-6 pt-10">
        {services?.map((service) => (
         <div className="min-w-[75vw] xsm:min-w-[5rem] sm:min-w-0 relative shadow-lg">
                       <Image
                         src={service?.categoryImage}
                         alt={service?.category}
                         className="w-full h-[40vh] sm:h-[45vh] md:h-[55vh] rounded-lg object-cover"
                         height={400}
                         width={400}
                       />
                       {/* Arrow button to navigate to service details */}
                       <div className="absolute top-4 right-4 md:top-8 md:right-6 ">
                         <button
                           className="h-[6vh] w-[12vw] sm:w-[10vw] md:w-[70px] lg:w-[60px] bg-[#24232A] rounded-full shadow-md text-white flex items-center justify-center hover:bg-[#1F1E24]"
                           onClick={() => handleServiceDetails(service._id)}
                         >
                           <FaArrowRightLong className="h-4 w-4 sm:h-6 sm:w-6" />
                         </button>
                       </div>
                       {/* Service description */}
                       <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] xsm:w-[80%] xsm:h-[50%] sm:h-[60%] h-[35%] lg:h-[40%] bg-white flex items-center justify-center rounded-lg">
                         <div className="text-center px-5 xsm:px-2">
                           <h3 className="font-bold text-[#24232A] xl:text-[16px] text-[16px] xsm:text-[10px] sm:text-[15px] lg:text-[15px]  md:text-[24px] font-dm-sans  tracking-wide leading-relaxed">
                             {service?.category}
                           </h3>
                           <p className="text-xs sm:text-[7px] xsm:text-[5px] xl:tracking-wide xl:text-[12px]  xsm:leading-none lg:leading-none lg:tracking-normal lg:text-[7px] md:text-[12px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed">
                             {service?.categoryDescription}
                           </p>
                         </div>
                       </div>
                     </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservices;
