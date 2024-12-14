import React from 'react';

const HowToApply: React.FC = () => {
    const steps = [
        {
            heading: 'STEP 1',
            title: 'Find Job',
            description: 'Find your ideal job with ease and convenience',
        },
        {
            heading: 'STEP 2',
            title: 'Submit CV',
            description: 'Submit your CV and take the next step.',
        },
        {
            heading: 'STEP 3',
            title: 'Interview',
            description: 'Nail the interview and secure your dream job',
        },
    ];

    return (
        <section className="p-8 bg-gray-100 px-24">
            <p className='text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend'>/HOW IT WORKS</p>
            <h2 className="text-5xl font-bold text-start mb-8 text-[rgba(36,35,42,1)] mt-4">How to Apply</h2>
            <div className="flex   gap-8 mb-12 items-center">
                {steps.map((step, index) => (
                    <div key={index} className=" p-6">
                        <div className='flex'>
                            <div className="border w-16 h-5 rounded-xl bg-[rgba(193,244,88,1)] text-[rgba(36,35,42,1)]">{step.heading}</div>
                            <div className="text-[rgba(188,187,201,1)] tracking-wider">---------------------------------</div>
                        </div>

                        <h3 className="text-xl text-[rgba(36,35,42,1)] font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>

                    </div>

                ))}
            </div>
            <div className="bg-[rgba(36,35,42,1)] text-white p-8 text-center rounded-xl shadow-md w-[100%]  h-72   ">
                <h3 className="text-4xl font-bold mb-4 mt-8">Join Our Cleaning Dream Team!</h3>
                <p className="text-lg mb-4 mt-4">Tellus aliquam faucibus imperdiet eget interdum risus diam.</p>
                <button className="bg-[rgba(0,84,165,1)] text-[rgba(255,255,255,1)] font-bold py-2 px-4 rounded-md hover:bg-gray- transition mt-4">
                    Join Our Team
                </button>
            </div>
        </section>
    );
};

export default HowToApply;
