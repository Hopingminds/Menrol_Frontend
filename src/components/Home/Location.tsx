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

// Separate interfaces for each API response
interface IPDataResponse {
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

interface IPAPIResponse {
  city: string;
  region_name: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

interface IPAPICoResponse {
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

type APIConfigItem = {
  url: string;
} & (
    | {
      type: "ipdata";
      transform: (data: IPDataResponse) => LocationData;
    }
    | {
      type: "ipapi";
      transform: (data: IPAPIResponse) => LocationData;
    }
    | {
      type: "ipapico";
      transform: (data: IPAPICoResponse) => LocationData;
    }
  );

const Location = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const IPDATA_API_KEY = process.env.NEXT_PUBLIC_IPDATA_API_KEY;
  const IPAPI_KEY = process.env.NEXT_PUBLIC_IPAPI_KEY;

  const getAddressFromCoordinates = useCallback(async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      const googleResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      if (googleResponse.ok) {
        const data = await googleResponse.json();
        if (data.status === "OK") {
          return data.results[0]?.formatted_address || null;
        }
      }

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
    const APIs: APIConfigItem[] = [
      {
        type: "ipdata",
        url: `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`,
        transform: (data: IPDataResponse) => ({
          city: data.city,
          region: data.region,
          country: data.country_name,
          lat: data.latitude,
          lon: data.longitude,
        }),
      },
      {
        type: "ipapi",
        url: `https://api.ipapi.com/api/check?access_key=${IPAPI_KEY}`,
        transform: (data: IPAPIResponse) => ({
          city: data.city,
          region: data.region_name,
          country: data.country_name,
          lat: data.latitude,
          lon: data.longitude,
        }),
      },
      {
        type: "ipapico",
        url: "https://ipapi.co/json/",
        transform: (data: IPAPICoResponse) => ({
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
          const rawData = await response.json();
          switch (api.type) {
            case "ipdata":
              return api.transform(rawData as IPDataResponse);
            case "ipapi":
              return api.transform(rawData as IPAPIResponse);
            case "ipapico":
              return api.transform(rawData as IPAPICoResponse);
          }
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
      let latitude: number | undefined;
      let longitude: number | undefined;
      let locationString: string | null = null;

      try {
        const position = await getBrowserLocation();
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch (error) {
        console.log("Browser geolocation failed, falling back to IP-based location");
        console.log(error);
      }

      if (!latitude || !longitude) {
        const ipLocation = await getIPBasedLocation();
        if (ipLocation) {
          latitude = ipLocation.lat;
          longitude = ipLocation.lon;
          locationString = `${ipLocation.city}, ${ipLocation.region}, ${ipLocation.country}`;
        }
      }

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
  }, [getAddressFromCoordinates, address]);

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
    </div>
  );
};

export default Location;