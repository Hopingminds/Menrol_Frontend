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
        <div className="flex flex-col md:flex-row items-start py-12 mb-4 xsm:py-0 bg-white px-[7%] justify-between md:gap-10 gap-40">
            {/* Left Section - FAQ */}
            <div className="w-full">
                <p className="text-lg font-bold xsm:text-[10px] text-green-500 uppercase font-lexend font-dm-sans tracking-wide leading-relaxed">
                    / Questions & Answers
                </p>
                <h1 className="text-7xl xsm:text-2xl  font-bold mt-6 text-[rgba(36,35,42,1)] md:text-3xl  font-lexend font-dm-sans tracking-wide leading-relaxed">
                    Frequently Asked Questions
                </h1>
                <div className="mt-8 2xl:space-y-8 xl:space-y-7 xsm:space-y-2">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="flex justify-between items-center w-full text-left text-[rgba(36,35,42,1)]"
                            >
                                <h2 className="text-3xl xsm:text-sm xsm:font-normal md:text-lg font-bold font-lexend font-dm-sans tracking-wide leading-relaxed">{faq.question}</h2>
                                <span className="text-xl font-bold xsm:text-xs  items-center p-2 ">
                                    {openQuestionIndex === index ? <FaWindowMinimize /> : <FaPlusCircle />}
                                </span>
                            </button>
                            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openQuestionIndex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-lg xsm:text-xs text-[rgba(107,106,126,1)] font-sans font-dm-sans tracking-wide leading-relaxed">
                {faq.answer}
              </p>
            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 w-2/3 flex flex-col items-start xsm:hidden md:block lg:block xl:flex xl:w-full">
                <div
                    className="w-full  xl:h-[24rem] lg:h-[18rem] md:h-[23rem] 2xl:h-[23rem] bg-[rgba(94,147,198,1)] rounded-xl"
                    style={{
                        backgroundImage: "url('/Images/AllImages/FAQ(1).jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
            </div>

        </div>
    );
};

export default FAQSection;
