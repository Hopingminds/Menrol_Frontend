"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface StatusState {
    type: string;
    message: string;
}

const GetInTouch = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<StatusState>({ type: '', message: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://api.menrol.com/api/v1/sendEmailQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully!'
                });
                // Clear form
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({
                    type: 'error',
                    message: data.message || 'Failed to send message. Please try again.'
                });
            }
        } catch (error) {
            console.log(error);
            setStatus({
                type: 'error',
                message: 'An error occurred. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row p-8 px-[7%] justify-between">
                {/* Left Section */}
                <div className="space-y-8 text-center xsm:text-start lg:text-left">
                    <h2 className="text-5xl font-bold text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600">
                        Contact us now for expert guidance, quick responses, and solutions to your specific needs
                    </p>
                    <div className="grid grid-cols-2 gap-10 xsm:gap-0">
                        <div className="flex items-center space-x-4 xsm:space-x-0 xsm:gap-2">
                            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(0,84,165,1)] text-white rounded-md">
                                <i className="fas fa-phone xsm:text-xl"><FiPhone /></i>
                            </div>
                            <div className='xsm:flex xsm:flex-col xsm:justify-around'>
                                <h4 className="text-lg font-medium text-gray-800 xsm:text-[13px]">Phone</h4>
                                <p className="text-gray-600 xsm:items-start xsm:text-[10px]">+91 9193700050</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 xsm:space-x-0 xsm:space-y-0 xsm:gap-2">
                            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(0,84,165,1)] text-white rounded-md">
                                <i className="fas fa-envelope text-2xl xsm:text-xl"><CiMail /></i>
                            </div>
                            <div className='xsm:flex xsm:flex-col'>
                                <h4 className="text-lg font-medium text-gray-800 xsm:text-[13px]">Email</h4>
                                <p className="text-gray-600 xsm:items-start xsm:text-[10px]">hr@menrol.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[80%] xl:w-[90%] 2xl:w-full h-1 bg-blue-200"></div>
                    <div className="text-gray-700 flex items-center">
                        <span className="text-green-600 bg-[rgba(36,35,42,1)] border border-green-600 rounded-md px-3 py-3">
                            12+
                        </span>
                        <span className="ml-3 xsm:mt-5">Our customer service is ready to assist you</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col p-6 xsm:p-4 xsm:w-full rounded-lg md:w-full sm:mt-10 xsm:mt-10 lg:mt-0 sm:w-full lg:w-[40%] w-[40%] bg-[#F9F9FE] items-center">
                    {status.message && (
                        <div className={`w-full p-4 mb-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6 xsm:justify-center  xsm:items-center xsm:mt-4 w-[80%]">
                        <div className=' w-full'>
                            <label htmlFor="name" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 focus:outline-none rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your fullname..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 focus:outline-none rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium font-lexend text-[rgba(36,35,42,1)]">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 focus:outline-none rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your message here..."
                                rows={3}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-[65%] py-3 bg-[rgba(0,84,165,1)] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-black-500 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;