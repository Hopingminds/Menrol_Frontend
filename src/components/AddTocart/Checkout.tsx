"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

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

type Address = {
  location: {
    type: string;
    coordinates: [number, number];
  };
  address: string;
  _id: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC<CheckoutProps> = ({ }) => {
  const router = useRouter();
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddresses, setUserAddresses] = useState<Address[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchUserAddress();
      fetchServiceData();
    }
  }, [userInfo]);

  const fetchUserAddress = async () => {
    if (!userInfo) {
      console.error("No userInfo found");
      return;
    }

    try {
      const response = await fetch("https://api.menrol.com/api/v1/getUser", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("check data comming", data);

        if (data.user.SavedAddresses.length !== 0) {
          setUserAddresses(data.user.SavedAddresses)
        } else {
          console.error("No saved address found.");
        }
      } else {
        console.error("Error fetching saved address: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching saved address: ", error);
    }
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const selected = userAddresses?.find((addr) => addr._id === selectedAddressId);
    setSelectedAddress(selected || null); // Store the full address object
  };  

  const fetchServiceData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.menrol.com/api/v1/getUserServiceRequests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data: ApiResponse = await response.json();
      if (data.success) {
        setServiceRequest(data.serviceRequests);
        setTotalAmount(data.totalAmount.totalAmount);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const loadRazorpay = () => {
    if (totalAmount <= 0) {
      toast.error("Invalid amount, cannot proceed with the payment.");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_jmLsdK6FoWIRSe",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Menrol",
        description: "Product description",
        image: "/menrol-logo.png",
        handler: (response: { razorpay_payment_id: string }) => {
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
    if (!selectedAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }  
    try {
      const response = await fetch("https://api.menrol.com/api/v1/purchaseService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify({
          totalPayedAmount: totalAmount,
          location: selectedAddress.location,
          address: selectedAddress.address,
        }),
      });
      const data = await response.json();
      console.log("Checkout successful:", data);
      router.push("/orderdetails");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleRemoveSubcategory = async (serviceId: string, subcategoryId: string) => {
    try {
      const response = await fetch("https://api.menrol.com/api/v1/removeServiceRequest", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service: serviceId, subcategoryId }),
      });
      const data = await response.json();
      if (data.success) {
        fetchServiceData();
        setTotalAmount((prev) => prev - data.removedAmount);
      }
    } catch (error) {
      console.error("Error removing subcategory:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[20rem] text-xl">
        Loading...
      </div>
    );
  }

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
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Select Address</h1>
        <select
          value={selectedAddress?._id || ""}
          onChange={handleAddressChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="" disabled>
            Choose an address
          </option>
          {userAddresses &&
            userAddresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.address}
              </option>
            ))}
        </select>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {serviceRequest.requestedServices.map((requestedService) =>
            requestedService.subcategory.map((subcategory) => (
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
                    <p className="text-gray-600">{subcategory.subcategoryId.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">
                        {requestedService.service.category}
                      </span>
                      <span>{formatTime(subcategory.scheduledTiming.startTime)}</span>
                      <span>To</span>
                      <span>{formatTime(subcategory.scheduledTiming.endTime)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-2xl font-bold">₹{subcategory.selectedAmount}</span>
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
            ))
          )}
        </div>

        <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm sticky top-6">
          <h2 className="text-2xl font-bold mb-6">Summary</h2>
          <div className="space-y-4">
            {serviceRequest.requestedServices.map((service) =>
              service.subcategory.map((subcategory) => (
                <div key={subcategory._id} className="flex justify-between items-center">
                  <span className="text-gray-600 truncate flex-1">{subcategory.title}</span>
                  <span className="text-gray-900">₹{subcategory.selectedAmount}</span>
                </div>
              ))
            )}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
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
  );
};

export default Checkout;