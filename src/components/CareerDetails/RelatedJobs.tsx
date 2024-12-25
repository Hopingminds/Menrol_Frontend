"use client";
import React from 'react'
import JobCard from './JobCard'

const RelatedJobs = () => {
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
    )
}

export default RelatedJobs