"use client";
import React from 'react';

interface DynamicHeaderProps {
    title: string; // Prop for the dynamic word
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ title }) => {
    return (
        <div className="bg-[rgba(0,84,165,1)] text-white py-4 px-[10%]">
            <div className="flex items-center space-x-2  text-gray-300">
                <span className="cursor-pointer hover:text-white">Home</span>
                <span>/</span>
                <span className="text-white font-medium">{title}</span>
            </div>
        </div>
    );
};

export default DynamicHeader;
