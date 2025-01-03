"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ScheduledTiming {
  startTime: string;
  endTime: string;
}

interface Subcategory {
  scheduledTiming: ScheduledTiming;
  subcategoryId: {
    image: string;
    title: string;
  };
  title: string;
  requestType: string;
  selectedAmount: number;
  workersRequirment: number;
  status: string;
  instructions: string | null;
  instructionsImages: string[];
  _id: string;
}

interface RequestedService {
  service: {
    category: string;
    categoryImage: string;
    categoryDescription: string;
  };
  subcategory: Subcategory[];
  _id: string;
}

interface ServiceRequest {
  _id: string;
  requestedServices: RequestedService[];
}

interface ApiResponse {
  success: boolean;
  serviceRequests: ServiceRequest;
  totalAmount: {
    success: boolean;
    totalAmount: number;
  };
}

interface UserInfo {
  token: string;
}

const AddtoCart: React.FC = () => {
  const router = useRouter();
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetchServiceData = async () => {
        try {
          const response = await fetch("https://api.menrol.com/api/v1/getUserServiceRequests", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Failed to fetch service data");

          const data: ApiResponse = await response.json();
          if (data.success) {
            setServiceRequest(data.serviceRequests);
            setTotalAmount(data.totalAmount.totalAmount);
          }
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      };

      fetchServiceData();
    }
  }, [userInfo]);

  const handleBackToHome = (): void => {
    router.push("/");
  };

  const handleAddToCart = (): void => {
    alert("Added to cart!");
  };

  if (!serviceRequest) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-[7%] ">
      <h1 className="text-4xl font-extrabold text-gray-900 font-lexend text-center mb-10">My Cart</h1>
      <div className="space-y-8  mx-auto">
        {serviceRequest.requestedServices.map((requestedService) => (
          <div
            key={requestedService._id}
            className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {requestedService.service.category}
            </h2>
            {requestedService.subcategory.map((subcategory) => (
              <div
                key={subcategory._id}
                className="flex flex-col lg:flex-row items-start bg-gray-100 rounded-lg p-4 mb-6"
              >
                <Image
                  src={subcategory.subcategoryId.image}
                  alt={subcategory.title}
                  width={200}
                  height={150}
                  className="rounded-lg shadow-sm object-cover mb-4 lg:mb-0 lg:mr-6"
                />
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">{subcategory.title}</h3>
                  <p className="text-gray-600">{subcategory.instructions || "No instructions provided."}</p>
                  <p className="text-gray-700"> <strong>Request Type:</strong> {subcategory.requestType}</p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> ₹{subcategory.selectedAmount}
                  </p>
                  <p className="text-gray-700">
  <strong>Scheduled:</strong> 
  {new Date(subcategory.scheduledTiming.startTime).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })} - 
  {new Date(subcategory.scheduledTiming.endTime).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })}
</p>

                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">Total Amount</h2>
          <p className="text-gray-700 text-lg mt-2">₹{totalAmount}</p>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBackToHome}
              className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
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
