"use client"
import React, { useEffect, useState } from 'react';
// import AllotedLabourMap from '../AlloatedLabourMap/AlloatedLabourMap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';

const AllotedLabourMap = dynamic(() => import('../AlloatedLabourMap/AlloatedLabourMap'), {
  ssr: false, // Disable SSR for this component
});


// Existing interfaces
interface Location {
  type: string;
  coordinates: number[];
}

interface Payment {
  totalamount: number;
  paidAmount: number;
  dueAmount: number;
  paymentDate: string;
  paymentType: string;
  paymentstatus: string;
  paymentmethod: string;
}

interface Service {
  _id: string;
  category: string;
  categoryImage: string;
  categoryDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Subcategory {
  _id: string;
  scheduledTiming: {
    startTime: string;
    endTime: string;
  };
  requestOperation: {
    startOtp: number;
    endOtp: number;
  };
  subcategoryId: string;
  title: string;
  requestType: string;
  selectedAmount: number;
  workersRequirment: number;
  status: string;
  instructions: string;
  instructionsImages: string[];
  viewers: [];
  serviceProviders: [];
}

interface ServiceRequest {
  service: Service;
  subcategory: Subcategory[];
  _id: string;
}

interface Order {
  location: Location;
  payment: Payment;
  _id: string;
  user: string;
  serviceRequest: ServiceRequest[];
  orderStatus: string;
  orderRaised: boolean;
  address: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface UserToken {
  exp: number,
  iat: number,
  phone: number,
  role: string,
  userID: string,
}

interface ApiResponse {
  success: boolean;
  order: Order;
}

// New interfaces for eligible service providers
interface PricingType {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface SubcategorySkill {
  subcategory: string;
  pricing: PricingType[];
  _id: string;
}

interface SkillCategory {
  category: string;
  subcategories: SubcategorySkill[];
  _id: string;
}

interface User {
  _id: string;
  name: string;
  isOnline: boolean;
  profileImage: string;
}

interface ServiceProvider {
  _id: string;
  user: User;
  availability: string;
  instantAvailability: boolean;
  skills: SkillCategory[];
  // workHistory: any[];
  // feedback: any[];
  experience?: number;
}

interface SubcategoryDetail {
  subcategoryId: {
    title: string;
    description: string;
    pricing: PricingType[];
    dailyWageWorker: number;
    hourlyWorker: number;
    contractWorker: number;
    noOfBookings: number;
    image: string;
    appImage: string;
    _id: string;
    createdAt: string;
  };
  workersRequirment: number;
  eligibleProviders: ServiceProvider[];
}

interface EligibleServiceData {
  service: Service;
  subcategories: SubcategoryDetail[];
}

interface EligibleServiceResponse {
  success: boolean;
  results: EligibleServiceData[];
}

// Interface for selected providers
interface SelectedProviders {
  [serviceId: string]: {
    [subcategoryId: string]: string;  // providerId
  };
}

const Labour = () => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [eligibleServiceData, setEligibleServiceData] = useState<EligibleServiceData[]>([]);
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProviders, setSelectedProviders] = useState<SelectedProviders>({});
  const [isAccepting, setIsAccepting] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   setMounted(true);

  //   // Move localStorage access here, after the component has mounted
  //   // This ensures it only runs on the client side
  //   if (typeof window !== 'undefined') {
  //     const storedUser = localStorage.getItem("user-info");
  //     if (storedUser) {
  //       try {
  //         const parsedUser = JSON.parse(storedUser);
  //         setUserInfo(parsedUser);
  //       } catch (error) {
  //         console.error("Error parsing user info from localStorage:", error);
  //       }
  //     }
  //   }
  // }, []);
  useEffect(() => {
    try {
      setMounted(true);

      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserInfo(parsedUser);
        }
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, []);


  useEffect(() => {
    if (!mounted || !userInfo || !userInfo.token) {
      console.warn('User info or token is missing, skipping fetch.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.menrol.com/api/v1/getUserRasiedOrders', {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        const data: ApiResponse = await response.json();

        if (data.success) {
          setOrderData(data.order);
        } else {
          router.push('/orderdetails');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();
  }, [userInfo, mounted, router]);

  useEffect(() => {
    if (!mounted || !userInfo || !userInfo.token) {
      console.warn('User info or token is missing, skipping fetch.');
      return;
    }

    const fetchServiceProviders = async () => {
      try {
        const response = await fetch('https://api.menrol.com/api/v1/fetchEligibleServiceProviders', {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        const data: EligibleServiceResponse = await response.json();

        if (data.success && data.results) {
          setEligibleServiceData(data.results);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching eligible service providers:', error);
        setIsLoading(false);
      }
    };

    fetchServiceProviders();
  }, [userInfo, mounted]);

  useEffect(() => {
    if (!mounted || !userInfo || !userInfo.token) {
      console.warn('User info or token is missing, skipping socket connection.');
      return;
    }

    const user: UserToken = jwtDecode(userInfo.token);

    if (!user || !user.userID) {
      console.warn('User ID not found in token, skipping socket connection.');
      return;
    }

    // Establish WebSocket connection
    const socket = io('https://api.menrol.com', {
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 5000,
    });

    // Subscribe to user-specific updates
    socket.emit('subscribeToUserUpdates', user.userID);

    // Listen for updates
    socket.on('userRaisedOrderUpdate', (updatedOrder) => {
      if (updatedOrder.success && updatedOrder.order) {
        setOrderData(updatedOrder.order);
      } else {
        router.push('/orderdetails');
      }
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnection attempt #${attempt}...`);
    });

    socket.on('reconnect_failed', () => {
      console.error('WebSocket reconnection failed. Please check the server.');
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo, mounted, router]);

  // if (!mounted) return null;

  // Handle Accept button click
  const handleAccept = async (
    orderId: string,
    serviceId: string,
    subcategoryId: string,
    providerId: string
  ) => {
    if (!userInfo?.token) {
      toast.error("You need to be logged in to accept a provider");
      return;
    }

    // Update selected providers state
    setSelectedProviders(prev => {
      const newSelected = { ...prev };

      if (!newSelected[serviceId]) {
        newSelected[serviceId] = {};
      }

      newSelected[serviceId][subcategoryId] = providerId;
      return newSelected;
    });

    // API call to send order request to provider
    try {
      setIsAccepting(true);

      const payload = {
        orderId: orderId,
        serviceId: serviceId,
        subcategoryId: subcategoryId,
        providerId: providerId
      };

      const response = await fetch(
        "https://api.menrol.com/api/v1/sendOrderRequestToProvider",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Request sent to provider successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send request to provider");

        // Reset selection if API call fails
        setSelectedProviders(prev => {
          const newSelected = { ...prev };
          if (newSelected[serviceId] && newSelected[serviceId][subcategoryId]) {
            delete newSelected[serviceId][subcategoryId];
          }
          return newSelected;
        });
      }
    } catch (error) {
      toast.error("Error sending request to provider");
      console.error(error);

      // Reset selection if API call fails
      setSelectedProviders(prev => {
        const newSelected = { ...prev };
        if (newSelected[serviceId] && newSelected[serviceId][subcategoryId]) {
          delete newSelected[serviceId][subcategoryId];
        }
        return newSelected;
      });
    } finally {
      setIsAccepting(false);
    }
  };

  // Check if all required subcategories have selected providers
  const checkAllSubcategoriesSelected = () => {
    for (const service of eligibleServiceData) {
      const serviceId = service.service._id;

      if (!selectedProviders[serviceId]) {
        return false;
      }

      for (const subcategory of service.subcategories) {
        const subcategoryId = subcategory.subcategoryId._id;
        if (!selectedProviders[serviceId][subcategoryId]) {
          return false;
        }
      }
    }
    return true;
  };

  // Handle completing the selection process
  const handleCompleteSelection = () => {
    if (checkAllSubcategoriesSelected()) {
      router.push('/orderdetails');
    } else {
      toast.warning("Please select a service provider for each subcategory");
    }
  };
  if (!mounted) {
    return <div>Loading...</div>; // Display a loading state
  }
  return (
    <div className="px-[7%] py-6 font-sans">
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="rounded-xl border p-6 w-full mb-6">
              <div className="">
                <AllotedLabourMap />
              </div>
            </div>


            {/* Eligible Service Providers Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Service Providers</h2>
              {eligibleServiceData.map((serviceData) => (
                <div key={serviceData.service._id} className="mb-8">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex xsm:flex-col md:flex-row gap-4 items-center">
                      <Image
                        src={serviceData.service.categoryImage || '/Images/banner.png'}
                        alt={serviceData.service.category}
                        width={200}
                        height={200}
                        className="rounded-lg h-48 w-48 object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{serviceData.service.category}</h3>
                        <p className="text-gray-600">{serviceData.service.categoryDescription}</p>
                      </div>
                    </div>
                  </div>

                  {serviceData.subcategories.map((subcategory) => (
                    <div key={subcategory.subcategoryId._id} className="ml-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-2">
                        <div className="flex xsm:flex-col md:flex-row gap-4 items-center">
                          <Image
                            src={subcategory.subcategoryId.image || '/Images/banner.png'}
                            alt={subcategory.subcategoryId.title}
                            width={100}
                            height={100}
                            className="rounded-lg h-24 w-24 object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-bold">{subcategory.subcategoryId.title}</h4>
                            <p className="text-gray-600">{subcategory.subcategoryId.description}</p>
                            <p className="text-sm text-blue-600">Workers Required: {subcategory.workersRequirment}</p>
                          </div>

                          {/* Show selected provider information if one is selected */}
                          {selectedProviders[serviceData.service._id]?.[subcategory.subcategoryId._id] && (
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                              <p className="text-green-700 font-medium text-sm">
                                Provider Selected
                                {subcategory.eligibleProviders.find(
                                  p => p.user._id === selectedProviders[serviceData.service._id][subcategory.subcategoryId._id]
                                ) && (
                                    <>: {subcategory.eligibleProviders.find(
                                      p => p.user._id === selectedProviders[serviceData.service._id][subcategory.subcategoryId._id]
                                    )?.user.name}</>
                                  )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        {subcategory.eligibleProviders.map((provider) => {
                          const isSelected =
                            selectedProviders[serviceData.service._id]?.[subcategory.subcategoryId._id] === provider.user._id;

                          return (
                            <div
                              key={provider._id}
                              className={`bg-white rounded-lg shadow-md p-4 ${isSelected ? 'ring-2 ring-green-500' : ''
                                }`}
                            >
                              <div className=''>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="relative">
                                    <Image
                                      src={provider.user.profileImage || '/Images/avatar.png'}
                                      alt={provider.user.name}
                                      width={50}
                                      height={50}
                                      className="rounded-full h-12 w-12 object-cover"
                                    />
                                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${provider.user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                      }`}></span>
                                  </div>
                                  <div >
                                    <h5 className="font-bold">{provider.user.name}</h5>
                                    <p className={`text-xs ${provider.availability === 'available'
                                      ? 'text-green-500'
                                      : provider.availability === 'on request'
                                        ? 'text-orange-500'
                                        : 'text-gray-500'
                                      }`}>
                                      {provider.availability.charAt(0).toUpperCase() + provider.availability.slice(1)}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-sm mt-2 h-[100px] overflow-y-auto">
                                  {provider.experience && (
                                    <p className="text-gray-600 mb-1">Experience: {provider.experience} years</p>
                                  )}

                                  {/* Find pricing for this specific subcategory */}
                                  {provider.skills.map(skill => {
                                    if (skill.category === serviceData.service._id) {
                                      const matchingSubcategory = skill.subcategories.find(
                                        subcat => subcat.subcategory === subcategory.subcategoryId._id
                                      );

                                      if (matchingSubcategory && matchingSubcategory.pricing.length > 0) {
                                        const dailyPrice = matchingSubcategory.pricing.find(p => p.pricingtype === 'daily');
                                        return dailyPrice ? (
                                          <p key={dailyPrice._id} className="text-gray-600 mb-1">
                                            Price: ₹{dailyPrice.from} - ₹{dailyPrice.to}/day
                                          </p>
                                        ) : null;
                                      }
                                    }
                                    return null;
                                  })}

                                  {provider.instantAvailability && (
                                    <p className="text-green-600 mb-1">✓ Instant Availability</p>
                                  )}
                                </div>

                                <div className="flex gap-2 mt-4">
                                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                                    Call
                                  </button>
                                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm transition-colors">
                                    Message
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    if (!isSelected && orderData) {
                                      handleAccept(
                                        orderData._id,
                                        serviceData.service._id,
                                        subcategory.subcategoryId._id,
                                        provider.user._id
                                      );
                                    }
                                  }}
                                  disabled={Boolean(isAccepting || (
                                    selectedProviders[serviceData.service._id]?.[subcategory.subcategoryId._id] &&
                                    selectedProviders[serviceData.service._id][subcategory.subcategoryId._id] !== provider.user._id
                                  ))}
                                  className={`w-full py-2 px-4 rounded-lg text-sm mt-2 transition-colors ${isSelected
                                    ? 'bg-green-500 text-white cursor-default'
                                    : selectedProviders[serviceData.service._id]?.[subcategory.subcategoryId._id]
                                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                      : 'bg-green-500 hover:bg-green-600 text-white'
                                    }`}
                                >
                                  {isSelected ? 'Selected' : 'Accept'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {subcategory.eligibleProviders.length === 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-gray-600">No eligible service providers available for this subcategory.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {eligibleServiceData.length === 0 && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-600">No eligible service providers found at this time.</p>
                </div>
              )}

              {/* Complete Selection Button */}
              {eligibleServiceData.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
                  <div className="px-[7%] flex justify-between items-center">
                    <div>
                      <p className="text-gray-700">
                        {Object.values(selectedProviders).reduce(
                          (count, subcats) => count + Object.keys(subcats).length, 0
                        )} provider(s) selected
                      </p>
                      <p className="text-xs text-gray-500">
                        Select a provider for each subcategory to continue
                      </p>
                    </div>
                    <button
                      onClick={handleCompleteSelection}
                      disabled={!checkAllSubcategoriesSelected()}
                      className={`py-3 px-8 rounded-lg font-medium ${checkAllSubcategoriesSelected()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Continue to Order Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Labour;