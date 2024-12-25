"use client";
import React from 'react';
import FAQSection from "../../components/About/FaqSection";
import DynamicHeader from '@/components/About/DynamicHeader';
import GetInTouch from '@/components/Contactus/GetInTouch';
import Layout from '@/components/Layout';
import Gallery from '@/components/Contactus/Gallery';



const contactus: React.FC = () => {
    // const images = [
    //     '/Images/plumber1.jpg',
    //     '/Images/plumber2.jpg',
    //     '/Images/plumber3.jpg',
    //     '/Images/plumber4.jpg',
    //     '/Images/plumber5.jpg',
    //     '/Images/plumber6.jpg',
    // ];
    return (
        <Layout>
            <div>
                <DynamicHeader title="contactus" />
                <GetInTouch />
                <Gallery />
                <FAQSection />
            </div>
        </Layout>
    );
};
export default contactus;
