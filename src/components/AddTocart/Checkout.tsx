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
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressRefresh, setAddressRefresh] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);

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
      console.log("Fetching user address with token:", userInfo.token);
      fetchUserAddress();
      fetchServiceData();
    }
  }, [userInfo, addressRefresh]);

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

      const responseClone = response.clone();
      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("User data structure:", Object.keys(data));
        console.log("User data structure:", Object.keys(data.user || {}));

        if (data.user && data.user.SavedAddresses) {
          console.log("SavedAddresses count:", data.user.SavedAddresses.length);
          setUserAddresses(data.user.SavedAddresses);
        } else {
          console.warn("No SavedAddresses found in user data", data);
          setUserAddresses([]);
        }
      } else {
        const errorText = await responseClone.text();
        console.error("Error fetching saved address. Status:", response.status, "Text:", errorText);
      }
    } catch (error) {
      console.error("Exception fetching saved address:", error);
    }
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const selected = userAddresses?.find((addr) => addr._id === selectedAddressId);
    setSelectedAddress(selected || null);
  };

  console.log(handleAddressChange);

  // Handler for when an address is saved from the map
  const handleAddressSave = async (address: string, location: Address['location']) => {
    if (!userInfo?.token) {
      console.error("No user token found");
      return;
    }

    try {
      const response = await fetch("https://api.menrol.com/api/v1/addUserAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          coordinates: location.coordinates,
          address: address
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Address saved successfully!");
        // Trigger a refresh of the addresses
        setAddressRefresh(prev => prev + 1);
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("An error occurred while saving address");
    }
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
      toast.error("Please select a saved address before proceeding.");
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

      if (data.success) {
        toast.success("Order placed successfully!");
        router.push("/AloatedLabour");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout");
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
      <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
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
      {/* Map for Address Selection */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search & Save Address</h1>
        <Map
          onAddressSave={handleAddressSave}
          userToken={userInfo?.token}
        />
      </div>

      {/* Select Saved Address */}
      <div className="mx-auto mb-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Select Saved Address</h1>
        <div className="relative">
          <MdLocationPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Select a saved address"
            value={selectedAddress?.address || ""}
            readOnly
            className="w-full py-3 pl-7 pr-3 rounded-lg bg-[#0054A524] cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          />

          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <p className="p-2 text-sm font-medium text-gray-700 bg-gray-100">Saved Addresses</p>
              {userAddresses && userAddresses.length > 0 ? (
                userAddresses.map((saved, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedAddress(saved);
                      setShowDropdown(false);
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                  >
                    {saved.address}
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">No saved addresses found</div>
              )}
            </div>
          )}
        </div>

        {selectedAddress && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium text-blue-800">Selected saved address:</p>
            <p className="text-gray-700">{selectedAddress.address}</p>
          </div>
        )}
      </div>

      {/* Cart Items and Checkout */}
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() =>
                          handleRemoveSubcategory(
                            requestedService.service._id,
                            subcategory.subcategoryId._id
                          )
                        }
                        className="text-gray-400 transition-all duration-500 hover:scale-110 hover:text-red-500 text-xl font-medium"
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

        <div className="bg-white rounded-xl h-full p-6 shadow-sm sticky top-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          </div>

          <button
            onClick={handleContinueCheckout}
            disabled={!selectedAddress}
            className={`w-full xsm:py-2 text-white py-3 rounded-lg transition-all ${selectedAddress
              ? "bg-[#0054A5] hover:bg-[#004080]"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {selectedAddress ? "Checkout" : "Select an Address First"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;