"use client";
import React, { useEffect, useState } from "react";
import FAQSection from "../../components/About/FaqSection";
import DynamicHeader from "@/components/About/DynamicHeader";
import GetInTouch from "@/components/Contactus/GetInTouch";
import Layout from "@/components/Layout";
import Gallery from "@/components/Contactus/Gallery";

const ContactUs: React.FC = () => {
    const [isXsm, setIsXsm] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsXsm(window.innerWidth <= 480); // Adjust according to xsm breakpoint (320px - 480px)
        };
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize); // Listen for window resize
        return () => {
            window.removeEventListener("resize", handleResize); // Clean up
        };
    }, []);

    return (
        <Layout>
            <div>
                {isXsm && <DynamicHeader title="contactus" />}
                <GetInTouch />
                <Gallery />
                <FAQSection />
            </div>
        </Layout>
    );
};

export default ContactUs;
