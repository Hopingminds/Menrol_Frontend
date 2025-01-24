"use client"
import React, { useEffect, useState } from 'react';
import AllotedLabourMap from '../AlloatedLabourMap/AlloatedLabourMap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import { toast } from "react-toastify";


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

const Labour = () => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);




  useEffect(() => {
    if (!userInfo || !userInfo.token) {
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
        console.log(data);
        if (data.success) {
          setOrderData(data.order);
        } else {
          setIsLoading(true);
          router.push('/orderdetails');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      console.warn('User info or token is missing, skipping fetch.');
      return;
    }
    const fetchserviceproviders = async () => {
      try {
        const response = await fetch('https://api.menrol.com/api/v1/fetchEligibleServiceProviders', {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        const data: ApiResponse = await response.json();
        console.log(data);

        // const subcategories=data.data.results
      } catch (error) {
        console.log(error);
      }
    }

    fetchserviceproviders();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      console.warn('User info or token is missing, skipping fetch.');
      return;
    }

    const user: UserToken = jwtDecode(userInfo.token);

    if (!user || !user.userID) {
      console.warn('User info or token is missing, skipping fetch.');
      return;
    }

    // Establish WebSocket connection
    const socket = io('https://api.menrol.com', {
      secure: true,
      reconnection: true, // Enable automatic reconnections
      reconnectionAttempts: 5, // Retry 5 times before giving up
      reconnectionDelay: 2000, // Delay between attempts (2 seconds)
      timeout: 5000, // Timeout before assuming connection failure
    });

    // Subscribe to user-specific updates
    socket.emit('subscribeToUserUpdates', user.userID);

    // Listen for updates
    socket.on('userRaisedOrderUpdate', (updatedOrder) => {
      if (updatedOrder.success && updatedOrder.order) {
        setOrderData(updatedOrder.order);
      } else {
        setIsLoading(true);
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
  }, [userInfo]);


  if (!mounted) return null;


  const handleCancel = async (
    orderId: string,
    serviceId: string,
    subcategoryId: string
  ) => {
    if (!userInfo?.token) return;

    const payload = {
      orderId: orderId,
      serviceId: serviceId,
      subcategoryId: subcategoryId,
    };

    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/cancelOrderRequest",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Order cancelled successfully");
        window.location.reload();
      } else {
        toast.warning("Failed to cancel the order");
      }
    } catch (error) {
      toast.warning("Failed to cancel the order");
      console.log(error);
    }
  };

  return (
    <div className="px-[7%] py-6 font-sans">
      <div className="w-full">
        {isLoading ?
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          :
          <>
            <div className="rounded-xl border p-6 w-full">
              <div className="">
                <AllotedLabourMap />
              </div>
            </div>
            <div className="p-6 xsm:w-full xl:w-[60%] md:w-full">

              {orderData?.serviceRequest?.map((request) => (
                request.subcategory.map((sub) => (
                  <div
                    key={sub._id}


                    className="border rounded-lg shadow-lg p-3 xsm:flex-col flex xsm:gap-5 gap-10 items-center mb-4"
                  >

                    <div>

                      <Image
                        src={request.service.categoryImage || '/Images/banner.png'}
                        alt={request.service.category}
                        width={500}
                        height={500}
                        className="rounded-lg h-[15rem] w-[25rem] object-cover"
                      />
                    </div>
                    <div className="">
                      <p className="font-bold text-2xl xsm:text-base">
                        {request.service.category}
                      </p>
                      <p className="text-lg xsm:text-sm">{sub.title}</p>
                      <p className="text-gray-400 text-base xsm:text-xs xsm:w-full w-[80%]">
                        {request.service.categoryDescription}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-gray-400">
                        <div>
                          <p className="text-sm">
                            Workers Required: {sub.workersRequirment}
                          </p>
                          <p className="text-sm">
                            Current Providers: {sub.serviceProviders.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            Viewers: {sub.viewers.length}
                          </p>
                          <p className="text-sm">
                            Amount: ₹{sub.selectedAmount}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (sub.status === "cancelled") {
                            toast.info("This order is already cancelled", {
                              position: "top-right", // Adjust position as needed
                              autoClose: 3000, // Toast auto-close time
                            });
                          } else {
                            handleCancel(orderData?._id, request.service._id, sub.subcategoryId);
                          }
                        }}
                        className={`p-3 rounded-lg w-full mt-2 
    ${sub.status === "cancelled"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-50 border hover:bg-red-500 hover:text-white transition-all duration-300 border-red-500 text-red-500"
                          }`}>
                        {sub.status === "cancelled" ? "Cancelled" : "Cancel"}
                      </button>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Labour;