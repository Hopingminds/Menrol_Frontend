"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PricingType {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface Subcategory {
  _id: string;
  title: string;
  description: string | null;
  image: string;
  dailyWageWorker: number;
  hourlyWorker: number;
  contractWorker: number;
  pricing: PricingType[];
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: Subcategory[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const PricingDisplay: React.FC<{ pricing: PricingType[] }> = ({ pricing }) => {
  return (
    <div className="mt-4 space-y-2">
      {pricing.map((price) => (
        <div key={price._id} className="flex justify-between items-center text-sm">
          <span className="capitalize">{price.pricingtype}:</span>
          <span className="font-medium">
            {formatPrice(price.from)} - {formatPrice(price.to)}
          </span>
        </div>
      ))}
    </div>
  );
};

const IndividualServices: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("data");

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No service ID provided");
      setLoading(false);
      return;
    }

    const fetchServiceDetails = async (serviceId: string) => {
      try {
        const response = await fetch(
          `https://api.menrol.com/api/v1/getCategory?categoryId=${serviceId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setService(data.data);
          setError(null);
        } else {
          setError(data.message || "Failed to load service details.");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching service details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#24232A] border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!service || !service.subcategory.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">No services found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Category Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#24232A] mb-4">{service.category}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">{service.categoryDescription}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {service.subcategory.map((item) => (
          <div
            key={item._id}
            className="p-4 shadow-lg rounded-lg transition-transform hover:scale-105 bg-white"
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] rounded-lg object-cover"
                height={400}
                width={400}
                priority={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-[#24232A] text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {item.description || "No description available"}
              </p>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-[#24232A] mb-2">Pricing Options</h4>
                <PricingDisplay pricing={item.pricing} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualServices;