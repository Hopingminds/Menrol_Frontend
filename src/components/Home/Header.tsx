"use client";
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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { MdLocationPin } from "react-icons/md";
import { MdLanguage } from "react-icons/md";

// Custom hook for typing effect
export const useTypingEffect = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const wordsRef = useRef(["Electrician", "Painter", "Cleaning ", "Plumber"]);

  useEffect(() => {
    let mounted = true;
    let typingTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let wordTimeout: NodeJS.Timeout;

    const typeWord = () => {
      const currentWord = wordsRef.current[currentIndex];
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
      const currentWord = wordsRef.current[currentIndex];
      let charIndex = currentWord.length;

      const erase = () => {
        if (!mounted) return;

        if (charIndex >= 0) {
          setCurrentText(currentWord.slice(0, charIndex));
          charIndex--;
          typingTimeout = setTimeout(erase, 50);
        } else {
          const nextIndex = (currentIndex + 1) % wordsRef.current.length;
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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const router = useRouter();
  const typedText = useTypingEffect();
  const dynamicPlaceholder = `Search for a ${typedText}`;

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

  const fetchData = useCallback(async () => {
    try {
      const url = `https://api.menrol.com/api/v1/searchSubCategoryInAllCategories?subcategory=${searchQuery}`;
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
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleOrderDetails = () => {
    router.push("/orderdetails");
  };

  function handleCloseModal() {
    setIsProfileModalOpen(false);
  }

  return (
    <>
      <ToastContainer />
      <header className="sticky top-0 z-50 flex items-center justify-between px-[7%] bg-[#FFFFFF] shadow-md   xsm:w-full">
        <div className="">
          <Image
            src="/Images/logo2.png"
            alt="Logo"
            className="lg:h-16 lg:w-16 md:w-14 md:h-14 xsm:w-12 xsm:h-12 w-16  cursor-pointer md:mr-2"
            onClick={() => router.push("/")}
            width={500}
            height={200}
          />
        </div>

        <div
          className={` flex  justify-between items-center rounded-lg bg-[#FFFFFF] shadow-md border h-[3rem] xsm:h-[2rem]  xsm:w-[50%] xsm:rounded-md  `}
        >
          <div className="flex flex-row items-center justify-center px-2 pt-5 xsm:hidden ">
            <div className="flex items-center justify-center w-full ">
              <MdLocationPin className="text-[#FF7E8B] lg:text-xl md:text-sm  ml-2 mb-4" />
              <Location />
            </div>
          </div>
          <span className="text-[#DADADA] md:text-xl lg:text-2xl font-light xsm:hidden">
            |
          </span>

          <div className="flex flex-1 items-center md:mx-2 lg:mx-6">
            <div className="relative w-[13vw] xsm:w-full xsm:h-[2rem]">
              <IoSearchOutline className="absolute xsm:text-[13px] xsm:hidden top-1/2 transform -translate-y-1/2 text-gray-500 text-lg md:hidden lg:block" />
              <input
                type="text"
                placeholder={dynamicPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10  xsm:px-4  md:px-0 lg:px-6 xsm:py-0 py-2 xsm:pt-2 text-sm rounded-lg focus:outline-none"
              />
            </div>
            <span className="text-[#DADADA] text-2xl font-light xsm:hidden">
              |
            </span>

            {searchQuery?.length >= 3 && (
              <div className="absolute top-[60px] bg-white shadow-lg z-50 max-h-60 overflow-y-auto rounded-md mt-1">
                {searchResults?.length > 0 ? (
                  <ul>
                    {searchResults.map((result) => (
                      <li
                        key={result._id}
                        className="border-b hover:bg-blue-100"
                      >
                        <div
                          className="p-4 cursor-pointer hover:text-blue-600"
                          onClick={() => handleSearchResultClick(result._id)}
                        >
                          <h4 className="font-semibold text-xs">
                            {result.category}
                          </h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="xsm:hidden flex items-center justify-center">
            <MdLanguage className="lg:text-xl font-extralight md:text-sm" />
            <div
              id="google_translate_element"
              className="check-text p-3 rounded-xl bg-white"
            ></div>
          </div>
        </div>
        <div className={`flex justify-center lg:gap-2`}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="bg-[#0054A5] lg:h-[3rem] lg:w-[3rem] md:w-[2rem] md:h-[2rem] w-[3rem] xsm:h-[2rem] xsm:w-[2rem] xsm:px-2 rounded-full text-white md:px-2 lg:px-4 py-2 ml-3"
              >
                <FaUserCircle />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul>
                    <li
                      className="px-4 py-2 cursor-pointer rounded-t-lg hover:bg-gray-100"
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
                      className="px-4 py-2 cursor-pointer rounded-b-lg hover:bg-gray-100"
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
              className="focus:outline-none md:text-xs lg:text-base text-black  "
              onClick={() => setIsModalOpen(true)}
            >
              <span className="flex justify-center items-center gap-4 xsm:gap-1 xsm:text-[12px]">
                <span className="hover:text-blue-500 transition-all duration-500">
                  Login
                </span>{" "}
                <span>|</span>{" "}
                <span className="hover:text-blue-500 transition-all duration-500">
                  signup
                </span>
              </span>
            </button>
          )}

          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isLoginMode={isLoginMode}
            setIsLoginMode={setIsLoginMode}
          />

          {isProfileModalOpen && (
            <ProfileModal
              isModalOpen={isProfileModalOpen}
              onClose={handleCloseModal}
              userData={userData}
            />
          )}
          {isLoggedIn && <Cart />}
        </div>
      </header>

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
