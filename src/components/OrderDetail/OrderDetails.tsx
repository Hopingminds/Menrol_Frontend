import React, { useEffect, useState } from "react";

interface UserInfo {
  token: string;
}

interface Order {
  _id: string;
  location: {
    address: string;
  };
  payment: {
    status: string;
  };
  serviceRequest: {
    title: string;
  };
  orderDate: string;
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
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-4xl font-bold font-lexend text-gray-800">
          Your Orders
        </h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {orderData ? (
          <>
            {Object.entries(orderData).map(([status, orders]) => (
              <div key={status} className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 capitalize mb-3">
                  {status} Orders
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
                      >
                        <div>
                          <strong>Order ID:</strong> {order._id}
                        </div>
                        <div>
                          <strong>Location:</strong> {order.location?.address || "N/A"}
                        </div>
                        <div>
                          <strong>Payment Status:</strong> {order.payment?.status || "N/A"}
                        </div>
                        <div>
                          <strong>Service:</strong> {order.serviceRequest?.title || "N/A"}
                        </div>
                        <div>
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.orderDate).toLocaleDateString("en-IN")}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No {status} orders.</p>
                  )}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-gray-600">Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
