"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Pricing {
  pricingtype: string;
  from: number;
  to: number;
  _id: string;
}

interface Subcategory {
  description: string | null;
  dailyWageWorker: number;
  hourlyWorker: number;
  contractWorker: number;
  title: string;
  image: string;
  _id: string;
  pricing: Pricing[];
}

interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
  subcategory: Subcategory[];
}

interface ApiResponse {
  success: boolean;
  all: Service[];
}

const FooterPage = () => {
  const pathname = usePathname();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data: ApiResponse = await response.json();

        if (data.success) {
          setServices(data.all);
        } else {
          setError("Failed to load services.");
        }
      } catch (error) {
        setError("Failed to load services.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceDetails = (serviceId: string) => {
    router.push(`/IndividualServices?data=${encodeURIComponent(serviceId)}`);
  };

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Thank you for subscribing!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const isActive = (link: string) =>
    pathname === link ? "text-blue-500 font-bold" : "text-white";

  return (
    <footer className="px-[10%] pt-10 bg-[#121212] text-white mt-[3vh]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <Link href="/" passHref>
            <Image
              src="/Images/whitelogo.png"
              alt="Placeholder"
              className="w-auto h-auto rounded-lg object-cover"
              height={500}
              width={200}
            />
          </Link>
          <p className="text-sm w-[80%] pt-6 font-dm-sans tracking-wide leading-relaxed">
            Trusted home services at your fingertips, anytime, anywhere.
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">
            Navigation
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className={`hover:text-[#0054A5] decoration-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`hover:text-[#0054A5] decoration-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed ${isActive(
                  "/about"
                )}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/ServiceDetails"
                className={`hover:text-[#0054A5] decoration-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed ${isActive(
                  "/ServiceDetails"
                )}`}
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className={`hover:text-[#0054A5] decoration-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed ${isActive(
                  "/careers"
                )}`}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className={`hover:text-[#0054A5] decoration-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed ${isActive(
                  "/contactus"
                )}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">
            Services
          </h3>
          <ul className="space-y-2">
            {loading ? (
              <li>Loading services...</li>
            ) : error ? (
              <li>{error}</li>
            ) : (
              services.slice(0, 4).map((service) => (
                <li key={service._id}>
                  <button
                    onClick={() => handleServiceDetails(service._id)}
                    className={` decoration-[#0054A5] hover:text-[#0054A5] transition-all duration-300 font-dm-sans tracking-wide leading-relaxed text-left ${pathname ===
                      `/IndividualServices?data=${encodeURIComponent(
                        service._id
                      )}`
                      ? "text-[#0054A5] font-bold"
                      : "text-white"
                      }`}
                  >
                    {service.category}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-[18px] text-[#FFFFFF] font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">
            Subscribe for updates
          </h3>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-6 mb-4 rounded-xl p-4 bg-[#F9F9FE] text-[#121212] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-[9vw] xsm:w-full sm:w-full md:w-full rounded-xl bg-[#0054A5] p-4 hover:bg-blue-700 font-dm-sans tracking-wide leading-relaxed">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <hr className="my-8 border-gray-700" />

      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-dm-sans tracking-wide leading-relaxed">
        <p className="mb-10">Copyright &copy; {currentYear} Menrol</p>
        <p className="flex space-x-4 mb-10">
          <Link href="/terms" className="hover:underline decoration-[#0054A5]">
            Terms of Use
          </Link>
          <span>|</span>
          <Link
            href="/privacy"
            className="hover:underline decoration-[#0054A5] font-dm-sans tracking-wide leading-relaxed"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      <ToastContainer />
    </footer>
  );
};

export default FooterPage;
