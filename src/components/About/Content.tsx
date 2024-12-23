import React from 'react'

const Content = () => {
    return (
        <div>
            <div className="grid grid-cols-[1fr,2.5fr] md:gap-10 mt-10 px-[10%] my-8">
                <div
                    className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-full md:h-full   w-80 2xl:h-full"
                    style={{
                        backgroundImage: "url('/Images/AllImages/businessman.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                </div>
                {/* Content Section */}
                <div className=" flex flex-col h-[100%] leading-loose  2xl:leading:normal gap-5 ">
                    <h1 className="text-black text-[45px] md:text-2xl font-bold font-lexend tracking-widest w-full 2xl:text-6xl 2xl:tracking-wide 2xl:leading-relaxed ">
                        Embracing Cleanliness and Beyond:
                    </h1>
                    {/* <h1 className="text-black text-[45px] font-bold mb-2 font-lexend tracking-widest w-full 2xl:text-6xl">
                        and Beyond:
                    </h1> */}
                    <div className="bg-[rgba(193,244,88,1)] text-white w-max 2xl:h-20 h-15 px-4 py-2 mb-4 flex items-center gap-2 rounded-md">
                        <span className="text-md 2xl:text-xl flex justify-start items-center">🎤</span>
                        <span className="text-md 2xl:text-2xl font-lexend font-bold text-[rgba(36,35,42,1)] flex justify-start items-center ">
                            A message from the Founder
                        </span>
                    </div>



                    <p className="text-gray-600 font-sans text-justify tracking-wider md:text-base">
                        With our embrace of cleanliness and beyond, we promise a level of service that ensures perfection. Every space we clean is carefully attended to, providing you with a healthy and welcoming environment.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Content