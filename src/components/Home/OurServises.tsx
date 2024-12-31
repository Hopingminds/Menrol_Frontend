import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SubCategory {
  _id: string;
  title: string;
  image: string;
  description: string;
  dailyWageWorker: number;
  contractWorker: number;
  hourlyWorker: number;
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: SubCategory[];
}

interface ApiResponse {
  success: boolean;
  all: Service[];
}

const OurServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const HandleGoServices = () => {
    router.push("/ServiceDetails");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data: ApiResponse = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          setServices(data.all);
        } else {
          console.log("API returned success=false");
          setError("Failed to load services.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services.");
      }
    };

    fetchServices();
  }, []);

  const handleServiceDetails = (id: string) => {
    setLoading(true);
    router.push(`/IndividualServices?data=${id}`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <div className="gap-4 px-[10%] xsm:p-6 relative xl:mt-20">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin w-16 h-16 rounded-full" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-white z-50">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-row justify-between w-full items-center">
        <div className="font-lexend">
          <h1 className="text-[#24232A] xl:text-[50px] xsm:text-[15px] sm:text-[36px] md:text-[26px] font-bold tracking-wide leading-relaxed">
            Make Life Simple with our
          </h1>
          <h1 className="text-[#24232A] xl:text-[50px] xsm:text-[15px] sm:text-[36px] md:text-[26px] font-bold tracking-[0.05em]">
            go-to Service app
          </h1>
        </div>

        <button
          onClick={HandleGoServices}
          className="group relative inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-[160px] h-[60px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient" />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl" />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="glitter-container">
              <div className="glitter" />
              <div className="glitter" />
              <div className="glitter" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="wave" />
          </div>
          <span className="relative z-10 flex items-center gap-2">
            <span className="tracking-wider">View All</span>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <Slider {...sliderSettings} className="pt-6">
          {services?.map((service) => (
            <div key={service._id} className="p-1">
              <div className="flex flex-col items-center">
                <div className="relative w-[280px] h-[220px] mx-auto rounded-lg border border-black transition-all duration-300 hover:shadow-xl shadow-lg">
                  <Image
                    src={service.categoryImage}
                    alt={service.category}
                    className="w-full h-full object-cover rounded-lg"
                    height={220}
                    width={260}
                  />
                </div>
                <h3 className="mt-3 text-center font-semibold text-[#24232A]">
                  {service.category}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {services?.map((service) => (
        <div key={service._id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{service.category} Services</h2>
          <Slider {...sliderSettings} className="pt-6">
            {service.subcategory?.map((subCat) => (
              <div key={subCat._id} className="p-1">
                <div className="flex flex-col items-center">
                  <div className="relative w-[280px] h-[220px] mx-auto rounded-lg transition-all duration-300 hover:shadow-xl shadow-lg">
                    <Image
                      src={subCat.image}
                      alt={subCat.title}
                      className="w-full h-full object-cover rounded-lg"
                      height={220}
                      width={180}
                      onClick={() => handleServiceDetails(service._id)}
                    />
                  </div>
                  <h3 className="mt-3 text-center font-semibold text-[#24232A]">
                    {subCat.title}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default OurServices;