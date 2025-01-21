"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";

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
  requestOperation: {
    endOtp: number;
    startOtp: number;
  };
  subcategoryId: string;
  serviceProviders: serviceProviders[];
}

interface serviceProviders {
  serviceProviderId: {
    name: string;
    profileImage: string;
  };
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

interface ModalContent {
  startTime: string;
  endTime: string;
  totalAmount: number;
  orderId: string;
  serviceId: string;
  subcategoryId: string;
}

const OrderDetails = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orderData, setOrderData] = useState<ApiResponse["data"] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const tabOptions = ["pending", "confirmed", "completed", "cancelled"];
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [modalContent, setModalContent] = useState<ModalContent>({
    startTime: "",
    endTime: "",
    totalAmount: 0,
    orderId: "",
    serviceId: "",
    subcategoryId: "",
  });
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

  const handleModalOpen = (
    startTime: string,
    endTime: string,
    totalAmount: number,
    orderId: string,
    serviceId: string,
    subcategoryId: string
  ) => {
    setModalContent({
      startTime,
      endTime,
      totalAmount,
      orderId,
      serviceId,
      subcategoryId,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!userInfo?.token) return;

    const payload = {
      orderId: modalContent.orderId,
      serviceId: modalContent.serviceId,
      subcategoryId: modalContent.subcategoryId,
      scheduledTiming: {
        startTime: modalContent.startTime,
        endTime: modalContent.endTime,
      },
    };

    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/updateOrderTiming",
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
        setIsModalOpen(false);
      } else {
        console.error("Failed to update extra work");
      }
    } catch (error) {
      console.error("Error updating extra work:", error);
    }
  };

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
        // Reload the window if the response is successful
        toast.success("Order cancelled successfully");
        window.location.reload();
      } else {
        toast.warning("Failed to cancel the order");
      }
    } catch (error) {
      toast.warning("Failed to cancel the order");
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Orders
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-md">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {orderData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orderData[activeTab as keyof typeof orderData].length > 0 ? (
                orderData[activeTab as keyof typeof orderData].map(
                  (order, orderIndex) => (
                    <div
                      key={orderIndex}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 space-y-4"
                    >
                      <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order {orderIndex + 1}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="text-blue-500" />
                          <span>
                            {new Date(order.orderDate).toLocaleDateString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </div>

                      {order.serviceRequest.map((serviceRequest, srIndex) => (
                        <div key={srIndex} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-blue-600">
                              {serviceRequest.service.category}
                            </h4>
                          </div>

                          <div className="space-y-3">
                            {serviceRequest.subcategory.map(
                              (subcat, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="bg-gray-50 rounded-xl p-4 space-y-3"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">
                                      {subcat.title.toUpperCase()}
                                    </span>
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm ${
                                        subcat.status === "pending"
                                          ? "bg-red-100 text-red-600"
                                          : subcat.status === "cancelled"
                                          ? "bg-red-200 text-red-600"
                                          : "bg-green-100 text-green-600"
                                      }`}
                                    >
                                      {subcat.status}
                                    </span>
                                  </div>

                                  {subcat.serviceProviders.map(
                                    (provider, providerIndex) => (
                                      <div
                                        key={providerIndex}
                                        className="flex items-center gap-3 bg-white p-3 rounded-lg"
                                      >
                                        <Image
                                          src={
                                            provider.serviceProviderId
                                              .profileImage
                                          }
                                          alt=""
                                          width={50}
                                          height={50}
                                          className="w-12 h-12 rounded-full border-2 border-gray-200"
                                        />
                                        <div>
                                          <p className="font-medium text-gray-800">
                                            {provider.serviceProviderId.name}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Allocated Labor
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  )}

                                  <div className="text-sm text-gray-600">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FaCalendar className="text-blue-500" />
                                      <span>
                                        {new Date(
                                          subcat.scheduledTiming.startTime
                                        ).toLocaleString()}{" "}
                                        -
                                        {new Date(
                                          subcat.scheduledTiming.endTime
                                        ).toLocaleString()}
                                      </span>
                                    </div>

                                    <div className="flex justify-between text-sm bg-gray-100 p-3 rounded-lg">
                                      <span>
                                        <span className="text-gray-500">
                                          Start OTP:{" "}
                                        </span>
                                        <span className="font-medium">
                                          {subcat.requestOperation.startOtp}
                                        </span>
                                      </span>
                                      <span>
                                        <span className="text-gray-500">
                                          End OTP:{" "}
                                        </span>
                                        <span className="font-medium">
                                          {subcat.requestOperation.endOtp}
                                        </span>
                                      </span>
                                    </div>
                                    {subcat.status !== "cancelled" &&
                                      subcat.status !== "completed" && (
                                        <div className="flex justify-between mt-4 gap-3">
                                          <button
                                            onClick={() =>
                                              handleCancel(
                                                order._id,
                                                serviceRequest.service._id,
                                                subcat.subcategoryId
                                              )
                                            }
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                                          >
                                            Cancel
                                          </button>

                                          <button
                                            onClick={() =>
                                              handleModalOpen(
                                                subcat.scheduledTiming
                                                  .startTime,
                                                subcat.scheduledTiming.endTime,
                                                order.payment.totalamount,
                                                order._id,
                                                serviceRequest.service._id,
                                                subcat.subcategoryId
                                              )
                                            }
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                          >
                                            Add Extra Work
                                          </button>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="border-t pt-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <IoLocationSharp className="text-orange-500 text-lg flex-shrink-0 mt-1" />
                          <p className="text-gray-600 text-sm">
                            {order.address || "N/A"}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-600 font-medium mb-2">
                            Payment Details
                          </p>
                          <div className="flex justify-between text-sm">
                            <div>
                              <p className="text-gray-500">Total Amount</p>
                              <p className="font-medium">
                                ₹{Math.round(order.payment.totalamount)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Paid Amount</p>
                              <p className="font-medium">
                                ₹{Math.round(order.payment.paidAmount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-gray-500 text-lg">
                    No {activeTab} orders found.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90%]">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add Extra Work
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={modalContent.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={modalContent.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
