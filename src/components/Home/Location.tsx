"use client";
import React, { useState, useEffect, useCallback } from "react";

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);

  const GOOGLE_API_KEY = "AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0";

  // Function to fetch the address from coordinates
  const getAddressFromCoordinates = useCallback(async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const fullAddress = data.results[0]?.formatted_address || "Address not found";
        setAddress(fullAddress);
      } else {
        setAddress("Unable to fetch address");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setAddress("Error fetching address");
    }
  }, [GOOGLE_API_KEY]);

  // Function to fetch latitude and longitude based on IP address
  const fetchLocation = useCallback(async () => {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();
      if (data.city && data.region) {
        setCurrentLocation(`${data.city}, ${data.region}`);
        getAddressFromCoordinates(data.lat, data.lon);
      } else {
        setCurrentLocation("Location data unavailable");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setCurrentLocation("Unable to fetch location");
    }
  }, [getAddressFromCoordinates]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center px-2 mb-4">
        <select
          name="location"
          id="location"
          className="w-[15vw] h-10 px-2 py-2 text-sm  rounded-lg  focus:outline-none bg-white"
          value={address || currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        >
          <option value="" disabled>
            Location
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
