import React, { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Store search results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]); // Don't search if less than 3 characters
      return;
    }

    const fetchData = async () => {
      try {
        const url = `https://api.menrol.com/api/v1/searchCategory?service=${searchQuery}`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if 'data.data' exists and is an array
        if (Array.isArray(data.data)) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]); // Reset if the structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
        setSearchResults([]); // Reset results in case of an error
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounceFn); // Cleanup on component unmount
  }, [searchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const handleGoContact = () => {
    router.push("contactus");
  };

  const isActive = (path: string) =>
    pathname === path ? "font-bold text-blue-500" : "text-gray-800";

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="spinner border-t-blue-500 border-4 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}

      <header className="sticky top-0 z-50 flex items-center justify-between px-[10%] bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer hover:scale-105"
            onClick={() => handleNavigation("/")}
          />
        </div>

        <div className="flex justify-end ml-[40%]">
          <div className="flex flex-1 items-center mx-3 px-2">
            <select
              name="location"
              id="location"
              className="w-full h-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
            >
              <option value="">Choose location</option>
              <option value="chandigarh">Chandigarh</option>
              <option value="delhi">Delhi</option>
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

        <div className="flex items-center">
          <button className="focus:outline-none">
            <CgProfile className="text-xl" />
          </button>
        </div>
      </header>

      {/* Dropdown for displaying search results */}
      {searchResults.length > 0 && searchQuery.length >= 3 && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-lg z-50 max-h-60 overflow-y-auto border rounded-md mt-1">
          <ul>
            {searchResults.map((result) => (
              <li key={result._id} className="border-b hover:bg-blue-100">
                <div
                  className="p-4 cursor-pointer hover:text-blue-600"
                  onClick={() =>
                    router.push(
                      `/IndividualServices?data=${result._id}`
                    )
                  }
                >
                  <h4 className="font-semibold text-sm">{result?.category}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
