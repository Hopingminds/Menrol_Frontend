// CoreValues.tsx
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
        <section className="p-8 bg-gray-50 flex flex-col lg:flex-row gap-12 justify-between px-24">
            {/* Values Section */}
            <div className="flex-col w-[45%] justigy-between">
                <h5 className="text-green-600 uppercase font-bold mb-2 font-lexend">/ Our Value</h5>
                <h1 className="text-4xl font-bold text-gray-900 mb-8 font-lexend">Our Core Values:</h1>
                <ul className="space-y-6">
                    {values.map((value, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div className="text-blue-600 text-xl">➜</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 font-lexend">{value.title}</h3>
                                <p className="text-sm text-gray-600 font-sans">{value.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Progress Bars Section */}
            <div
                className="relative bg-[rgba(107,106,126,1)] text-white p-6 rounded-md shadow-md w-72 h-96"
                style={{

                    backgroundImage: "url('/Images/All photos/value (1).jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* New Box */}
                <div className="absolute bottom-[-50px] -left-1 transform translate-x-[-50%] bg-blue-700 text-white p-4 w- h-40 rounded-lg shadow-lg">
                    {progressBars.map((progress, index) => (
                        <div key={index} className="mb-2 ">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-lexend">{progress.label}</span>
                                <span className="text-xs">{progress.percentage}%</span>
                            </div>
                            <div className="w-full bg-blue-600 rounded-full h-1.5">
                                <div
                                    className="bg-green-400 h-1.5 rounded-full"
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
