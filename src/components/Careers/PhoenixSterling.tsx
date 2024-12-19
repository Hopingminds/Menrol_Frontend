import React from 'react'

const PhoenixSterling = () => {
    return (
        <div className="flex  px-24  mt-12 bg-[rgba(0,84,165,1)]  h-[70vh] ">

            <div className=" w-[65%] text-justify mt-20 ">
                <div className="flex items-center gap-3">
                    <p className="text-3xl tracking-wider text-[rgba(255,255,255,1)] font-lexend">Phoenix Sterling</p>
                    <span className="text-green-500">✔</span>
                </div>

                <p className='font-sans text-[rgba(249,249,254,1)]'>
                    Supaklin Employee
                </p>
                <div>
                    <p className="mt-4 text-md w-[75%]  text-[rgba(255,255,255,1)] font-sans">
                        “Working at Supaklin has been a rewarding experience. The company's dedication to excellence and sustainable practices has inspired me to grow both professionally and personally.</p>
                    <p className="mt-4 text-md w-[75%] text-[rgba(255,255,255,1)] font-sans l">
                        The supportive and close-knit team has made every day enjoyable, and knowing that our efforts contribute to creating healthier and safer spaces for our clients gives me a sense of fulfillment in my work. Supaklin is more than just a workplace; it feels like a family where everyone's contributions are valued, and I am grateful to be a part of it.”
                    </p>
                </div>
            </div>
            <div
                className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl mt-20 h-80 w-72 mx-2 px-24"
                style={{
                    backgroundImage: "url('/Images/plumber.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
            </div>

        </div>
    )
}

export default PhoenixSterling