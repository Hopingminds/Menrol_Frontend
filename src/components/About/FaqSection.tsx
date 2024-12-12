"use client";
import { FC, useState } from "react";

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
            question: "What is digital marketing?",
            answer:
                "Nulla enim lectus porttitor pulvinar. Diam sed fusce aliquam lacus. Tincidunt ultrices cursus amet donec egestas. Enim risus quam in in urna scelerisque proin. Eget aliquam cras nec egestas massa.",
        },
        {
            question: "What services do digital marketing agencies offer?",
            answer:
                "Digital marketing agencies offer services like SEO, social media management, PPC advertising, and content marketing.",
        },
        {
            question: "How much does digital marketing cost?",
            answer: "The cost of digital marketing varies depending on the scope of the project.",
        },
        {
            question: "How can digital marketing help my business?",
            answer:
                "Digital marketing helps businesses reach a broader audience, generate leads, and boost revenue through online channels.",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-start justify-center py-12 bg-white">
            {/* Left Section - FAQ */}
            <div className="w-[90%] px-32 ">
                <p className="text-sm font-bold text-green-500 uppercase">
                    / Questions & Answers
                </p>
                <h1 className="text-4xl font-bold mt-4 text-[rgba(36,35,42,1)] leading-relaxed">
                    Frequently Asked<br /> Questions
                </h1>
                <div className="mt-8 space-y-6 ">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="flex justify-between items-center w-full text-left text-[rgba(36,35,42,1)]"
                            >
                                <h2 className="text-lg font-bold">{faq.question}</h2>
                                <span className="text-2xl font-bold">
                                    {openQuestionIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            {openQuestionIndex === index && (
                                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 w-2/3 flex flex-col items-start">
                <div className="w-72 h-96 bg-[rgba(94,147,198,1)] rounded-xl"></div>
                <p className="mt-4 text-sm text-gray-500">
                    More Information <span className="text-orange-500">+1 (333) 000-0000</span>
                </p>
            </div>
        </div>
    );
};

export default FAQSection;
