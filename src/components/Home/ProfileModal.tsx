import React, { useEffect, useState } from "react";
import Map from "../../components/Map/Map";
import { RiCloseFill } from "react-icons/ri";

interface UserInfo {
  phone: string;
  name: string;
  email: string;
  token: string;
}

interface UserProfile {
  _id: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  isAccountBlocked: boolean;
  preferredLanguage: string;
  email: string;
  name: string;
}

interface ProfileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  userData: UserInfo | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  userData,
}) => {
  const [houseNumber, setHouseNumber] = useState<string>(""); // House number input
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const GOOGLE_API_KEY = "AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0";

  // Function to fetch the user's approximate location based on IP
  const fetchLocation = async () => {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();

      if (data.city && data.region) {
        const { lat, lon } = data;
        getAddressFromCoordinates(lat, lon);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };

  // Function to fetch the address using Google Maps API
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const fullAddress =
          data.results[0]?.formatted_address || "Address not found";
        extractCompleteAddress(fullAddress);
      } else {
        setHouseNumber("Unable to fetch address");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setHouseNumber("Error fetching address");
    }
  };

  // Function to extract address components
  const extractCompleteAddress = (fullAddress: string) => {
    const addressParts = fullAddress.split(",");
    setHouseNumber(addressParts[0]?.trim() || "House Number not available");
  };

  // Function to fetch profile data
  const getProfileData = async () => {
    if (!userData?.token) {
      setError("User token is not available.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.menrol.com/api/v1/getUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setProfileData(data.user);
        setError(null);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching profile data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchLocation();
      getProfileData();
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center  w-full h-screen bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white z-50 p-6 rounded-lg shadow-lg h-full w-[90%] md:w-[40%]"
      >
        <div className="flex justify-end items-center">
        <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 p-2 hover:bg-red-500 transition-all duration-300 rounded">
          <RiCloseFill className="text-white"/>
        </button>
        </div>
        <h2 className="text-2xl font-semibold mb-2 -mt-5 text-center text-blue-600">
          Profile Information
        </h2>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white  z-50">
          <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
        </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : profileData ? (
          <div>
            <div className="mb-4">
              <p className="text-lg">
                <span className="text-blue-500">Name:</span>{" "}
                <span className="">{profileData.name}</span>
              </p>
              <p className="text-lg">
                <span className="text-blue-500">Email:</span>{" "}
                <span>{profileData.email}</span>
              </p>
              <p className="text-lg">
                <span className="text-blue-500">Phone:</span>{" "}
                <span>{profileData.phone}</span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-lg">
                <span className="text-blue-500">Address:</span>
              </p>
              <div className="mb-2">
                <Map />
              </div>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Enter house number"
              />
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">No user data available.</p>
        )}
        
      </div>
    </div>
  );
};

export default ProfileModal;
