import React, { useState, useEffect, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";
import Script from "next/script";
import "./Language.css";
import Cart from "./Cart";
import Image from "next/image";
import Location from "./Location";

// Custom hook for typing effect
const useTypingEffect = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = ["Electrician", "Painter", "Cleaning services", "Plumber"];

  useEffect(() => {
    let mounted = true;
    let typingTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let wordTimeout: NodeJS.Timeout;

    const typeWord = () => {
      const currentWord = words[currentIndex];
      let charIndex = 0;

      const type = () => {
        if (!mounted) return;

        if (charIndex <= currentWord.length) {
          setCurrentText(currentWord.slice(0, charIndex));
          charIndex++;
          typingTimeout = setTimeout(type, 100);
        } else {
          pauseTimeout = setTimeout(deleteWord, 2000);
        }
      };

      type();
    };

    const deleteWord = () => {
      const currentWord = words[currentIndex];
      let charIndex = currentWord.length;

      const erase = () => {
        if (!mounted) return;

        if (charIndex >= 0) {
          setCurrentText(currentWord.slice(0, charIndex));
          charIndex--;
          typingTimeout = setTimeout(erase, 50);
        } else {
          const nextIndex = (currentIndex + 1) % words.length;
          setCurrentIndex(nextIndex);
          wordTimeout = setTimeout(typeWord, 500);
        }
      };

      erase();
    };

    typeWord();

    return () => {
      mounted = false;
      clearTimeout(typingTimeout);
      clearTimeout(pauseTimeout);
      clearTimeout(wordTimeout);
    };
  }, [currentIndex]);

  return currentText;
};

// Types
interface UserInfo {
  token: string;
  name: string;
  phone: string;
  email: string;
  [key: string]: string | number | boolean | null;
}

interface SearchResult {
  _id: string;
  category: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const router = useRouter();
  const typedText = useTypingEffect();
  const dynamicPlaceholder = `Search for a ${typedText}`;

  // Update login state and user data on storage change
  useEffect(() => {
    const syncLoginState = () => {
      const storedUser = localStorage.getItem("user-info");
      setIsLoggedIn(!!storedUser);
      if (storedUser) setUserData(JSON.parse(storedUser));
    };

    window.addEventListener("storage", syncLoginState);
    syncLoginState();
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  // Search functionality
  const fetchData = useCallback(async () => {
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
  }, [searchQuery]);

  const handleSearchResultClick = (resultTitle: string) => {
    const encodedTitle = encodeURIComponent(resultTitle);
    router.push(`/IndividualServices?data=${encodedTitle}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchData]);

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
          <Image
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer"
            onClick={() => router.push("/")}
            width={200}
            height={200}
          />
        </div>

        {/* Middle Section: Search & Location */}
        <div className="flex justify-end ml-[30%]">
          <div className="flex flex-row items-center justify-center px-2 pt-5">
            <Location />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center mx-6">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder={dynamicPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            {/* Search Results Dropdown */}
            {searchResults?.length > 0 && searchQuery?.length >= 3 && (
              <div className="absolute top-[60px] w-[12vw] bg-white shadow-lg z-50 max-h-60 overflow-y-auto border rounded-md mt-1">
                <ul>
                  {searchResults?.map((result) => (
                    <li key={result._id} className="border-b hover:bg-blue-100">
                      <div
                        className="p-4 cursor-pointer hover:text-blue-600"
                        onClick={() => handleSearchResultClick(result?._id)}
                      >
                        <h4 className="font-semibold text-sm">
                          {result?.category}
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Language Dropdown */}
        <div
          id="google_translate_element"
          className="check-text border p-3 rounded-xl"
        ></div>

        {/* Right Section: Profile & Login */}
        <div>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="bg-blue-500 h-[3rem] rounded-full text-white px-4 py-2 ml-3"
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
              className="focus:outline-none bg-blue-500 text-white px-4 ml-3 py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-600"
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
        <Cart />
      </header>

      {/* Google Translate Scripts */}
      <Script
        id="google-translate"
        strategy="lazyOnload"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
      <Script id="google-translate-init" strategy="lazyOnload">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,pa',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              },
              'google_translate_element'
            );
          }
        `}
      </Script>

      <style jsx global>{`
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
          visibility: hidden !important;
        }

        body {
          top: 0 !important;
        }
      `}</style>
    </>
  );
};

export default Header;
