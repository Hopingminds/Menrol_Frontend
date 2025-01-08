"use client"
import React, { useRef, useState, useEffect, FC } from 'react';

const Terms: FC = () => {
const infoWeCollectRef = useRef<HTMLDivElement | null>(null);
const howWeUseInfoRef = useRef<HTMLDivElement | null>(null);
const dataSharingRef = useRef<HTMLDivElement | null>(null);
const dataSecurityRef = useRef<HTMLDivElement | null>(null);
const yourChoicesRef = useRef<HTMLDivElement | null>(null);
const childrensPrivacyRef = useRef<HTMLDivElement | null>(null);
const changesToPolicyRef = useRef<HTMLDivElement | null>(null);
const refundCancellationRef = useRef<HTMLDivElement | null>(null);
const changesToTerms = useRef<HTMLDivElement | null>(null);
const contactUsRef = useRef<HTMLDivElement | null>(null);
const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 720);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, sectionName: string) => {
        if (ref.current) {
            if (isSmallScreen) {
                window.scrollTo({
                    top: ref.current.offsetTop - 20,
                    behavior: 'smooth',
                });
            } else if (scrollContainerRef.current) {
                const sectionTop = ref.current.offsetTop;
                scrollContainerRef.current.scrollTo({
                    top: sectionTop - 10,
                    behavior: 'smooth',
                });
            }
            setActiveSection(sectionName);
        }
    };

    return (
        <div className="bg-gray-50 -mt-10 md:p-16 lg:p-24 xl:p-24 px-[5%]">
            <h1 className="text-4xl font-bold mb-4 text-center font-poppins">
                Terms and <span className="text-[#0054A5] font-poppins">Conditions</span>
            </h1>

            <p className="text-lg text-gray-600 text-center mb-10 font-poppins">
                These Terms and Conditions govern your use of the Menrol website. By accessing or using the Platform,
                you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Platform.
            </p>

            <div className="flex flex-col md:flex-row xl:flex-row lg:flex-row gap-8 relative">
                <aside className="lg:w-1/4 lg:sticky lg:top-8 h-fit">
                    <div className="p-6 shadow-none">
                        <ul className="space-y-4">
                            {[
                                { ref: infoWeCollectRef, label: "Use of the Platform", id: "info" },
                                { ref: howWeUseInfoRef, label: "Content", id: "how" },
                                { ref: dataSharingRef, label: "Payments", id: "data" },
                                { ref: dataSecurityRef, label: "Privacy", id: "security" },
                                { ref: yourChoicesRef, label: "Disclaimer of Warranties", id: "choices" },
                                { ref: childrensPrivacyRef, label: "Limitation of Liability", id: "children" },
                                { ref: changesToPolicyRef, label: "Indemnification", id: "changes" },
                                { ref: refundCancellationRef, label: "Governing Law", id: "refund" },
                                { ref: changesToTerms, label: "Changes to Terms", id: "changesTo" },
                                { ref: contactUsRef, label: "Contact Us", id: "contact" },
                            ].map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => scrollToSection(item.ref, item.id)}
                                    className={`text-lg cursor-pointer font-poppins pl-2 border-l-4 ${
                                        activeSection === item.id
                                            ? 'border-[#0054A5] font-bold text-[#0054A5]'
                                            : 'border-transparent text-gray-600 hover:text-black'
                                    }`}
                                    
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="hidden md:block xl:block lg:block w-1 h-auto bg-[#0054A5]"></div>

                <section
                    className={`lg:w-3/4 ${isSmallScreen ? '' : 'max-h-[70vh] overflow-y-scroll no-scrollbar'}`}
                    ref={scrollContainerRef}
                >
                    <div className="mb-8" ref={infoWeCollectRef}>
                        <h2 className="text-2xl font-bold mb-4">Use of the Platform</h2>
                        <p className="text-gray-700 font-poppins mb-2">
                            a. License: Subject to these Terms, Menrol grants you a limited, non-exclusive, non-transferable license to access and use the Platform for your personal and non-commercial use.
                        </p>
                        <p className="text-gray-700 font-poppins mb-2">
                            b. User Account: You may be required to create an account to access certain features of the Platform. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.
                        </p>
                        <p className="text-gray-700 mb-2 font-poppins">
                            You agree not to engage in any of the following prohibited activities:
                            <br />
                            - Violating any applicable laws or regulations.
                            <br />
                            - Interfering with or disrupting the integrity or performance of the Platform.
                            <br />
                            - Attempting to gain unauthorized access to any portion of the Platform.
                            <br />
                            - Uploading, posting, or transmitting any content that is unlawful, harmful, or infringes upon the rights of others.
                        </p>
                    </div>

                    <div className="mb-8" ref={howWeUseInfoRef}>
                        <h2 className="text-2xl font-bold mb-4">Content</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            a. Ownership: All content available on the Platform, including courses, videos, text, and graphics, is the property of Menrol or its licensors and is protected by copyright and other intellectual property laws.
                        </p>
                        <p className="text-gray-700 mb-2 font-poppins">
                            b. User-Generated Content: You may have the opportunity to submit or create content on the Platform. By submitting content, you grant Menrol a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and distribute such content.
                        </p>
                    </div>
                     {/* Section: Data Sharing */}
                     <div className="mb-8" ref={dataSharingRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Payments</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            a. Payment Terms: If you make a purchase on the Platform, you agree to provide accurate payment information and authorize us to charge the specified amount.
                        </p>
                        <p className="text-gray-700 mb-2 font-poppins">
                            b. Refunds and Cancellations: Refunds and cancellations are subject to our refund policy, which is available on the Platform.
                        </p>
                    </div>

                    {/* Section: Data Security */}
                    <div className="mb-8" ref={dataSecurityRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Privacy</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            We take the security of your personal information seriously. We implement reasonable security measures to protect your information from unauthorized access, loss, or misuse.
                        </p>
                    </div>

                    {/* Section: Your Choices */}
                    <div className="mb-8" ref={yourChoicesRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Disclaimer of Warranties</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            The Platform is provided on an as is and as available basis. Menrol makes no warranties, expressed or implied, regarding the operation of the Platform or the information, content, materials, or products included on the Platform.
                        </p>
                    </div>

                    {/* Section: Children's Privacy */}
                    <div className="mb-8" ref={childrensPrivacyRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Limitation of Liability</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            To the fullest extent permitted by applicable law, Menrol shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Platform.
                        </p>
                    </div>

                    {/* Section: Changes to Policy */}
                    <div className="mb-8" ref={changesToPolicyRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Indemnification</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            You agree to indemnify and hold harmless Menrol and its affiliates from any claims, losses, liabilities, damages, costs, or expenses arising out of your use of the Platform or violation of these Terms.
                        </p>
                    </div>

                    {/* Section: Refund and Cancellation */}
                    <div className="mb-8" ref={refundCancellationRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Governing Law</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Menrol operates.
                        </p>
                    </div>

                    {/* Section: Changes to Terms */}
                    <div className="mb-8" ref={changesToTerms}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Changes to Terms</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                            We may update these Terms from time to time. Any changes will be effective immediately upon posting on the Platform, and your continued use of the Platform constitutes your acceptance of the revised Terms.
                        </p>
                    </div>

                    {/* Section: Contact Us */}
                    <div className="mb-8" ref={contactUsRef}>
                        <h2 className="text-2xl font-bold mb-4 font-poppins">Contact Us</h2>
                        <p className="text-gray-700 mb-2 font-poppins">
                        If you have any questions about these Terms, please contact us at: <a href="mailto:support@menrol.com" className="text-blue-500 underline mr-1">support@menrol.com</a>,<a href='tel:+91 77176 67030'>+91 77176 67030</a>
                        </p>
                    </div>

                    {/* Additional Sections Here */}
                </section>
            </div>
        </div>
    );
};

export default Terms;
