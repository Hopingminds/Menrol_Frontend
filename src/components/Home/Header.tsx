import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

// Custom hook for typing effect
export const useTypingEffect = () => {
  const [currentText, setCurrentText] = useState<string>(""); // Current text being typed
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current word index
  const wordsRef = useRef(["Electrician", "Painter", "Cleaning services", "Plumber"]); // Store words in a ref

  useEffect(() => {
    let mounted = true; // Tracks if the component is mounted
    let typingTimeout: NodeJS.Timeout; // Timeout for typing effect
    let pauseTimeout: NodeJS.Timeout; // Timeout for pause after typing
    let wordTimeout: NodeJS.Timeout; // Timeout before typing next word

    // Function to type a word
    const typeWord = () => {
      const currentWord = wordsRef.current[currentIndex]; // Get the current word
      let charIndex = 0; // Index of character being typed

      const type = () => {
        if (!mounted) return;

        if (charIndex <= currentWord.length) {
          setCurrentText(currentWord.slice(0, charIndex)); // Update the displayed text
          charIndex++;
          typingTimeout = setTimeout(type, 100); // Type the next character
        } else {
          pauseTimeout = setTimeout(deleteWord, 2000); // Pause before deleting the word
        }
      };

      type();
    };

    // Function to delete a word
    const deleteWord = () => {
      const currentWord = wordsRef.current[currentIndex]; // Get the current word
      let charIndex = currentWord.length; // Start deleting from the end of the word

      const erase = () => {
        if (!mounted) return;

        if (charIndex >= 0) {
          setCurrentText(currentWord.slice(0, charIndex)); // Update the displayed text
          charIndex--;
          typingTimeout = setTimeout(erase, 50); // Delete the next character
        } else {
          const nextIndex = (currentIndex + 1) % wordsRef.current.length; // Move to the next word
          setCurrentIndex(nextIndex); // Update the current word index
          wordTimeout = setTimeout(typeWord, 500); // Start typing the next word
        }
      };

      erase();
    };

    typeWord(); // Start the typing effect

    // Cleanup function
    return () => {
      mounted = false; // Mark as unmounted
      clearTimeout(typingTimeout); // Clear typing timeout
      clearTimeout(pauseTimeout); // Clear pause timeout
      clearTimeout(wordTimeout); // Clear word timeout
    };
  }, [currentIndex]); // Dependency array includes only `currentIndex`

  return currentText; // Return the current text being typed
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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [currentLocation, setCurrentLocation] = useState<string>("");
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
    toast.success("Logged out successfully!", {
      position: "top-right",  // You can change the position as needed
      autoClose: 5000,  // Duration for the toast to stay
      hideProgressBar: false,  // Show progress bar
      closeOnClick: true,  // Allow closing by clicking on the toast
      pauseOnHover: true,
      theme: "colored",  // Pause on hover
    });
  };



  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleOrderDetails = () => {
    router.push("/orderdetails");
  };

  return (
    <>
      <ToastContainer />
      <header className="sticky top-0 z-50 flex items-center justify-between px-[7%] bg-white shadow-md  xsm:w-[370px]">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2 xsm:border  xsm:w-[10%]">
          <Image
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto  md:h-20 md:w-auto cursor-pointer"
            onClick={() => router.push("/")}
            width={200}
            height={200}
          />
        </div>

        {/* Middle Section: Search & Location */}
        <div className="flex justify-end ml-[30%] xsm:ml-0 xsm:hidden">
          <div className="flex flex-row items-center justify-center px-2 pt-5">
            <Location />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center mx-6 ">
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
            {searchQuery?.length >= 3 && (
              <div className="absolute top-[60px] w-[12vw] bg-white shadow-lg z-50 max-h-60 overflow-y-auto border rounded-md mt-1">
                {searchResults?.length > 0 ? (
                  <ul>
                    {searchResults.map((result) => (
                      <li key={result._id} className="border-b hover:bg-blue-100">
                        <div
                          className="p-4 cursor-pointer hover:text-blue-600"
                          onClick={() => handleSearchResultClick(result._id)}
                        >
                          <h4 className="font-semibold text-sm">{result.category}</h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">No results found</div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Language Dropdown */}
        <div
          id="google_translate_element"
          className="check-text p-3 rounded-xl border "
        ></div>

        {/* Right Section: Profile & Login */}
        <div >
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="bg-[#0054A5] h-[3rem] rounded-full text-white px-4 py-2 ml-3"
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
                      onClick={handleOrderDetails}
                    >
                      Order Details
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
              className="focus:outline-none bg-[#0054A5] text-white px-4 ml-3 py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#0054A5]"
              onClick={() => setIsModalOpen(true)}
            >
              Login/signup
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

        {/* Cart button visibility */}
        {isLoggedIn && <Cart />}
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
