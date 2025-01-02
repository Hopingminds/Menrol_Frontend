"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
            <div key={price._id} className="text-2xl font-semibold text-gray-900">
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
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
    if (selectedItem) {
      const currentPricing = selectedItem.pricing.find(p => p.pricingtype === pricingType);
      if (currentPricing) {
        setSelectedPrice(currentPricing.from);
      }
    }
  }, [pricingType, selectedItem]);

  if (!isOpen || !selectedItem) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const getCurrentPriceRange = () => {
    return selectedItem.pricing.find(p => p.pricingtype === pricingType) || null;
  };

  const priceRange = getCurrentPriceRange();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
  
      // Validate inputs
      if (!startDate || !endDate) {
        throw new Error("Please select both start and end dates");
      }
  
      const serviceRequest: ServiceRequest = {
        instImages: uploadedImage,
        service: serviceId,
        subcategory: {
          subcategoryId: selectedItem._id,
          title: selectedItem.title,
          requestType: pricingType,
          workersRequirment: workers,
          selectedAmount: selectedPrice,
          instructions: instructions,
          scheduledTiming: {
            startTime: new Date(startDate).toISOString(),
            endTime: new Date(endDate).toISOString(),
          },
        },
      };
  
      // Create FormData for file upload
      const formData = new FormData();
      if (uploadedImage) {
        formData.append("instImages", uploadedImage);
      }
  
      // Send the other data as JSON, not as FormData
      const payload = {
        service: serviceRequest.service,
        subcategory: JSON.stringify(serviceRequest.subcategory), // Stringify the subcategory object
      };
  
      // Combine FormData and the payload
      const jsonData = JSON.stringify(payload);
  
      // Make the API call with FormData and JSON body
      const response = await fetch("https://api.menrol.com/api/v1/addServiceRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userInfo.token}`,
        },
        body: jsonData, // Send JSON data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.success) {
        alert("Service request added successfully!");
        onClose();
      } else {
        throw new Error(data.message || "Failed to add service request");
      }
    } catch (err) {
      console.error("Error submitting service request:", err);
      setError(err instanceof Error ? err.message : "Failed to submit service request");
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-4xl h-[80%] overflow-auto relative flex">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        {/* Left Side: Image */}
        <div className="flex-shrink-0 w-1/2 h-full">
          <div className="relative w-full h-full bg-gray-300 rounded-lg overflow-hidden">
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
        </div>

        {/* Right Side: Form */}
        <div className="flex-grow pl-6 flex flex-col justify-start space-y-4 h-full">
          <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select starting Date for Service
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Ending Date for Service
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions (optional)
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Any specific instructions..."
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Reference Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            />
            {uploadedImage && (
              <p className="mt-2 text-sm text-gray-500">
                Uploaded: {uploadedImage.name}
              </p>
            )}
          </div>

          {/* Pricing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pricing Type
            </label>
            <select
              value={pricingType}
              onChange={(e) => setPricingType(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            >
              {selectedItem.pricing.map((price) => (
                <option key={price._id} value={price.pricingtype}>
                  {price.pricingtype.charAt(0).toUpperCase() + price.pricingtype.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          {priceRange && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Price ({formatPrice(priceRange.from)} - {formatPrice(priceRange.to)})
              </label>
              <input
                type="range"
                min={priceRange.from}
                max={priceRange.to}
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(parseInt(e.target.value))}
                className="w-full"
                step={(priceRange.to - priceRange.from) / 100}
              />
              <p className="mt-1 text-gray-500">
                Selected Price: {formatPrice(selectedPrice)}
              </p>
            </div>
          )}

          {/* Workers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Workers Required
            </label>
            <select
              value={workers}
              onChange={(e) => setWorkers(parseInt(e.target.value))}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
            >
              {Array.from({ length: 10000 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Price: {formatPrice(selectedPrice * workers)}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 py-2 rounded-lg text-gray-900 font-medium hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-500 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isSubmitting ? "Submitting..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setService(data.data);
          setError(null);
        } else {
          setError(data.message || "Failed to load service details.");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching service details."
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.category}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{service.categoryDescription}</p>
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
        serviceId={id || ''} // Pass the service ID
      />
    </div>
  );
};

export default IndividualServices;