"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const Discount = () => {
    const route = useRouter();

    const HandleGoContect=()=>{
        route.push("/contactus");
    }
    return (
        <div>
            <div className="flex  bg-[rgba(0,84,165,1)] h-[100%] justify-center gap-[8vw] items-center px-[10%] py-10 my-10">
                {/* First Div */}
                <div
                    className="relative bg-[rgba(94,147,198,1)] text-white rounded-xl h-80 w-64 mx-4"
                    style={{
                        backgroundImage: "url('/Images/All photos/OfferImage (1).jpg')",
                        backgroundSize: "cover", // Ensure image covers the entire area
                        backgroundPosition: "center", // Center the image
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* New Box */}
                    <div className="absolute top-1/4 right-[-76px] bg-[rgba(36,35,42,1)] text-white  p-4 w-28 h-36 shadow-lg flex flex-col justify-center items-center space-y-2 ">
                        {/* Star aligned to the right */}
                        <div className="absolute top-2 right-2 text-[rgba(193,244,88,1)] text-lg">
                            ★
                        </div>
                        {/* Centered Content */}
                        <p className="text-3xl text-center font-semibold font-lexend">22 </p>
                        <p className="text-xs text-center font-sans text-[rgba(188,187,201,1)]">Years of Experience</p>
                    </div>
                </div>




                {/* Second Div */}
                <div className="mx-4 leading-relaxed">
                    <p className="text-sm font-bold text-green-500 font-lexend">
                        /DISCOUNT UP TO 50%
                    </p>
                    <h1 className="text-4xl font-bold mt-2   tracking-widest text-[rgba(255,255,255,1)] font-lexend leading-relaxed">
                        Big Savings, Big Clean:
                        <br />
                        Limited Time Offer
                    </h1>
                    <p className="mt-4 text-md   text-[rgba(188,187,201,1)] font-sans w-full tracking-widest">
                        Don’t miss out! Limited-time savings on professional


                        <br />
                        cleaning services for a spotless experience.
                    </p>
                    <p className="mt-4 text-sm font-bold underline cursor-pointer text-[rgba(255,255,255,1)] font-lexend"
                    onClick={HandleGoContect}
                    >
                        Contact Us
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Discount