import React from 'react'

const Feature: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="bg-white w-64 mt-8">
        <h4 className="text-lg font-semibold text-gray-800 font-lexend">{title}</h4>
        <p className="text-gray-500 mt-2 font-sans">{description}</p>
    </div>
);

export default Feature;