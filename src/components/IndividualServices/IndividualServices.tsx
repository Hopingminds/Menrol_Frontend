"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

interface PricingType {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface Subcategory {
  _id: string;
  title: string;
  description: string | null;
  image: string;
  dailyWageWorker: number;
  hourlyWorker: number;
  contractWorker: number;
  pricing: PricingType[];
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: Subcategory[];
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

const IndividualServices: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("data");
  const subcategoryId = searchParams.get("subcategory");
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const Router = useRouter();

  useEffect(() => {
    if (!id) {
      setError("No service ID provided");
      setLoading(false);
      return;
    }

    const fetchServiceDetails = async (serviceId: string) => {
      try {
        const response = await fetch(
          `https://api.menrol.com/api/v1/getCategory?categoryId=${serviceId}`
        );

        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.success);
        console.log(data.data.category);

        if (data.success && data.data.category) {
          setService(data.data);
          setError(null);
        } else {
          throw new Error(data.message || "Failed to fetch service details.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails(id);
  }, [id]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchCart();
    }
  }, [userInfo]);

  const fetchCart = async () => {
    let ItemIds: string[] = [];
    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/getUserServiceRequests",
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch service requests");
      }

      const data = await response.json();

      if (data.success && data.serviceRequests?.requestedServices) {
        const existingSubcategories = data.serviceRequests.requestedServices.flatMap(
          (service: { subcategory: { subcategoryId: Subcategory }[] }) =>
            service.subcategory
        );

        ItemIds = existingSubcategories.map((sub: { subcategoryId: Subcategory }) =>
          sub.subcategoryId._id
        );
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setCartItems(ItemIds);
    }
  };

  useEffect(() => {
    if (subcategoryId && service) {
      const data = service.subcategory.find((sub) => sub._id.toString() === subcategoryId.toString());
      console.log(data);
    }
  }, [service, subcategoryId]);

  const toggleItemSelection = (subcategoryId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(subcategoryId)) {
        return prev.filter(id => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
  };

  const handleAddSelected = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one service");
      return;
    }

    const selectedIdsParam = selectedItems.join(',');
    const query = `subcategories=${selectedIdsParam}&service=${id}`;
    Router.push(`/AddDetail?${query}`);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!service || !service.subcategory.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">No services found.</p>
      </div>
    );
  }

  return (
    <div className="px-[10%] py-8">
      {/* Category Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {service.category}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {service.categoryDescription}
        </p>
      </div>

      {/* Selection Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-700 font-medium">
            {selectedItems.length} services selected
          </span>
        </div>
        <button
          onClick={handleAddSelected}
          disabled={selectedItems.length === 0}
          className={`px-6 py-2 rounded-lg font-medium ${selectedItems.length > 0
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
        >
          Add Selected to Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {service.subcategory.map((item) => {
          const isInCart = cartItems.includes(item._id);
          const isSelected = selectedItems.includes(item._id);

          return (
            <div
              key={item._id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${isSelected ? "ring-2 ring-blue-500" : ""
                }`}
            >
              {/* Image Container with Fixed Height */}
              <div className="flex items-center justify-center mt-4">
                <div className="relative p-10 w-[90%] rounded-2xl h-64 bg-gray-400">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-2xl"
                    priority={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  {/* Selection Checkbox */}
                  {!isInCart && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`select-${item._id}`}
                        checked={isSelected}
                        onChange={() => toggleItemSelection(item._id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`select-${item._id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        Select
                      </label>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description || "No description available"}
                </p>

                {isInCart ? (
                  <button
                    onClick={() => Router.push('/checkout')}
                    className="w-full mt-4 bg-gray-100 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-200 transition-colors"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isSelected) {
                        toggleItemSelection(item._id);
                      } else {
                        toggleItemSelection(item._id);
                      }
                    }}
                    className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${isSelected
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                  >
                    {isSelected ? "Selected" : "Select Service"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndividualServices;