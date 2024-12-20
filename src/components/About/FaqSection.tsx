"use client";
import { FC, useState } from "react";
import { FaPlusCircle, FaWindowMinimize } from "react-icons/fa";

type FAQ = {
    question: string;
    answer: string;
};

const FAQSection: FC = () => {
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(index === openQuestionIndex ? null : index);
    };

    const faqs: FAQ[] = [
        {
            question: "How does the app ensure customer trust?",
            answer:
                "The app features verified profiles, ratings, and reviews to help customers make informed decisions about service providers.",
        },
        {
            question: "What happens if a customer cancels a booking?",
            answer:
                "If a customer cancels, you will be notified immediately. Any cancellation charges (if applicable) will follow the app’s policy.",
        },
        {
            question: "Is there a fee for using the app?",
            answer: "The app may charge a small commission on completed jobs. Check the terms for detailed fee information.",
        },
        {
            question: "What should I do if I face technical issues with the app?",
            answer:
                "For technical issues, go to the “Help” section and report the problem. Our support team will assist you promptly.",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-start py-12 bg-white px-[10%] justify-between gap-40">
            {/* Left Section - FAQ */}
            <div className="w-full">
                <p className="text-lg font-bold text-green-500 uppercase font-lexend font-dm-sans tracking-wide leading-relaxed">
                    / Questions & Answers
                </p>
                <h1 className="text-5xl font-bold mt-6 text-[rgba(36,35,42,1)]  font-lexend font-dm-sans tracking-wide leading-relaxed">
                    Frequently Asked Questions
                </h1>
                <div className="mt-8 space-y-6 ">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="flex justify-between items-center w-full text-left text-[rgba(36,35,42,1)]"
                            >
                                <h2 className="text-xl font-bold font-lexend font-dm-sans tracking-wide leading-relaxed">{faq.question}</h2>
                                <span className="text-2xl font-bold  items-center p-2">
                                    {openQuestionIndex === index ? <FaWindowMinimize /> : <FaPlusCircle />}
                                </span>
                            </button>
                            {openQuestionIndex === index && (
                                <p className="mt-2 text-lg text-[rgba(107,106,126,1)] font-sans font-dm-sans tracking-wide leading-relaxed">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 w-2/3 flex flex-col items-start">
                <div
                    className="w-full h-[50vh] bg-[rgba(94,147,198,1)] rounded-xl"
                    style={{
                        backgroundImage: "url('/Images/All photos/FAQ (1).jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>

                <p className="mt-4 text-lg text-gray-500 gap-3">
                    More Information <span className="text-orange-500">+91 9193700050</span>
                </p>
            </div>
        </div>
    );
};

export default FAQSection;
