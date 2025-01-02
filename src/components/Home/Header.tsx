import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  // Update login state and user data on storage change
  useEffect(() => {
    const syncLoginState = () => {
      const storedUser = localStorage.getItem("user-info");
      setIsLoggedIn(!!storedUser);
      if (storedUser) setUserData(JSON.parse(storedUser));
    };

    window.addEventListener("storage", syncLoginState);

    // Initial state check
    syncLoginState();

    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData(null);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-[7%] bg-white shadow-md">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Middle Section: Search & Location */}
        <div className="flex justify-end ml-[30%]">
          <div className="flex flex-1 items-center px-2">
            <select
              name="location"
              id="location"
              className="w-[15vw] h-10 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
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

          {/* Search Bar */}
          <div className="flex flex-1 items-center mx-6">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search for a category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Section: Profile & Login */}
        <div>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="bg-blue-500 h-[3rem] rounded-full text-white px-4 py-2"
              >
                <FaUserCircle />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              className="focus:outline-none bg-blue-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          )}

          {/* Login Modal */}
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isLoginMode={isLoginMode}
            setIsLoginMode={setIsLoginMode}
          />

          {/* Profile Modal */}
          <ProfileModal
            isModalOpen={isProfileModalOpen}
            setIsModalOpen={setIsProfileModalOpen}
            userData={userData}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
