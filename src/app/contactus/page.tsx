"use client";
import React from "react";
import FAQSection from "../../components/About/FaqSection";
import GetInTouch from "@/components/Contactus/GetInTouch";
import Layout from "@/components/Layout";
import Gallery from "@/components/Contactus/Gallery";

const ContactUs: React.FC = () => {

    return (
        <Layout>
            <div>
                <GetInTouch />
                <Gallery />
                <FAQSection />
            </div>
        </Layout>
    );
};

export default ContactUs;
