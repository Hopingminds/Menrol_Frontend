import React from 'react'
import JobCard from '@/components/CareerDetails/JobCard';
import HowToApply from '@/components/Careers/HowToApply';
import Footer from '../../components/Footer/FooterPage'
import Header from '@/components/Home/Header';
import DynamicHeader from '@/components/About/DynamicHeader';
import PhoenixSterling from '@/components/Careers/PhoenixSterling';
import CleaningTechnician from '@/components/CareerDetails/CleaningTechnician';
import RelatedJobs from '@/components/CareerDetails/RelatedJobs';

const careerdetails = () => {


    return (
        <section className="bg-white ">
            <div>
                <Header></Header>
            </div>
            <div>
                <DynamicHeader title="careerdetails" />

            </div>

            <CleaningTechnician />
            <RelatedJobs />
            <PhoenixSterling />
            <div>
                <HowToApply></HowToApply>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </section>
    )
}

export default careerdetails;