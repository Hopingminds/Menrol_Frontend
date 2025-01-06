"use client";
import React from 'react';

const CultureSection: React.FC = () => {
    return (
        <section className="flex xsm:flex-col xsm:items-center sm:items-center sm:flex-col md:flex-row lg:items-center md:items-start p-8 bg-white  px-[10%] gap-10 justify-between">
            <div className="flex flex-col items-center md:mt-52 lg:mt-0 w-[20vw]  p-2">
                <div
                    className="w-full h-64 bg-blue-400 mb-8 p-8 xsm:w-[20rem] sm:w-[90vw] lg:h-64 md:w-full md:h-40 rounded-lg shadow-md "
                    style={{
                        backgroundImage: "url('/Images/culture.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Content inside the div (if any) */}
                </div>

                <div className="bg-[#0054A5] p-2 rounded-lg shadow-md text-center w-full xsm:w-[20rem] xsm:h-[20rem] sm:w-[90vw] md:w-full md:h-52 lg:h-64 flex flex-col justify-center items-center">
                    {/* <div className="text-6xl font-bold md:text-4xl ">90%</div> */}
                    {/* <div className="text-xl mt-2 font-dm-sans tracking-wide leading-relaxed">Job Satisfaction</div> */}
                    <div className="  text-white font-dm-sans tracking-wide leading-relaxed"> our collaborative culture empowers employees to deliver exceptional results while maintaining perfect work-life harmony. Join our award-winning team.</div>
                </div>
            </div>
            <div className="md:w-2/3 h-[100%] md:p-0 p-5">
                <h2 className="text-3xl font-bold mb-8 text-[rgba(36,35,42,1)] mt-3 font-dm-sans tracking-wide leading-relaxed">Collaboration and Growth</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {[
                        { title: 'Collaboration', description: '"Effective collaboration promotes open communication, strengthens relationships, and ensures the successful execution of complex projects across various industries.' },
                        { title: 'Improvement', description: 'By prioritizing improvement, businesses can increase operational efficiency, reduce errors, and adapt to market demands more effectively.' },
                        { title: 'Innovation', description: 'By embracing innovation, companies unlock new possibilities, introducing disruptive technologies that redefine the future of industries and markets.' },
                        { title: 'Accountability', description: 'In a professional setting, accountability ensures that everyone meets their obligations, leading to consistent results and mutual trust' },
                        { title: 'Customer Focus', description: 'With customer focus, businesses ensure that customer satisfaction is at the core, driving decisions and improving service quality' },
                        { title: 'Work-Life Balance', description: 'Achieving work-life balance helps individuals reduce burnout, boost productivity, and create fulfilling relationships outside of work commitments' },
                    ].map((item, index) => (
                        <div key={index}>
                            <h3 className="text-xl font-bold flex items-center mt-2">
                                <span className="mr-2 text-[#0054A5] text-justify ">➡</span> {item.title}
                            </h3>
                            <p className="mt-2 text-[rgba(107,106,126,1)]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default CultureSection;
