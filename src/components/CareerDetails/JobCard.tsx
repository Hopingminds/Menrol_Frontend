'use client';

import React, { useState } from "react";

type JobCardProps = {
    title: string;
    salary: string;
    tags: string[];
    description: string;
    buttonText: string;
};

const JobCard: React.FC<JobCardProps> = ({ title, salary, tags, description, buttonText }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
    };

    return (
        <div className="bg-[#F9F9FE] shadow-md rounded-lg p-6 w-[336px] h-[308px]">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-[#5653E1] mt-1 text-[16px] font-normal">Salary : {salary}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-[#24232A] text-xs">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className={`rounded-full px-3 py-2 ${selectedTag === tag ? 'bg-[#C1F458]' : 'bg-[#E0E0E0]'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <p className="text-[#6B6A7E] mt-6 text-[16px] font-normal mb-4">{description}</p>
            <button className="bg-[#0054A5] text-white font-semibold py-2 px-6 rounded-full mt-2">
                {buttonText}
            </button>
        </div>
    );
};

export default JobCard;
