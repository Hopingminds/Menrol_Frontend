"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdLocationPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Map from "../Map/Map";

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

// interface CheckoutProps {
//   address: string | null;
// }

type Address = {
  location: {
    type: string;
    coordinates: [number, number];
  };
  address: string;
  _id: string;
};



const Checkout: React.FC = () => {
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
    if (!storedUser) {
      router.push("/")
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

  // const handleorder = () => {
  //   router.push("/orderdetails");
  // };

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
      else {
        setServiceRequest(null);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
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
      console.log(data);
      router.push("/AloatedLabour");
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
      <div className="absolute inset-0 flex items-center justify-center bg-white  z-50">
        <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
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
    <div className="min-h-screen bg-gray-50 p-8 px-[7%]">
      <Map />
      <div className=" mx-auto mb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Select Address</h1>
        <MdLocationPin className=" border-r absolute mt-3 ml-2" />
        <select
          value={selectedAddress?._id || ""}
          onChange={handleAddressChange}
          className="w-full py-3 px-7 rounded-lg bg-[#0054A524] "
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
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {serviceRequest.requestedServices.map((requestedService) =>
            requestedService.subcategory.map((subcategory) => (
              <div key={subcategory._id} className="bg-white rounded-xl p-6 shadow-sm mb-6 hover:shadow-blue-200 transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <Image
                      src={subcategory.subcategoryId.image}
                      alt={subcategory.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-52 object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-xl xsm:text-base font-semibold text-gray-800">
                      {subcategory.title.toUpperCase()}
                    </h2>
                    <span className="text-black xsm:text-xs font-semibold">
                      {requestedService.service.category}
                    </span>
                    <p className="text-gray-500 xsm:text-xs">{subcategory.subcategoryId.description}</p>
                    <div className="flex items-center gap-2 ">

                      <span className="text-sm text-gray-500 xsm:text-[10px]">{formatTime(subcategory.scheduledTiming.startTime)}</span>
                      <span className="text-sm text-gray-500 xsm:text-[10px]">To</span>
                      <span className="text-sm text-gray-500 xsm:text-[10px]">{formatTime(subcategory.scheduledTiming.endTime)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-baseline xsm:gap-4 justify-center gap-10">
                        <span className="text-2xl xsm:text-base font-bold">₹{subcategory.selectedAmount} <span className="text-base xsm:text-[10px]">/Per worker</span></span>
                        <span className="text-gray-500 xsm:text-[10px]"><span className="font-semibold text-black xsm:text-[10px] xsm:leading-tight">Required Workers:</span>{subcategory.workersRequirment}</span>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveSubcategory(
                            requestedService.service._id,
                            subcategory.subcategoryId._id
                          )
                        }
                        className=" text-gray-400 transition-all duration-500 hover:scale-110 hover:text-red-500 text-xl font-medium"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className=" bg-white rounded-xl h-full p-6 shadow-sm sticky top-6">
          <h2 className="text-2xl font-bold mb-6 xsm:text-base">Summary</h2>
          <div className="space-y-6">
            {serviceRequest.requestedServices.map((service) =>
              service.subcategory.map((subcategory) => (
                <div key={subcategory._id} className="flex justify-between items-center">
                  <span className="text-gray-600 truncate flex-1 xsm:text-[10px]">{subcategory.title}</span>
                  <div className="flex gap-2 xsm:text-[10px]">
                    <span className="xsm:text-[10px]">{subcategory.selectedAmount} x {subcategory.workersRequirment}</span>
                    <span className=" xsm:text-[10px]">=</span>
                    <span className="text-gray-900 xsm:text-[10px]">₹{subcategory.selectedAmount * subcategory.workersRequirment}</span>
                  </div>
                </div>
              ))
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold xsm:text-[10px]">
                <span>Included All Taxes</span>
                <span>Total</span>
                <span>₹{Math.floor(totalAmount)}</span>
              </div>
            </div>
            <button
              onClick={handleContinueCheckout}
              className="w-full xsm:py-2 bg-[#0054A5] text-white py-3 rounded-lg"
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