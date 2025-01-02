"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define types for pricing, service request, and API response structure
// interface Pricing {
//   hourly: string;
//   daily: string;
//   contract: string;
// }

interface ScheduledTiming {
  startTime: string;
  endTime: string;
}

interface Subcategory {
  scheduledTiming: ScheduledTiming;
  subcategoryId: {
		image: string;
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
  service: string;
  subcategory: Subcategory[];
  _id: string;
}

interface ServiceRequest {
  _id: string;
  location: {
    type: string;
    coordinates: number[];
  };
  user: string;
  requestedServices: RequestedService[];
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  name?: string;  // Example of a specific dynamic property
  email?: string; // Example of a specific dynamic property
  // Add more known properties as needed
}

const AddtoCart: React.FC = () => {
  const router = useRouter();
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 

  // Fetch data from API with authentication token
  useEffect(() => {
    // Get user information from localStorage
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  // Fetch service data when userInfo is available
  useEffect(() => {
    if (userInfo) {
      const fetchServiceData = async () => {
        try {
          const response = await fetch("https://api.menrol.com/api/v1/getUserServiceRequests", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${userInfo.token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch service data");
          }

          const data: ApiResponse = await response.json();

          if (data.success) {
            const service = data.serviceRequests?.requestedServices[0];

            if (service) {
              setServiceRequest({
                ...data.serviceRequests,
              });
              setTotalAmount(data.totalAmount.totalAmount); // Set total amount
            }
          }
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      };

      fetchServiceData();
    }
  }, [userInfo]); // Re-run the effect when userInfo changes

  const handleBackToHome = (): void => {
    router.push("/"); // Navigate back to the home page
  };

  const handleAddToCart = (): void => {
    // Add to cart functionality (implement as needed)
    alert("Added to cart!");
  };

  // Loading state while data is being fetched
  if (!serviceRequest) {
    return <div>Loading...</div>;
  }

  // Access startTime and endTime from the first subcategory
  const firstSubcategory = serviceRequest.requestedServices[0]?.subcategory[0];
  const startTime = firstSubcategory?.scheduledTiming?.startTime;
  const endTime = firstSubcategory?.scheduledTiming?.endTime;

  return (
    <div className="justify-center items-center h-screen py-10 px-[7%]">
      <h1 className="text-4xl text-black font-lexend font-bold p-10">My Cart</h1>
      <div className="w-full flex bg-white items-center justify-between p-3 overflow-hidden">
        {/* Image */}
        <Image
				src={firstSubcategory?.subcategoryId?.image || "sdfg"}
				alt=""
				width={500}
				height={200}
				className="w-[120%] h-72 object-cover rounded-lg shadow-xl"
				
				/>

        {/* Card Content */}
        <div className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-2">{firstSubcategory?.title || "Service Title"}</h1>
          <p className="text-gray-600 mb-4">{firstSubcategory?.instructions || "No instructions provided"}</p>
           <hr className="w-full"/>
          {/* Pricing */}
          <div className="flex justify-between">
					<div>
					<div className=" pt-4">
            <h2 className="text-xl font-semibold mb-2">Pricing Options</h2>
            <ul className="text-gray-600">
              <li>
                <strong>Daily:</strong> ₹{firstSubcategory?.selectedAmount || 0}
              </li>
            </ul>
          </div>

          {/* Total Amount */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Total Amount</h2>
            <p className="text-gray-600">₹{totalAmount}</p>
          </div>
					</div>

          {/* Order Date and Time */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Scheduled Time</h2>
            <p><strong>Start Time:</strong> {startTime}</p>
            <p><strong>End Time:</strong> {endTime}</p>
          </div>
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
