import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiBuildingsBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

interface Service {
  id: number;
  category: string;
  subcategory: Array<{
    title: string;
    image: string;
  }>;
}

const Supakling: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Fetch services data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data = await response.json();
        setServices(data.all || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Cycle through images
  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 1000); // Change image every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [services]);

  const getServiceImage = (offset: number) => {
    if (services?.length > 0) {
      const subcategory = services[currentIndex]?.subcategory[offset];
      return subcategory?.image || ""; // Return subcategory image
    }
    return ""; // Return empty string if services are empty
  };

  const handleService = () => {
    router.push("/ServiceDetails");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full min-h-[80vh]">
          {/* Left Column */}
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <div className="w-[70%] h-[500px] flex flex-col justify-between p-4">
              <h1 className="text-5xl  flex flex-col lg:text-5xl font-bold text-navy-900 leading-relaxed gap-8 h-60">
                Welcome to Menrol Force Hub
                <br />
                Your Trusted Skilled
                <br />
                Labor Partner!
              </h1>
              <p className="text-gray-600 text-lg">
                Looking for reliable workers for construction, plumbing,
                electrical work, or renovation? We connect you with skilled
                professionals, making hiring effortless and efficient.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-2 grid-rows-2 bg-white rounded-3xl w-full h-full min-h-[50vh] overflow-hidden">
              <div
                className="bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('${getServiceImage(0)}')` }}
              >
                <p className="text-white font-bold">
                  {services.length > 0
                    ? services[currentIndex]?.subcategory[0]?.title
                    : "Loading..."}
                </p>
              </div>
              <div className="bg-orange-500 flex items-center justify-center rounded-l-full space-x-4">
                <div className="text-white font-bold text-center">
                  <p className="text-7xl">150+</p>
                  <p className="text-xl max-w-[200px] mx-auto break-words">
                    Worldwide Country has lots of clients
                  </p>

                  {/* Circles below the second paragraph */}
                  <div className="flex justify-center mt-4 space-x-[-12px]">
                    {/* First circle with an image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/ServiceImg/Image-6.png"
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Second circle with an image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/majdur6.jpg"
                        alt="Image 2"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Third circle with an image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/majdur5.jpg"
                        alt="Image 3"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Fourth circle with text */}
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      5k+
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-500 flex flex-col items-center justify-center rounded-tr-[50%]">
                <div className="flex items-center group">
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    Data Security
                  </button>
                  <button className="border border-gray-300 text-white  py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">+</button>
                </div>

                <div className="flex items-center group">
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">+</button>
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    Web Development
                  </button>
                </div>

                <div className="flex items-center group">
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    Analytics & Optimization
                  </button>
                  <button className="border border-gray-300 text-white   py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">+</button>
                </div>

              </div>



              <div
                className="bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('${getServiceImage(1)}')` }}
              >
                <p className="text-white font-bold">
                  {services.length > 0
                    ? services[currentIndex]?.subcategory[1]?.title
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-[10%] py-12 ">
        {/* Buttons Section */}
        <div className="flex space-x-8">
          {/* Commercial Plumbing Button */}
          <button className="flex items-center space-x-3 px-20 py-12 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8  flex items-center justify-center rounded">
              <PiBuildingsBold className="text-5xl" />
            </div>
            {/* Text */}
            <span className="text-2xl font-medium">Commercial Plumbing</span>
          </button>

          {/* Residential Plumbing Button */}
          <button className="flex items-center space-x-3 px-20 py-4 bg-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded">
              <IoLocationOutline className="text-5xl" />
            </div>
            {/* Text */}
            <span className="text-2xl font-medium">Residential Plumbing</span>
          </button>
        </div>

        {/* Description Section */}
        <div className="text-center mt-12 w-[70%]">
          <h2 className="text-5xl font-bold text-gray-800">
            Best Service We Offer
          </h2>
          <p className="mt-4 text-gray-600 text-lg ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has been the industry's standard dummy text ever since
            the 1500s.
          </p>
        </div>
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between px-[10%] lg:px-20 py-12 bg-white">
        {/* Left Section - Image */}
        <div className="relative w-full flex justify-center items-center lg:w-1/2">
          <Image
            src="/Images/laptop.webp"
            alt="Placeholder"
            className="w-full -ml-40"
            height={1000}
            width={1000}
          />
          {/* Floating Elements */}
          <div className="absolute top-20 left-10">
            <Image
              src="/Images/glob.webp"
              alt="glob"
              className="w-full"
              height={50}
              width={50}
            />
          </div>
          <div className="absolute bottom-20 right-10">
            <Image
              src="/Images/about.webp"
              alt="about"
              className="w-full"
              height={50}
              width={50}
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 text-center lg:text-left">
          <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
            We are{" "}
            <span className="bg-pink-100 text-pink-600 font-medium px-2 py-1 ml-2 rounded-full">
              Techco
            </span>
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
            Our Commitment to Client Satisfaction
          </h1>
          <p className="text-gray-600 mt-4">
            At Techco, our commitment to client satisfaction is at the core of
            everything we do. We understand clients’ success.
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-6 space-y-2">
            <li>Grow your business the right way.</li>
            <li>Let business growth help your business grow.</li>
            <li>Helping you to get better.</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mt-6">
            {/* Get Started Button */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mt-6">
              <button
                className="bg-blue-600 h-12 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden"
                onClick={handleService}
              >
                <div className="flex flex-col">
                  <span className="relative group-hover:-translate-y-full">
                    Get Started →
                  </span>
                  <span className="absolute left-0 bottom-0 w-full transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
                    Get Started →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Supakling;
