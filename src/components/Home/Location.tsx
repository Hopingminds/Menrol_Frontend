"use client";
import React, { useState, useEffect, useCallback } from "react";
// import { Loader2 } from "lucide-react";

interface LocationData {
  city: string;
  region: string;
  country: string;
  lat?: number;
  lon?: number;
}

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const Location = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // Fallback APIs - use your preferred service API keys
  const IPDATA_API_KEY = process.env.NEXT_PUBLIC_IPDATA_API_KEY;
  const IPAPI_KEY = process.env.NEXT_PUBLIC_IPAPI_KEY;

  const getAddressFromCoordinates = useCallback(async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      // First try Google Maps Geocoding API
      const googleResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      if (googleResponse.ok) {
        const data = await googleResponse.json();
        if (data.status === "OK") {
          return data.results[0]?.formatted_address || null;
        }
      }

      // Fallback to OpenStreetMap Nominatim if Google fails
      const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (nominatimResponse.ok) {
        const data = await nominatimResponse.json();
        return data.display_name || null;
      }

      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }, [GOOGLE_API_KEY]);

  const getBrowserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  const getIPBasedLocation = async (): Promise<LocationData | null> => {
    const APIs = [
      // Array of API endpoints to try in order
      {
        url: `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`,
        transform: (data: any) => ({
          city: data.city,
          region: data.region,
          country: data.country_name,
          lat: data.latitude,
          lon: data.longitude,
        }),
      },
      {
        url: `https://api.ipapi.com/api/check?access_key=${IPAPI_KEY}`,
        transform: (data: any) => ({
          city: data.city,
          region: data.region_name,
          country: data.country_name,
          lat: data.latitude,
          lon: data.longitude,
        }),
      },
      {
        url: "https://ipapi.co/json/",
        transform: (data: any) => ({
          city: data.city,
          region: data.region,
          country: data.country_name,
          lat: data.latitude,
          lon: data.longitude,
        }),
      },
    ];

    for (const api of APIs) {
      try {
        const response = await fetch(api.url);
        if (response.ok) {
          const data = await response.json();
          return api.transform(data);
        }
      } catch (error) {
        console.error(`Error with ${api.url}:`, error);
        continue;
      }
    }

    return null;
  };

  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try browser geolocation first
      let latitude: number | undefined;
      let longitude: number | undefined;
      let locationString: string | null = null;

      try {
        const position = await getBrowserLocation();
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch (error) {
        console.log("Browser geolocation failed, falling back to IP-based location");
      }

      // If browser geolocation failed, try IP-based location
      if (!latitude || !longitude) {
        const ipLocation = await getIPBasedLocation();
        if (ipLocation) {
          latitude = ipLocation.lat;
          longitude = ipLocation.lon;
          locationString = `${ipLocation.city}, ${ipLocation.region}, ${ipLocation.country}`;
        }
      }

      // If we have coordinates, try to get a detailed address
      if (latitude && longitude) {
        const addressResult = await getAddressFromCoordinates(latitude, longitude);
        if (addressResult) {
          setAddress(addressResult);
        } else if (locationString) {
          setAddress(locationString);
        }
      }

      if (!address && !locationString) {
        throw new Error("Unable to determine location");
      }

    } catch (error) {
      console.error("Location fetch error:", error);
      setError("Unable to fetch location. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [getAddressFromCoordinates]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);



  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center px-2 mb-4 relative">
        <select
          name="location"
          id="location"
          className={`w-[15vw] h-10 px-2 py-2 text-sm rounded-lg focus:outline-none bg-white
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isLoading ? 'opacity-50 cursor-wait' : ''}
          `}
          value={address || currentLocation || ""}
          onChange={(e) => setCurrentLocation(e.target.value)}
          disabled={isLoading}
        >
          <option value="" disabled>
            {isLoading ? "Loading location..." : error ? "Location unavailable" : "Location"}
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
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {/* <Loader2 className="h-4 w-4 animate-spin" /> */}
          </div>
        )}
      </div>
      {/* {error && (
        <div className="flex flex-col items-center">
          <p className="text-red-500 text-sm mt-1">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-sm text-blue-500 hover:text-blue-700"
          >
            Retry
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Location;

