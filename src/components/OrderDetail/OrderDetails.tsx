"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";




interface UserInfo {
  token: string;
}

interface Subcategory {
  scheduledTiming: {
    startTime: string;
    endTime: string;
  };
  title: string;
  selectedAmount: number;
  status: string;
  requestOperation:{
    endOtp:number;
    startOtp:number; 
  };
serviceProviders:serviceProviders[];

}
interface serviceProviders{
  serviceProviderId:{
    name:String;
    profileImage:string;
  }

}


interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
}

interface ServiceRequest {
  service: Service;
  subcategory: Subcategory[];
}

interface Order {
  _id: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  payment: {
    totalamount: number;
    paidAmount: number;
    dueAmount: number;
    paymentDate: string;
    paymentType: string;
    paymentstatus: string;
    paymentmethod: string;
  };
  serviceRequest: ServiceRequest[];
  address: string;
  orderDate: string;
  categoriesTitles: string[];
}

interface ApiResponse {
  success: boolean;
  data: {
    pending: Order[];
    confirmed: Order[];
    completed: Order[];
    cancelled: Order[];
  };
}

const OrderDetails = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orderData, setOrderData] = useState<ApiResponse["data"] | null>(null);

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  useEffect(() => {
    // Fetch order data only if userInfo is available
    const fetchOrderData = async () => {
      if (!userInfo?.token) return;

      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getUserAllOrders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data: ApiResponse = await response.json();
          setOrderData(data.data);
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [userInfo]);
  

  return (
    <div className=" py-8 bg-gray-100 min-h-screen px-[7%]">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-4xl font-bold font-lexend text-gray-800">
          Your Orders
        </h1>
      </div>
      <div className="bg-gray-50 min-h-screen px-8 py-12">
  {orderData ? (
    <>
      {Object.entries(orderData).map(([status, orders]) => (
        <div key={status} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 capitalize border-b pb-2 mb-6">
            {status} Orders
          </h2>
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xsm:grid-cols-1 gap-6">
              {orders.map((order, orderIndex) => (
                <div
                  key={orderIndex}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Order {orderIndex + 1}
                    </h3>
                  </div>
                  <div>
                   
                    {order.serviceRequest.length > 0 ? (
                      <div className="space-y-4">
                        {order.serviceRequest.map((serviceRequest, srIndex) => (
                          <div key={srIndex}>
                            {/* <Image
                            src={serviceRequest.service.categoryImage}
                            alt="service Image"
                            width={500} 
                            height={500}
                            className="w-16 h-16 rounded-xl"
                            /> */}
                             <div className="flex items-center justify-between">
                             <div><strong className="text-gray-600">{serviceRequest.service.category}</strong></div>
                             <div className="flex items-center gap-2">
                    <strong className="text-[#0054A5]"><FaCalendar/></strong>{" "}
                    <p className="text-gray-800">
                      {new Date(order.orderDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                             </div>
                            <div className="  items-center gap-2  px-2 ">
                              <div className=" mt-2 items-baseline   space-y-2">
                              {serviceRequest.subcategory.map((subcat, subIndex) => (
                                <div key={subIndex} className="w-full border p-3 rounded-xl">
                                  <p className="text-gray-800 flex items-center justify-between">
                                    <p className="font-bold">{subcat.title.toUpperCase()}</p>
                                    <p className={`px-4 py-2 border rounded-lg ${subcat.status === 'pending' ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'}`}>
                                      {subcat.status}
                                      </p>
                                  </p>
                                  {subcat.serviceProviders.map((provider,providerindex)=>(
                                    <div key={providerindex}>
                                      
                                      <div className="flex items-center gap-3">
                                      <Image
                                      src={provider.serviceProviderId.profileImage}
                                      alt=""
                                      width={50}
                                      height={50}
                                      className=" w-12 h-12 rounded-full"
                                      />
                                     <span>
                                     <p>{provider.serviceProviderId.name}</p>
                                     <span className="text-gray-400 text-sm">Allocated Labor</span>
                                     </span>
                                      </div>

                                    </div>
                                  ))}
                                 
                                  <p className="text-gray-500 text-sm mt-2">
                                    <span>Timing:</span>{" "}
                                    {new Date(
                                      subcat.scheduledTiming.startTime
                                    ).toLocaleString()}{" "}
                                    -{" "}
                                    {new Date(
                                      subcat.scheduledTiming.endTime
                                    ).toLocaleString()}
                                  </p>
                                  <p className="flex justify-between mt-2">
                                    <span>
                                      <span className=" text-gray-400">Start OTP:</span>
                                        <span>{subcat.requestOperation.startOtp}</span>
                                        </span>
                                    <span>
                                      <span className="text-gray-400">End OTP:</span>
                                      <span>{subcat.requestOperation.endOtp}</span>
                                      </span>
                                  </p>

                                  <div className="flex justify-between items-center">
                                    <button></button>
                                  <button className="bg-[#0054A5] text-sm text-white px-3 py-1 rounded-lg">+ Add Extra Work</button>
                                  </div>
                                 
                                </div>
                              ))}
                            </div>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No services available.</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <strong className="text-gray-600 "><IoLocationSharp className="text-[#F56132]"/></strong>{" "}
                    <p className="text-[#0054A5] text-xs">{order.address || "N/A"}</p>
                  </div>
                  <div className=" ">
                  <strong className="text-gray-400">Payment:</strong>
                    <div className="flex justify-between items-center">
                    <p className="text-gray-400">
                      Total Amount: <span className="text-black">₹{order.payment.totalamount || "N/A"}</span>
                    </p>
                    <p className="text-gray-400">
                      Paid Amount: <span className="text-black">₹{order.payment.paidAmount || "N/A"}</span>
                    </p>
                  </div>
                 
                  
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No {status} orders.</p>
          )}
        </div>
      ))}
    </>
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-xl text-gray-600">Loading orders...</p>
    </div>
  )}
</div>

    </div>
  );
};

export default OrderDetails;
