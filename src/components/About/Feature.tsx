import React from 'react'

const Feature: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="bg-white w-64 2xl:w-80 mt-8">
        <h4 className="text-2xl font-semibold text-gray-800 font-lexend md:text-[15px]">{title}</h4>
        <p className="text-gray-500 mt-2 font-sans md:text-sm md:w-1/2">{description}</p>
    </div>
);
export default Feature;