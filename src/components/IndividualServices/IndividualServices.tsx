"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";


interface Subcategory {
  _id: string;
  title: string;
  description: string | null;
  image: string;
}

interface Service {
  _id: string;
  category: string;
  subcategory: Subcategory[];
  description: string;
  categoryImage: string;
}

const IndividualServices: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("data");

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchServiceDetails = async (id: string) => {
      try {
        const response = await fetch(
          `https://api.menrol.com/api/v1/getCategory?categoryId=${id}`
        );
        const data = await response.json();

        if (data.success) {
          setService(data.data); // Set the service data
          setError(null);
        } else {
          setError("Failed to load service details.");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("An error occurred while fetching service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails(id);
  }, [id]);

  if (loading) {
    return <p>Loading service details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {service?.subcategory.map((service) => (
          <div key={service?._id} className="p-4 shadow-lg rounded-lg">
            <Image
              src={service?.image}
              alt={service?.title}
              className="w-full h-[40vh] sm:h-[45vh] md:h-[55vh] rounded-lg object-cover"
              height={400}
              width={400}
            />
            <div className="text-center px-2 mt-4">
              <h3 className="font-bold text-[#24232A] text-[16px] sm:text-[18px] md:text-[24px] font-dm-sans tracking-wide leading-relaxed">
                {service?.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-[16px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed">
                {service?.description}
              </p>
              <button className="h-[5vh] w-[10vw] md:w-[4vw] bg-[rgb(36,35,42)] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]">
                <FaArrowRightLong className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualServices;
