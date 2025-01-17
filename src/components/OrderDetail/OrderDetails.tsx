"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SubCategories from "../Home/SubCatogeries";


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
                      Order #{orderIndex + 1}
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
                             <strong className="text-gray-600">{serviceRequest.service.category}</strong>
                            <div className="  items-center gap-2  px-2 ">
                              <div className=" mt-2 items-baseline   space-y-2">
                              {serviceRequest.subcategory.map((subcat, subIndex) => (
                                <div key={subIndex} className="w-full bg-blue-100 p-3 rounded-xl">
                                  <p className="text-gray-800">
                                    <p className="font-bold">{subcat.title}</p>
                                    <p></p>
                                  </p>
                                  <p className="text-gray-800">
                                    <strong>Status:</strong> {subcat.status}
                                  </p>
                                  <p className="text-gray-800">
                                    <strong>Timing:</strong>{" "}
                                    {new Date(
                                      subcat.scheduledTiming.startTime
                                    ).toLocaleString()}{" "}
                                    -{" "}
                                    {new Date(
                                      subcat.scheduledTiming.endTime
                                    ).toLocaleString()}
                                  </p>
                                  <p className="flex justify-between">
                                    <span>
                                      <span className="font-bold">Start OTP:</span>
                                        <span>{subcat.requestOperation.startOtp}</span>
                                        </span>
                                    <span>
                                      <span className="font-bold">End OTP:</span>
                                      <span>{subcat.requestOperation.endOtp}</span>
                                      </span>
                                  </p>
                                  {subcat.serviceProviders.map((provider,providerindex)=>(
                                    <div key={providerindex}>
                                      <span>Aloated Labour:</span>
                                      <div className="flex items-center gap-5">
                                      <Image
                                      src={provider.serviceProviderId.profileImage}
                                      alt=""
                                      width={50}
                                      height={50}
                                      className=" w-8 h-8 rounded-full"
                                      />
                                      <p>{provider.serviceProviderId.name}</p>
                                      </div>

                                    </div>
                                  ))}
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
                  <div>
                    <strong className="text-gray-600">Location:</strong>{" "}
                    <p className="text-gray-800">{order.address || "N/A"}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                    <strong className="text-gray-600">Payment:</strong>
                    <p className="text-gray-800">
                      Total Amount: ₹{order.payment.totalamount || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      Paid Amount: ₹{order.payment.paidAmount || "N/A"}
                    </p>
                  </div>
                 
                  <div>
                    <strong className="text-gray-600">Order Date:</strong>{" "}
                    <p className="text-gray-800">
                      {new Date(order.orderDate).toLocaleDateString("en-IN")}
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
