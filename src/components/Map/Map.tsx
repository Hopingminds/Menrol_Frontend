"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { toast } from "react-toastify";

interface UserInfo {
  token: string;
}

interface MapProps {
  customLocations?: Array<{
    lat: number;
    lng: number;
    title?: string;
  }>;
  showSearchBox?: boolean;
  enableAddressSelection?: boolean;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
}

const Map: React.FC<MapProps> = ({
  customLocations = [],
  showSearchBox = true,
  enableAddressSelection = true,
  onLocationSelect,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string | null;
  } | null>(null);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [searchBox, setSearchBox] = 
    useState<google.maps.places.Autocomplete | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const defaultCenter = currentLocation || { lat: 51.505, lng: -0.09 };

  const storedUserInfo = localStorage.getItem("user-info");
  const userInfo: UserInfo | null = storedUserInfo
    ? JSON.parse(storedUserInfo)
    : null;

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!enableAddressSelection) return;
    
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const geocoder = new google.maps.Geocoder();

      try {
        const { results } = await geocoder.geocode({ location: { lat, lng } });
        const newLocation = {
          lat,
          lng,
          address: results?.[0]?.formatted_address || "Address not found",
        };
        
        setSelectedLocation(newLocation);
        onLocationSelect?.(newLocation);
      } catch (error) {
        console.error("Geocoding error: ", error);
      }
    }
  };

  const handleSaveAddress = async () => {
    if (!selectedLocation || !userInfo) {
      toast.error("User information or location is missing!");
      return;
    }

    try {
      const response = await fetch(
        "https://api.menrol.com/api/v1/addUserAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token}`,
          },
          body: JSON.stringify({
            coordinates: [selectedLocation?.lat, selectedLocation?.lng],
            address: selectedLocation?.address,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response: ", errorData);
        toast.error(`Failed to save address: ${response.statusText}`);
        return;
      }

      toast.success("Successfully added your address!");
      fetchSavedAddress();
    } catch (error) {
      console.error("Error saving address: ", error);
      toast.error("An error occurred while saving the address.");
    }
  };

  const fetchSavedAddress = useCallback(async () => {
    if (!userInfo) {
      console.error("No userInfo found");
      return;
    }

    try {
      const response = await fetch("https://api.menrol.com/api/v1/getUser", {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.user.SavedAddresses);
      } else {
        console.error("Error fetching saved address: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching saved address: ", error);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
          setCurrentLocation({ lat: 51.505, lng: -0.09 });
        }
      );
    }

    fetchSavedAddress();
  }, [fetchSavedAddress]);

  const handlePlaceSelect = () => {
    if (searchBox) {
      const place = searchBox.getPlace();

      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newLocation = {
          lat,
          lng,
          address: place.formatted_address || "Address not found",
        };

        setSelectedLocation(newLocation);
        onLocationSelect?.(newLocation);

        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(14);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"
      libraries={["places"]}
      id="google-map-load-script"
    >
      <div style={{ position: "relative", height: "100%" }}>
        {showSearchBox && (
          <Autocomplete
            onLoad={(autocomplete) => setSearchBox(autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a location"
              className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-72 p-2 text-base border border-gray-300 rounded"
            />
          </Autocomplete>
        )}

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={13}
          onClick={handleMapClick}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {customLocations.map((location, index) => (
            <Marker
              key={`custom-${index}`}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.title}
            />
          ))}

          {selectedLocation && (
            <>
              <Marker
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
              />
              <InfoWindow
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
              >
                <div>
                  <p>Latitude: {selectedLocation.lat}</p>
                  <p>Longitude: {selectedLocation.lng}</p>
                  <p>Address: {selectedLocation.address}</p>
                </div>
              </InfoWindow>
            </>
          )}
        </GoogleMap>

        {enableAddressSelection && (
          <div className="mt-5 p-2">
            <button
              onClick={handleSaveAddress}
              className="mr-2 p-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer"
            >
              Save Address
            </button>

            <input
              type="text"
              value={selectedLocation?.address || ""}
              readOnly
              className="p-2 text-base border border-gray-300 rounded w-72"
            />
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default Map;
