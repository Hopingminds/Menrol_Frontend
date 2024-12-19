import React from 'react'
import HowToApply from '@/components/Careers/HowToApply';
import Footer from '../../components/Footer/FooterPage'
import Header from '@/components/Home/Header';
import DynamicHeader from '@/components/About/DynamicHeader';
import PhoenixSterling from '@/components/Careers/PhoenixSterling';
import CleaningTechnician from '@/components/CareerDetails/CleaningTechnician';
import RelatedJobs from '@/components/CareerDetails/RelatedJobs';
import Layout from '@/components/Layout';

const careerdetails = () => {


    return (
        <Layout>
            <section className="bg-white ">
                <DynamicHeader title="careerdetails" />
                <CleaningTechnician />
                <RelatedJobs />
                <PhoenixSterling />
                <HowToApply />

            </section>
        </Layout>
    )
}

export default careerdetails;