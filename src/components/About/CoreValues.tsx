"use client";
import React from 'react';

type Value = {
    title: string;
    description: string;
};

type Progress = {
    label: string;
    percentage: number;
};

type CoreValuesProps = {
    values: Value[];
    progressBars: Progress[];
};

const CoreValues: React.FC<CoreValuesProps> = ({ values, progressBars }) => {
    return (
        <section className="p-8 bg-gray-50 flex flex-col md:flex-row md:justify-center md:gap-44 lg:flex-row gap-12 justify-between md:px-[10%] lg:px-[7%] xl:px-[7%] 2xl:px-[7%] xsm:my-0 my-0">
            {/* Values Section */}
            <div className="flex-col w-[45%] md:w-[50%] xsm:w-full justify-between">
                <h5 className="text-green-600 uppercase  font-bold mb-2 xsm:text-[7px] font-lexend">/ Our Value</h5>
                <h1 className="text-4xl font-bold md:text-2xl 2xl:text-4xl xsm:text-sm text-gray-900 mb-8 font-lexend">Our Core Values:</h1>
                <ul className="space-y-6">
                    {values.map((value, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div className="text-blue-600 text-xl xsm:text-xs">➜</div>
                            <div className='xsm:w-screen'>
                                <h3 className="text-lg font-semibold md:text-sm 2xl:text-lg xsm:text-xs md:font-bold text-gray-800 font-lexend">{value.title}</h3>
                                <p className="text-sm xsm:text-[10px] text-gray-600 md:text-xs 2xl:text-sm font-sans xsm:leading-tight xsm:w-full">{value.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Progress Bars Section */}
            <div
                className="relative bg-[rgba(107,106,126,1)] md:w-[50%] xsm:w-[70%] xsm:h-[350px] lg:mt-3 xsm:ml-16 md:mt-32 text-white p-6 rounded-md shadow-md w-72 h-96 2xl:h-[465px]"
                style={{

                    backgroundImage: "url('/Images/AllImages/value (1).jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* New Box */}
                <div className="absolute bottom-[-40px] 2xl:bottom-[-60px] -left-1 xsm:w-[50%] xsm:h-[60%] transform translate-x-[-50%] bg-[rgba(0,84,165,1)] text-white p-4 2xl:p-6 md:h-[50%] w-40 h-40 2xl:w-64 2xl:h-64 rounded-lg shadow-lg">
                    {progressBars.map((progress, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs 2xl:text-lg font-lexend xsm:text-[7px]">{progress.label}</span>
                                <span className="text-xs 2xl:text-sm xsm:text-[7px]">{progress.percentage}%</span>
                            </div>
                            <div className="w-full  bg-blue-600 rounded-full h-1.5 2xl:h-2">
                                <div
                                    className="bg-green-400 h-1.5 2xl:h-2 rounded-full"
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoreValues;
