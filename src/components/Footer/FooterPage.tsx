"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterPage = () => {
  return (
    <footer className="px-[10%] pt-10 bg-[#121212] text-white mt-[10vh]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <Link href="/" passHref>
            <Image
              src="/Images/MenrolLogo.png"
              alt="Placeholder"
              className="w-auto h-auto rounded-lg object-cover hover:scale-105"
              height={200}
              width={200}
            />
          </Link>
          <p className="text-sm pt-6 font-dm-sans tracking-wide leading-relaxed">
            Trusted home services at your fingertips, anytime, anywhere.
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/ServiceDetails"
                className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Home Cleaning
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Office Cleaning
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Kitchen Cleaning
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
                Vehicle Cleaning
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscribe to Newsletter Section */}
        <div>
          <h3 className="text-[18px] text-[#FFFFFF] font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">
            Subscribe to Newsletter
          </h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-6 mb-4 rounded-full p-4 bg-[#F9F9FE] text-[#121212] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-[9vw] xsm:w-full sm:w-full md:w-full rounded-full bg-[#0054A5] p-4 hover:bg-blue-700 font-dm-sans tracking-wide leading-relaxed">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <hr className="my-8 border-gray-700" />
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-dm-sans tracking-wide leading-relaxed">
        <p>Copyright &copy; 2024 Menrol</p>
        <p className="flex space-x-4">
          <Link href="#" className="hover:underline decoration-blue-500">
            Terms of Use
          </Link>
          <span>|</span>
          <Link href="#" className="hover:underline decoration-blue-500 font-dm-sans tracking-wide leading-relaxed">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
