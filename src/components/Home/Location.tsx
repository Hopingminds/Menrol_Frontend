import React, { useState, useEffect } from 'react';

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [address, setAddress] = useState<string | null>(null); // Explicitly allow null or string
  const [isAddressFetched, setIsAddressFetched] = useState<boolean>(false);
  
  const GOOGLE_API_KEY = "AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"; 

  // Function to fetch latitude and longitude based on IP address
  const fetchLocation = async () => {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();

      if (data.city && data.region) {
        const { lat, lon } = data; // Fetching the latitude and longitude
        setCurrentLocation(`${data.city}, ${data.region}`);
        getAddressFromCoordinates(lat, lon);
      } else {
        setCurrentLocation("Location data unavailable");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setCurrentLocation("Unable to fetch location");
    }
  };

  // Function to fetch the address from coordinates (latitude and longitude)
  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const fullAddress = data.results[0]?.formatted_address || "Address not found";
        const extractedAddress = extractCityDistrictState(fullAddress);
        setAddress(extractedAddress);
        setIsAddressFetched(true); // Mark as fetched
      } else {
        setAddress("Unable to fetch address");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setAddress("Error fetching address");
    }
  };

  const extractCityDistrictState = (fullAddress: string) => {
    const addressParts = fullAddress.split(",");

    const cityDistrictState = addressParts.filter((part, index) => 
      index === addressParts.length - 3 || 
      index === addressParts.length - 2 ||
      index === addressParts.length - 1
    ).join(", ").trim();
    return cityDistrictState;
  };

 
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center px-2 mb-4">
        <select
          name="location"
          id="location"
          className="w-[15vw] h-10 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
          value={address || currentLocation} // Show the address or fallback to currentLocation
          onChange={(e) => setCurrentLocation(e.target.value)}
        >
          <option value="" disabled>
            Choose location
          </option>
          {address && (
            <option value={address} disabled>
              {address}
            </option>
          )}
          {currentLocation && !address && (
            <option value={currentLocation} disabled>
              {currentLocation}
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default Location;
