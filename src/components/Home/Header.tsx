import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const url = `https://api.menrol.com/api/v1/searchCategory?service=${searchQuery}`;
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
        setSearchResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchCurrentLocation = async () => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation is not supported by this browser.");
      setCurrentLocation("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet ||
            "Unknown city";
          const state = data.address.state || "Unknown state";

          setCurrentLocation(`${city}, ${state}`);
        } catch (error) {
          console.error("Error fetching location from API:", error);
          setCurrentLocation("Unable to fetch location");
        }
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        setCurrentLocation("Location not available");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleLocationClick = () => {
    fetchCurrentLocation();
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-[7%] bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer hover:scale-105"
            onClick={() => router.push("/")}
          />
        </div>

        <div className="flex justify-end ml-[30%]">
          <div className="flex flex-1 items-center px-2">
            <select
              name="location"
              id="location"
              className="w-[15vw] h-10 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
              onClick={handleLocationClick}
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            >
              <option value="">Choose location</option>
              <option value="current-location">Current location</option>
              {currentLocation && (
                <option value={currentLocation} disabled>
                  {currentLocation}
                </option>
              )}
            </select>
          </div>

          <div className="flex flex-1 items-center mx-6">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search for a category"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-4">
            <button
              className="focus:outline-none bg-blue-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-600"
              onClick={() => {
                setIsModalOpen(true);
                setIsLoginMode(true); // Open modal in login mode
              }}
            >
              Login
            </button>
          </div>

          {/* Conditionally render the LoginModal */}
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isLoginMode={isLoginMode}
            setIsLoginMode={setIsLoginMode}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
