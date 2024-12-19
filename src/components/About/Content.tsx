import React from 'react'

const Content = () => {
    return (
        <div>
            <div className="flex items-center  gap-14 mt-10 px-[10%]">
                <div
                    className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-72 w-72"
                    style={{
                        backgroundImage: "url('/Images/All photos/businessman.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                </div>
                {/* Content Section */}
                <div className="w-3/5 flex flex-col h-[100%] leading-loose my-10">
                    <h1 className="text-black text-[45px] font-bold font-lexend tracking-widest w-full">
                        Embracing Cleanliness
                    </h1>
                    <h1 className="text-black text-[45px] font-bold mb-2 font-lexend tracking-widest w-full">
                        and Beyond:
                    </h1>
                    <button className="bg-[rgba(193,244,88,1)] text-white w-[50%] h-10 px-2 py-2 mb-4 flex items-center justify-center gap-1 ">
                        <span className="text-md">🎤</span>
                        <span className="text-sm font-lexend font-bold text-[rgba(36,35,42,1)]">A message from the founder</span>
                    </button>

                    <p className="text-gray-600 font-sans text-justify tracking-wider">
                        With our embrace of cleanliness and beyond, we promise a level of service that ensures perfection. Every space we clean is carefully attended to, providing you with a healthy and welcoming environment.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Content