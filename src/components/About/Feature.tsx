"use client";
import React from 'react'

const Feature: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="bg-white  w-64 lg:w-full 2xl:w-80 mt-8 md:w-56 xsm:mt-0 xsm:w-full
     ">
        <h4 className="text-2xl font-semibold 2xl:text-xl xl:text-[19px] xsm:text-[10px] text-gray-800 font-lexend  md:text-[13px] md:w-full">{title}</h4>
        <p className="text-gray-500 mt-2 xsm:mt-0 font-sans  2xl:text-base xl:text-base md:text-[12px] xsm:text-[9px] md:leading-normal xsm:tracking-tighter xsm:leading-tight  xl:w-[90%] xl:tracking-normal md:tracking-normal lg:w-[90%] md:w-[80%]">{description}</p>
    </div>
);
export default Feature;