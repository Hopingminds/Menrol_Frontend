"use client"
import React, { useEffect, useState } from 'react';
import Map from '../Map/Map';
import Image from 'next/image';
import { useRouter } from 'next/navigation';






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
  viewers: any[];
  serviceProviders: any[];
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

interface ApiResponse {
  success: boolean;
  order: Order;
}

const Labour = () => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
      }
  }

    fetchserviceproviders();
  }, [userInfo]);



  if (!mounted) return null;

  return (
    <div className="px-[7%] py-6 font-sans">
      <div className="w-full">
        <div className="rounded-xl border p-6 w-full">
          <div className="">
            {/* <Map /> */}
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
                    className="rounded-lg"
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
                  <div className="mt-4">
                    <p className="text-sm">
                      Workers Required: {sub.workersRequirment}
                    </p>
                    <p className="text-sm">
                      Current Providers: {sub.serviceProviders.length}
                    </p>
                    <p className="text-sm">
                      Viewers: {sub.viewers.length}
                    </p>
                    <p className="text-sm">
                      Status: {sub.status}
                    </p>
                    <p className="text-sm">
                      Amount: ₹{sub.selectedAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Labour;