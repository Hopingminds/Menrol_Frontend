"use client";
import React from 'react'
import JobCard from '../CareerDetails/JobCard'

const OpenPositions = () => {
    const jobData = [
        {
            title: "Janitorial Crew Member",
            salary: "$13 - $16 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
        {
            title: "Eco-Cleaning Supervisor",
            salary: "$17 - $20 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
        {
            title: "Remote Quality Control",
            salary: "$14 - $17 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
        {
            title: "Remote Quality Control",
            salary: "$14 - $17 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
        {
            title: "Remote Quality Control",
            salary: "$14 - $17 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
        {
            title: "Remote Quality Control",
            salary: "$14 - $17 per hour",
            tags: ["Full-time", "Part-time", "Remote"],
            description:
                "A malesuada morbi odio amet sagittis bibendum nulla. Ac egestas non magna volutpat mi massa lorem amet. Proin.",
            buttonText: "Learn More",
        },
    ];
    return (
        <div className=" px-[10%] py-10">
            {/* <div className="flex  flex-col">
                <p className="text-green-500 mt-20 xsm:text-[10px]  uppercase text-[20px] pb-6">
                    /Available job positions
                </p>
                <h1 className="text-5xl xsm:text-3xl font-semibold mb-10">
                    Current Job Openings:
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
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
            </div> */}
        </div>
    )
}

export default OpenPositions