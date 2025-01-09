import React, { useEffect, useState } from "react";
import Map from "../../components/Map/Map";

interface UserInfo {
  phone: string;
  name: string;
  email: string;
}

interface ProfileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  userData: UserInfo | null; // Add userData here
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  userData, // Access userData here
}) => {
  const [houseNumber, setHouseNumber] = useState<string>("");
  // const [sector, setSector] = useState<string>("");
  // const [city, setCity] = useState<string>("");
  // const [state, setState] = useState<string>("");
  // const [country, setCountry] = useState<string>("");
  // const [currentLocation, setCurrentLocation] = useState<string>("");
  // const [isAddressFetched, setIsAddressFetched] = useState<boolean>(false);
  // const locations = [
  //   { name: "Location 1", lat: 51.505, lng: -0.09 },
  //   { name: "Location 2", lat: 51.515, lng: -0.1 },
  //   { name: "Location 3", lat: 51.525, lng: -0.11 },
  // ];
  const GOOGLE_API_KEY = "AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0";

  // Function to fetch latitude and longitude based on IP address
  const fetchLocation = async () => {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();

      if (data.city && data.region) {
        const { lat, lon } = data; // Fetching the latitude and longitude
        // setCurrentLocation(`${data.city}, ${data.region}`);
        getAddressFromCoordinates(lat, lon);
      } else {
        // setCurrentLocation("Location data unavailable");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      // setCurrentLocation("Unable to fetch location");
    }
  };

  // Function to fetch the address from coordinates (latitude and longitude)
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
        // setIsAddressFetched(true); // Mark as fetched
      } else {
        setHouseNumber("Unable to fetch address");
        // setSector("Unable to fetch address");
        // setCity("Unable to fetch address");
        // setState("Unable to fetch address");
        // setCountry("Unable to fetch address");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setHouseNumber("Error fetching address");
      // setSector("Error fetching address");
      // setCity("Error fetching address");
      // setState("Error fetching address");
      // setCountry("Error fetching address");
    }
  };

  // Function to extract the complete address and fill separate fields
  const extractCompleteAddress = (fullAddress: string) => {
    const addressParts = fullAddress.split(",");

    // Attempting to extract house number, sector, city, and state
    setHouseNumber(addressParts[0]?.trim() || "House Number not available");
    // setSector(addressParts[1]?.trim() || "Sector not available");
    // setCity(
    //   addressParts[addressParts.length - 3]?.trim() || "City not available"
    // );
    // setState(
    //   addressParts[addressParts.length - 2]?.trim() || "State not available"
    // );
    // setCountry(
    //   addressParts[addressParts.length - 1]?.trim() || "Country not available"
    // );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 flex items-center  justify-center backdrop-blur-lg bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-lg h-auto w-[90%] md:w-[40%]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Profile Information
        </h2>
        {userData ? (
          <div>
            <div className="mb-4">
              <p className="text-lg">
                <strong className="text-blue-500">Name:</strong> {userData.name}
              </p>
              <p className="text-lg">
                <strong className="text-blue-500">Email:</strong>{" "}
                {userData.email}
              </p>
              <p className="text-lg">
                <strong className="text-blue-500">Phone:</strong>{" "}
                {userData.phone}
              </p>
            </div>
            {/* Address Section with separate input boxes for each field */}
            <div className="mb-4  overflow-y-scroll h-[450px]">
              <p className="text-lg">
                <strong className="text-blue-500">Address:</strong>
              </p>
              <div className="">
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
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
