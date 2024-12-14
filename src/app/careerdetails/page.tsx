import React from 'react'
import JobCard from '@/components/CareerDetails/JobCard';
import HowToApply from '@/components/Careers/HowToApply';
import Footer from '../../components/Footer/FooterPage'
import Header from '@/components/Home/Header';

const careerdetails = () => {
    const content = {
        responsibilities: [
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna non eget eget nibh. Odio.",
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna.",
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna non eget eget nibh. Odio.",
        ],
        jobRequirements: [
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna non eget eget nibh. Odio.",
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna.",
            "Sollicitudin dictum sit lectus a bibendum. Feugiat eu sed justo in diam auctor ac. Ornare est mattis magna non eget eget nibh. Odio.",
        ],
    };
    const jobData = [
        {
            "title": "Janitorial Crew Member",
            "salary": "$13 - $16 per hour",
            "tags": ["Full-time", "Part-time", "Remote"],
            "description": "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            "buttonText": "Learn More"
        },
        {
            "title": "Eco-Cleaning Supervisor",
            "salary": "$17 - $20 per hour",
            "tags": ["Full-time", "Part-time", "Remote"],
            "description": "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            "buttonText": "Learn More"
        },
        {
            "title": "Remote Quality Control",
            "salary": "$14 - $17 per hour",
            "tags": ["Full-time", "Part-time", "Remote"],
            "description": "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            "buttonText": "Learn More"
        }
    ]
    return (
        <section className="bg-white py-16">
            <div>
                <Header></Header>
            </div>
            <div className="flex  items-start  text-[#24232A] justify-between gap-20 px-24 mt-8">
                <div className="w-[70%]   ">
                    <h1 className="font-semibold text-4xl text-[#24232A]">Cleaning Technician</h1>
                    <section className="space-x-2 text-[12px] font-normal text-[#24232A] mt-7 mb-8">
                        <button className="rounded-full bg-[#C1F458] px-5 py-2">Full-time</button>
                        <button className="rounded-full bg-[#F9F9FE] px-5 py-2">Part-time</button>
                        <button className="rounded-full bg-[#F9F9FE] px-5 py-2">Remote</button>
                    </section>
                    <section className="mb-8 w-full">
                        <h2 className="text-xl font-bold mb-4">Job Description</h2>
                        <p className="text-[#6B6A7E] text-lg font-normal mt-6">Lectus at est ipsum at ut iaculis dictum sem morbi.
                            Auctor semper aliquet scelerisque lectus blandit.
                            Eget vel arcu pulvinar pulvinar porttitor.
                            At tristique vel ornare ut. Molestie donec imperdiet nisl vehicula nam sed.</p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                        <ul className="space-y-4">
                            {content.responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2 text-lg font-normal ml-4">
                                    <span className="text-[#6B6A7E]">•</span>
                                    <p className="text-[#6B6A7E]">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-4">Job Requirements</h2>
                        <ul className="space-y-4">
                            {content.jobRequirements.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2 text-lg font-normal ml-4">
                                    <span className="text-[#6B6A7E]">•</span>
                                    <p className="text-[#6B6A7E]">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="flex  items-start min-h-screen   w-[40%]">
                    <div className="bg-[#24232A] text-[#FFFFFF] rounded-xl p-8 w-[100%] h-[353px] ">

                        <h2 className="text-xl font-normal mb-4">Salary :</h2>
                        <p className="text-4xl font-bold">$12 - $15</p>
                        <p className="text-[16px] font-normal mt-2 mb-4">per hour</p>

                        <div className="text-[#F9F9FE] space-y-2 mb-6 ml-4">
                            <p>• <span className="ml-1">Posted 8 days ago</span></p>
                            <p>
                                • <span className="text-[#C1F458] font-normal ml-1">25 Applicant</span>
                            </p>
                        </div>
                        <button className="bg-[#0054A5] text-white font-semibold py-2 px-4 rounded-full w-full mt-3 h-14">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
            <div className=" px-24 border  flex items-center mx-auto">
                <div className="flex justify-between flex-col">
                    <h1 className="text-5xl font-semibold mb-10 mt-20 ml-8">Related Jobs</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-x-9">
                        {jobData.map((job, index) => (
                            <JobCard
                                key={index}
                                title={job.title}
                                salary={job.salary}
                                tags={job.tags}
                                description={job.description}
                                buttonText={job.buttonText}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex  px-24  mt-12 bg-[rgba(0,84,165,1)]  h-screen ">

                {/* Second Div */}
                <div className=" w-[65%] text-justify mt-20 ">
                    <div className="flex items-center gap-3">
                        <p className="text-2xl tracking-wider">Phoenix Sterling</p>
                        <span className="text-green-500">✔</span>
                    </div>

                    <p>
                        Supaklin Employee
                    </p>
                    <div>
                        <p className="mt-4 text-sm w-[75%]">
                            “Working at Supaklin has been a rewarding experience. The company's dedication to excellence and sustainable practices has inspired me to grow both professionally and personally.</p>
                        <p className="mt-4 text-sm w-[75%]">
                            The supportive and close-knit team has made every day enjoyable, and knowing that our efforts contribute to creating healthier and safer spaces for our clients gives me a sense of fulfillment in my work. Supaklin is more than just a workplace; it feels like a family where everyone's contributions are valued, and I am grateful to be a part of it.”
                        </p>
                    </div>
                </div>
                <div
                    className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl mt-20 h-80 w-72 mx-2 px-24"
                    style={{
                        backgroundImage: "url('/Images/plumber.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                </div>

            </div>
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