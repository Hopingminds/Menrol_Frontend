"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { toast } from "react-toastify";

// Defining a UserInfo interface for type safety
interface UserInfo {
  token: string;
}

const Map: React.FC = () => {
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

  // Retrieve userInfo from localStorage
  const storedUserInfo = localStorage.getItem("user-info");
  const userInfo: UserInfo | null = storedUserInfo
    ? JSON.parse(storedUserInfo)
    : null;

  // Handle map click and select location
  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const geocoder = new google.maps.Geocoder();

      try {
        const { results } = await geocoder.geocode({ location: { lat, lng } });

        setSelectedLocation({
          lat,
          lng,
          address: results?.[0]?.formatted_address || "Address not found",
        });
      } catch (error) {
        // console.error("Geocoding error: ", error);
      }
    }
  };

  // Save the selected address to the server
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
      fetchSavedAddress(); // Call the fetch function after saving
    } catch (error) {
      console.error("Error saving address: ", error);
      toast.error("An error occurred while saving the address.");
    }
  };

  // Fetch saved address and display it
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
  }, [userInfo]); // Add userInfo as a dependency

  // Get user's current location
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
  }, [fetchSavedAddress]); // Add fetchSavedAddress as a dependency

  const handlePlaceSelect = () => {
    if (searchBox) {
      const place = searchBox.getPlace();

      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setSelectedLocation({
          lat,
          lng,
          address: place.formatted_address || "Address not found",
        });

        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(14);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"
      libraries={["places"]}
      id="google-map-load-script" // Add the 'id' prop here
    >
      <div style={{ position: "relative", height: "100%" }}>
        <Autocomplete
          onLoad={(autocomplete) => setSearchBox(autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a location"
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: "300px",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={13}
          onClick={handleMapClick}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
            >
              <div>
                Latitude: {selectedLocation.lat}, Longitude:{" "}
                {selectedLocation.lng}
                <br />
                Address: {selectedLocation.address}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <div style={{ marginTop: "20px", padding: "10px" }}>
          <button
            onClick={handleSaveAddress}
            style={{
              marginRight: "10px",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Address
          </button>

          <input
            type="text"
            value={selectedLocation?.address || ""}
            readOnly
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "300px",
            }}
          />
        </div>
      </div>
    </LoadScript>
  );
};

export default Map;
