"use client";
import React from 'react'

const Content = () => {
    return (
        <div className='md:overflow-hidden '>
            <div className="grid grid-cols-[1fr,2.5fr] md:gap-10 xsm:px-[10%] md:px-[10%] lg:px-[7%]  sm:gap-5 2xl:gap-20 xsm:gap-5 xsm:mt-8 mt-12 px-[7%] my-8">
                <div
                    className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-full md:h-full xsm:w-[8rem] xsm:h-[8rem] sm:w-[30vw] w-80 xl:w-[30vw]  2xl:h-full"
                    style={{
                        backgroundImage: "url('/Images/AllImages/businessman.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                </div>
                {/* Content Section */}
                <div className=" flex flex-col h-[100%] xsm:leading-tight sm:leading-tight sm:gap-2 xsm:gap-2 leading-loose 2xl:leading-normal gap-5 ">
                    <h1 className="text-black text-[45px] xl:text-[45px] lg:text-[36px] xl:leading-relaxed 2xl:text-[45px] xsm:text-[5px] sm:text-lg md:text-2xl font-bold font-lexend tracking-widest w-full lg:tracking-wider 2xl:tracking-wide 2xl:w-[90%] 2xl:leading-normal ">
                        Quality service, spotless results:
                    </h1>
                    <div className="bg-[rgba(193,244,88,1)] text-white w-max 2xl:h-14 xsm:w-[130px] md:w-[190px] lg:w-[190px] xl:w-[260px] 2xl:w-[300px] sm:w-[96%] xsm:h-[30px] h-15 xsm:px-2 px-4 py-2 mb-4 xsm:mb-0 flex items-center gap-2 rounded-md">
                        <span className="text-md 2xl:text-xl flex justify-start items-center xsm:text-[10px] md:text-[10px]">🎤</span>
                        <span className="text-md 2xl:text-base xl:text-[16px] md:text-[5px] xsm:text-[10px] xsm:flex font-lexend xsm:font-normal font-bold text-[rgba(36,35,42,1)] flex ">
                            A message from us
                        </span>
                    </div>



                    <p className="text-gray-600 font-sans 2xl:text-xl xl:text-xl xsm:tracking-tight tracking-wider 2xl:tracking-wider 2xl:mt-6 xsm:text-[8px] md:text-base ">
                        This reflects our commitment to providing exceptional service with an unwavering focus on attention. Whether it is your home, office, or any space that needs attention, we ensure every corner is immaculate.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Content