import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
// Remove the unused import
// import { OlaMaps } from 'olamaps-web-sdk';

interface Location {
  type: string;
  coordinates: [number, number];
}

interface PlaceResult {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

// Define proper types for map and marker refs
interface OlaMapInstance {
  setCenter: (coords: [number, number]) => void;
  setZoom: (level: number) => void;
  addMarker: (options: { lngLat: [number, number], color: string } | [number, number]) => OlaMarker;
  removeMarker: (marker: OlaMarker) => void;
}

interface OlaMarker {
  // Add any marker properties you need to access
  id?: string;
}

interface MapProps {
  onAddressSave?: (address: string, location: Location) => void;
  userToken?: string;
  baseUrl?: string;
  subcategoryId?: string; // Add missing dependency
}

const Map: React.FC<MapProps> = ({
  onAddressSave,
  userToken,
  baseUrl = "https://api.menrol.com/api/v1/",
  subcategoryId // Add missing dependency 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<{
    address: string;
    location: Location;
  } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  // Fix any types
  const mapRef = useRef<OlaMapInstance | null>(null);
  const markerRef = useRef<OlaMarker | null>(null);

  const API_KEY = "rxMokzPXrhVgC0u414Bdl2JN1By2MIjLpoqsytwU";

  useEffect(() => {
    const loadMap = async () => {
      try {
        const { OlaMaps } = await import('olamaps-web-sdk');
        const olaMaps = new OlaMaps({ apiKey: API_KEY });
        const map = olaMaps.init({
          style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          container: 'map',
          center: [77.61648476788898, 12.931423492103944],
          zoom: 15,
        });
        mapRef.current = map as OlaMapInstance;  // Cast to our interface
      } catch (error) {
        console.error("Error loading map:", error);
        toast.error("Failed to load map");
      }
    };

    loadMap();
  }, []); // No dependencies needed here

  useEffect(() => {
    // Add click outside listener to close suggestions dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
            searchTerm
          )}&api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch suggestions: ${response.status}`);
        }

        const data = await response.json();

        if (data.predictions && Array.isArray(data.predictions)) {
          setSuggestions(data.predictions);
          setShowSuggestions(true);
        } else {
          console.warn("Unexpected API response format:", data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching place suggestions:", error);
        setSuggestions([]);
        toast.error("Failed to load address suggestions");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, subcategoryId]); // Include the missing dependency

  const getPlaceDetails = async (placeId: string): Promise<{ address: string; location: { lat: number; lng: number } }> => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/details?place_id=${placeId}&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch place details: ${response.status}`);
      }

      const data = await response.json();

      let location = null;
      let address = "";

      if (data.result) {
        address = data.result.formatted_address || data.result.description || "";

        if (data.result.geometry?.location) {
          location = data.result.geometry.location;
        }
      }

      if (!location) {
        const geocodeResponse = await fetch(
          `https://api.olamaps.io/maps/v1/geocode?address=${encodeURIComponent(address)}&api_key=${API_KEY}`
        );

        if (!geocodeResponse.ok) {
          throw new Error(`Failed to geocode address: ${geocodeResponse.status}`);
        }

        const geocodeData = await geocodeResponse.json();

        if (geocodeData.results && geocodeData.results[0]?.geometry?.location) {
          location = geocodeData.results[0].geometry.location;
        } else {
          throw new Error("Could not find location coordinates");
        }
      }

      return { address, location };
    } catch (error) {
      console.error("Error getting place details:", error);
      throw error;
    }
  };

  const handlePlaceSelect = async (place: PlaceResult) => {
    setSearchTerm(place.description);
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const placeDetails = await getPlaceDetails(place.place_id);

      const coordinates: Location = {
        type: "Point",
        coordinates: [placeDetails.location.lng, placeDetails.location.lat],
      };

      // Center the map at the selected location
      if (mapRef.current) {
        mapRef.current.setCenter([placeDetails.location.lng, placeDetails.location.lat]);
        mapRef.current.setZoom(16); // Zoom in a bit more for better visibility

        // Remove any existing marker
        if (markerRef.current) {
          mapRef.current.removeMarker(markerRef.current);
        }

        // Add a new marker
        try {
          // Using the correct method to add a marker based on OlaMaps SDK
          // Note: The actual method may vary depending on the specific SDK version
          const marker = mapRef.current.addMarker({
            lngLat: [placeDetails.location.lng, placeDetails.location.lat],
            color: "#FF0000", // Red color for better visibility
          });
          markerRef.current = marker;
        } catch (markerError) {
          console.error("Error adding marker:", markerError);
          // Try alternative marker method if the first one fails
          try {
            const marker = mapRef.current.addMarker([placeDetails.location.lng, placeDetails.location.lat]);
            markerRef.current = marker;
          } catch (fallbackError) {
            console.error("Fallback marker also failed:", fallbackError);
          }
        }
      }

      // Set the selected place AFTER map/marker operations
      setSelectedPlace({
        address: placeDetails.address || place.description,
        location: coordinates
      });

      // Show success toast AFTER setting the selected place
      toast.success("Address selected successfully");
    } catch (error) {
      console.error("Error selecting place:", error);
      toast.error("Failed to select address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!selectedPlace) {
      toast.error("Please select an address first");
      return;
    }

    if (!userToken) {
      toast.error("You must be logged in to save addresses");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}addUserAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          coordinates: selectedPlace.location.coordinates,
          address: selectedPlace.address,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // toast.success("Address saved successfully!");
        if (onAddressSave) {
          onAddressSave(selectedPlace.address, selectedPlace.location);
        }
        setSelectedPlace(null);
        setSearchTerm("");

        // Remove marker when address is saved
        if (mapRef.current && markerRef.current) {
          mapRef.current.removeMarker(markerRef.current);
          markerRef.current = null;
        }
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("An error occurred while saving the address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for an address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSuggestions([]);
              setSelectedPlace(null);
              // Remove marker when clearing the search
              if (mapRef.current && markerRef.current) {
                mapRef.current.removeMarker(markerRef.current);
                markerRef.current = null;
              }
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}

        {isLoading && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handlePlaceSelect(suggestion)}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
            >
              <div className="font-medium">
                {suggestion.structured_formatting?.main_text || suggestion.description.split(',')[0]}
              </div>
              {suggestion.structured_formatting?.secondary_text ? (
                <div className="text-sm text-gray-500">
                  {suggestion.structured_formatting.secondary_text}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium">Selected Address: {selectedPlace.address}</p>
          <button
            onClick={handleSaveAddress}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Address"}
          </button>
        </div>
      )}

      <div id="map" className="h-96 mt-4 rounded-lg shadow-md"></div>
    </div>
  );
};

export default Map;