import React from 'react';
import FAQSection from "../../components/About/FaqSection";
import DynamicHeader from '@/components/About/DynamicHeader';
import Header from '@/components/Home/Header';
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";


const contactus: React.FC = () => {
    const images = [
        '/Images/plumber1.jpg',
        '/Images/plumber2.jpg',
        '/Images/plumber3.jpg',
        '/Images/plumber4.jpg',
        '/Images/plumber5.jpg',
        '/Images/plumber6.jpg',
    ];
    return (

        <section className="w-screen border border-black-500 ">
            <div>
                <Header></Header>
            </div>
            <div className='border w-full h-14'>
                <DynamicHeader title="contactus" />
            </div>
            <div className="flex flex-col lg:flex-row justify-around p-8 bg-gray-50 ">
                {/* Left Section */}
                <div className="flex-1 space-y-8 text-center lg:text-left px-24  ">
                    <h2 className="text-5xl font-bold text-gray-800 ">Get in Touch</h2>
                    <p className="text-gray-600">
                        Contact us now for expert guidance, quick responses, and solutions to your specific needs
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(0,84,165,1)] text-white rounded-md">
                                <i className="fas fa-phone"><FiPhone></FiPhone></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                                <p className="text-gray-600">+91 9193700050</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(0,84,165,1)] text-white rounded-md">
                                <i className="fas fa-envelope text-2xl"><CiMail></CiMail></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-800">Email</h4>
                                <p className="text-gray-600">hr@menrol.com</p>
                            </div>
                        </div>

                    </div>
                    <div className="w-full h-1  bg-blue-200 "></div>


                    <div className="text-gray-700 flex items-center">
                        <span className="text-green-600 bg-[rgba(36,35,42,1)] border border-green-600 rounded-md px-3 py-3">
                            12+
                        </span>
                        <span className="ml-3">Our customer service is ready to assist you</span>
                    </div>


                </div>

                {/* Right Section */}
                <div className="flex-1  p-6  rounded-lg w-[20%] ">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 w-full p-3  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your fullname..."
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email..."
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                className="mt-1 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your message here..."
                                rows={3}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-[35%] py-3 bg-[rgba(0,84,165,1)] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <section className="p-8 bg-white px-24">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="bg-[rgba(94,147,198,1)] rounded-md shadow-md h-48 flex items-center justify-center"
                        >
                            <img
                                src={image}
                                alt={`Gallery item ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </section>
            <div className='items-center'>
                <FAQSection></FAQSection>
            </div>
        </section>
    );
};

export default contactus;
