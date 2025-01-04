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
    _id: string;
    description: string;
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

interface CheckoutProps {
  address: string | null; 
}

// Declare Razorpay on the window object to avoid TypeScript errors
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC<CheckoutProps> = ({ address }) => {
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

  // Fetch service data when user info is available
  useEffect(() => {
    if (userInfo) {
      fetchServiceData();
    }
  }, [userInfo]);

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
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  // Add type annotation to the loadRazorpay function
  const loadRazorpay: () => void = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        key: "rzp_test_jmLsdK6FoWIRSe",
        amount: totalAmount * 100, // Amount in paisa
        currency: "INR",
        name: "Menrol",
        description: "Product description",
        image: "https://www.menrol.com/_next/image?url=%2Fmenrol-logo.png&w=256&q=75",
        handler: function (response: any) {
          console.log("Payment successful!", response.razorpay_payment_id);
          handleContinueCheckout();
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0054a5",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  const handleContinueCheckout = async () => {
    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/purchaseService",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token}`,
          },
          body: JSON.stringify({
            // Payload as required
            totalPayedAmount: totalAmount,
            location: {
              type: "Point",
              coordinates: [-74.006, 40.7128],
            },
            address: "sector 75, E-314, Mohali"
          }),
        }
      );
      const data = await response.json();
      console.log("Checkout successful:", data);
    } catch (error) {
      console.log("Error during checkout:", error);
    }
  };

  // Handle removing subcategory from both state and backend
  const handleRemoveSubcategory = async (
    serviceId: string,
    subcategoryId: string
  ) => {
    if (!userInfo) return;

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
      const data = await response.json();
      if (data.success) {
        fetchServiceData();
        setTotalAmount((prevAmount) => prevAmount - data.removedAmount);
      }
    } catch (error) {
      console.error("Error removing subcategory:", error);
    }
  };

  if (!serviceRequest) {
    return (
      <div className="flex items-center justify-center h-[20rem] text-xl">
        Nothing in the{" "}
        <span className="text-3xl font-bold text-red-500 ml-2">Cart</span>
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
                  <div
                    key={subcategory._id}
                    className="bg-white rounded-xl p-6 shadow-sm mb-6"
                  >
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
                          <span className="text-gray-500">
                            {requestedService.service.category}
                          </span>
                          <span>
                            {new Date(subcategory.scheduledTiming.startTime).toLocaleString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                              timeZone: "Asia/Kolkata",
                            })}
                          </span>
                          <span>To</span>
                          <span>
                            {new Date(subcategory.scheduledTiming.endTime).toLocaleString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                              timeZone: "Asia/Kolkata",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <span className="text-2xl font-bold">
                            ₹{subcategory.selectedAmount}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveSubcategory(
                                requestedService.service._id,
                                subcategory.subcategoryId._id
                              )
                            }
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
                    <div
                      key={subcategory._id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600 truncate flex-1">
                        {subcategory.title}
                      </span>
                      <span className="text-gray-900">
                        ₹{subcategory.selectedAmount}
                      </span>
                    </div>
                  ))
                )}

                <div className="text-blue-500 text-sm mt-4">
                  Including all the taxes
                </div>

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
                  onClick={loadRazorpay}
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

export default Checkout;
