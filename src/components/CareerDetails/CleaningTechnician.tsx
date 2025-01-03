"use client";
import React from 'react'

const CleaningTechnician = () => {
    const content = {
        responsibilities: [
            "Responsibilities outline key duties and tasks that an individual must perform to meet job expectations and contribute to success.",
            "Clear responsibilities ensure employees understand their roles, fostering accountability and helping teams work efficiently toward common organizational goals.",
            "Job responsibilities define the specific tasks, skills, and outcomes expected from an employee, ensuring clarity and guiding performance.",
        ],
        jobRequirements: [
            "Job requirements can include a combination of educational background, specific certifications, and work experience to meet role demands.",
            "They ensure clarity in the hiring process by establishing the necessary criteria for potential candidates to meet",
            "They include education, certifications, technical expertise, and soft skills, ensuring candidates meet the standards set for the position",
        ],
    };
    return (
        <div className="xsm:flex-col xsm:gap-0 xsm:px-0 xsm:justify-start flex items-start  text-[#24232A] justify-between gap-20 px-24 mt-8 xsm:h-[1650px] md:border md:border-black">
            <div className="w-[70%] xsm:w-full  xsm:px-4 md:gap-4">
                <h1 className="font-semibold text-4xl text-[#24232A] xsm:text-justify">Cleaning Technician</h1>
                <section className="space-x-2 text-[12px] font-normal text-[#24232A] mt-7 mb-8">
                    <button className="rounded-full bg-[#C1F458] px-5 py-2">Full-time</button>
                    <button className="rounded-full bg-[#F9F9FE] px-5 py-2">Part-time</button>
                    <button className="rounded-full bg-[#F9F9FE] px-5 py-2">Remote</button>
                </section>
                <section className="mb-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Job Description</h2>
                    <p className="text-[#6B6A7E] text-lg font-normal mt-6">A well-crafted job description provides detailed information about responsibilities, expectations, required qualifications, and specific job-related competencies for candidates.</p>
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
            <div className="flex  items-start min-h-screen   w-[40%]  xsm:w-full xsm:px-10 xsm:mt-8">
                <div className="bg-[#24232A] text-[#FFFFFF] rounded-xl p-8 w-[100%] h-[353px]  xsm:px-10 xsm:w-[270px] xsm:h-[285px] xsm:p-5">

                    <h2 className="xsm:text-lg text-xl font-normal mb-4">Salary :</h2>
                    <p className=" xsm:text-2xl text-4xl font-bold">$12 - $15</p>
                    <p className="text-[16px] font-normal mt-2 mb-4">per hour</p>

                    <div className="text-[#F9F9FE] space-y-2 mb-6 ml-4">
                        <p>• <span className="ml-1">Posted 8 days ago</span></p>
                        <p>
                            • <span className="text-[#C1F458] font-normal ml-1">25 Applicant</span>
                        </p>
                    </div>
                    <button className="xsm:h-10 bg-[#0054A5] text-white font-semibold py-2 px-4 rounded-full w-full mt-3 h-14">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CleaningTechnician