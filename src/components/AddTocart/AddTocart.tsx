// "use client";

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
    _id:string;
    description:string;
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
    _id: string;
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

  // Fetch user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  const fetchServiceData = async () => {
    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/getUserServiceRequests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: ApiResponse = await response.json();
      if (data.success) {
        setServiceRequest(data.serviceRequests);
        setTotalAmount(data.totalAmount.totalAmount);
        // Save the data to localStorage
        // localStorage.setItem('serviceRequest', JSON.stringify(data.serviceRequests));
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };
  // Fetch service requests when user info is set
  useEffect(() => {
    if (userInfo) {
      fetchServiceData();
    }
  }, [userInfo]);

  // Handle navigating back to home
  const handleBackToHome = (): void => {
    router.push("/");
  };

  // Handle removing subcategory from both state and backend
  const handleRemoveSubcategory = async (serviceId: string, subcategoryId: string) => {
    if (!userInfo) return;

    console.log("Attempting to remove subcategory:", { serviceId, subcategoryId });

    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/removeServiceRequest",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: serviceId,
            subcategoryId: subcategoryId,
          }),
        }
      );

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.error("Failed to fetch:", errorData);
      //   throw new Error(errorData.message || "Failed to remove subcategory");
      // }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        // Remove subcategory from local state immediately
        // setServiceRequest((prevRequest) => {
        //   if (!prevRequest) return null;

        //   const updatedServices = prevRequest.requestedServices.map((service) => {
        //     // Filter out the removed subcategory
        //     const updatedSubcategory = service.subcategory.filter(
        //       (subcat) => subcat._id !== subcategoryId
        //     );
        //     return {
        //       ...service,
        //       subcategory: updatedSubcategory,
        //     };
        //   });

        //   return {
        //     ...prevRequest,
        //     requestedServices: updatedServices,
        //   };
        // });
        fetchServiceData();

        // Update the total amount immediately
        setTotalAmount((prevAmount) => prevAmount - data.removedAmount);

        // Persist the updated serviceRequest to localStorage
        // localStorage.setItem('serviceRequest', JSON.stringify(serviceRequest));
      }
    } catch (error) {
      console.error("Error removing subcategory:", error);
    }
  };

  // Handle adding to cart (for now it shows an alert)
  const handleAddToCart = (): void => {
    alert("Added to cart!");
  };

  if (!serviceRequest) {
    return (
      <div className="flex items-center justify-center h-[20rem] text-xl">
        Nothing in the <span className="text-3xl font-bold text-red-500 ml-2">Cart</span> 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {serviceRequest.requestedServices.map((requestedService) => (
            <div key={requestedService._id}>
              {requestedService.subcategory.map((subcategory) => (
                <div key={subcategory._id} className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <Image
                        src={subcategory.subcategoryId.image}
                        alt={subcategory.title}
                        width={400}
                        height={200}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {subcategory.title}
                      </h2>
                      <p className="text-gray-600">
                        {subcategory.subcategoryId.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{requestedService.service.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
  <span>
    {new Date(subcategory.scheduledTiming.startTime).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })}
  </span>
  To
  <span>
    {new Date(subcategory.scheduledTiming.endTime).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })}
  </span>
</div>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-2xl font-bold">₹{subcategory.selectedAmount}</span>
                        <button
                          onClick={() => handleRemoveSubcategory(requestedService.service._id, subcategory.subcategoryId._id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Original Price</h3>
              {serviceRequest.requestedServices.map((service) =>
                service.subcategory.map((subcategory) => (
                  <div key={subcategory._id} className="flex justify-between items-center">
                    <span className="text-gray-600 truncate flex-1">{subcategory.title}</span>
                    <span className="text-gray-900">₹{subcategory.selectedAmount}</span>
                  </div>
                ))
              )}
              
              <div className="text-blue-500 text-sm mt-4">Including all the taxes</div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                By completing your purchase you agree to terms of services
              </p>

              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddtoCart;