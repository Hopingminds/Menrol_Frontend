"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
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

interface ServiceRequest {
  instImages: File | null;
  service: string;
  subcategory: {
    subcategoryId: string;
    title: string;
    requestType: string;
    workersRequirment: number;
    selectedAmount: number;
    instructions: string;
    scheduledTiming: {
      startTime: string;
      endTime: string;
    };
  };
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const PricingDisplay: React.FC<{ pricing: PricingType[] }> = ({ pricing }) => {
  return (
    <div className="mt-2">
      {pricing.map(
        (price) =>
          price.pricingtype === "daily" && (
            <div
              key={price._id}
              className="text-2xl font-semibold text-gray-900"
            >
              {formatPrice(price.from)} - {formatPrice(price.to)}
            </div>
          )
      )}
    </div>
  );
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Subcategory | null;
  serviceId: string;
}> = ({ isOpen, onClose, selectedItem, serviceId }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [pricingType, setPricingType] = useState<string>("daily");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [workers, setWorkers] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  // Reset all form fields
  const resetForm = useCallback(() => {
    setStartDate("");
    setEndDate("");
    setInstructions("");
    setUploadedImage(null);
    setPricingType("daily");
    setSelectedPrice(0);
    setWorkers(1);
    setError(null);
    setShowLoginPrompt(false);
    setIsSubmitting(false);
  }, []);

  // Effect to handle user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);

  // Effect to reset form and set initial price when modal opens or selectedItem changes
  useEffect(() => {
    if (isOpen && selectedItem) {
      resetForm();
      const currentPricing = selectedItem.pricing.find(
        (p) => p.pricingtype === "daily"
      );
      if (currentPricing) {
        setSelectedPrice(currentPricing.from);
      }
    }
  }, [isOpen, selectedItem, resetForm]);

  // Effect to update price when pricing type changes
  useEffect(() => {
    if (selectedItem) {
      const currentPricing = selectedItem.pricing.find(
        (p) => p.pricingtype === pricingType
      );
      if (currentPricing) {
        setSelectedPrice(currentPricing.from);
      }
    }
  }, [pricingType, selectedItem]);

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    return Math.max(Math.ceil(diffInMs / (1000 * 60 * 60 * 24)), 1); // At least 1 day
  };

  const totalDays = calculateTotalDays();
  const totalPrice = selectedPrice * workers * totalDays;

  const handleSubmit = async () => {
    if (!userInfo?.token) {
      setShowLoginPrompt(true);
      setError("Please log in to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.success("Service request added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(null);

      if (!startDate || !endDate || new Date(endDate) < new Date(startDate)) {
        setError(
          "Ensure dates are valid and the end date is after the start date."
        );
        return;
      }

      const serviceRequest: ServiceRequest = {
        instImages: null,
        service: serviceId,
        subcategory: {
          subcategoryId: selectedItem?._id || "",
          title: selectedItem?.title || "",
          requestType: pricingType,
          workersRequirment: workers,
          selectedAmount: selectedPrice,
          instructions,
          scheduledTiming: {
            startTime: new Date(startDate).toISOString(),
            endTime: new Date(endDate).toISOString(),
          },
        },
      };

      const payload = {
        service: serviceRequest.service,
        subcategory: JSON.stringify(serviceRequest.subcategory),
      };

      const jsonData = JSON.stringify(payload);

      const response = await fetch(
        "https://api.menrol.com/api/v1/addServiceRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token}`,
          },
          body: jsonData,
        }
      );

      if (!response.ok) {
        console.error("API Response Error:", await response.text());
        throw new Error(
          `Failed to fetch service details. Status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        handleClose();
      } else {
        throw new Error(data.message || "Failed to add service request");
      }
    } catch (err) {
      console.error("Error submitting service request:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit service request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !selectedItem) return null;

  const priceRange =
    selectedItem.pricing.find((p) => p.pricingtype === pricingType) || null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-3xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl transition-colors"
            aria-label="Close"
          >
            &times;
          </button>

          {showLoginPrompt ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="text-xl font-semibold mb-4">Please Log In</div>
              <p className="text-gray-600 mb-6 text-center">
                You need to be logged in to add items to your cart.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    setError(null);
                  }}
                  className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-7 justify-center">
                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <div>
                  <p className="text-base font-lexend">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedItem.title}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructions (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add any specific instructions..."
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pricing Type
                  </label>
                  <select
                    value={pricingType}
                    onChange={(e) => setPricingType(e.target.value)}
                    className="w-full h-[70%] border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {selectedItem.pricing.map((price) => (
                      <option key={price._id} value={price.pricingtype}>
                        {price.pricingtype.charAt(0).toUpperCase() +
                          price.pricingtype.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {priceRange && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Price ({formatPrice(priceRange.from)} -{" "}
                      {formatPrice(priceRange.to)})
                    </label>
                    <input
                      type="range"
                      min={priceRange.from}
                      max={priceRange.to}
                      value={selectedPrice}
                      onChange={(e) =>
                        setSelectedPrice(parseInt(e.target.value))
                      }
                      className="w-full"
                      step={(priceRange.to - priceRange.from) / 100}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Selected Price: {formatPrice(selectedPrice)}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workers Required
                  </label>
                  <select
                    value={workers}
                    onChange={(e) => setWorkers(parseInt(e.target.value))}
                    className="w-full h-[70%] border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Total Price: {formatPrice(totalPrice)}
                  </p>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gray-100 py-2 rounded-lg text-gray-900 font-medium hover:bg-gray-200 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-500 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    {isSubmitting ? "Submitting..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const IndividualServices: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("data");

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Subcategory | null>(null);

  const openModal = (item: Subcategory) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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
        if (data.success && data.category) {
          setService(data.category);
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {service.subcategory.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
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
                <PricingDisplay pricing={item.pricing} />
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description || "No description available"}
              </p>

              <button
                onClick={() => openModal(item)}
                className="w-full mt-4 bg-gray-100 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-200 transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        serviceId={id || ""}
      />
    </div>
  );
};

export default IndividualServices;
