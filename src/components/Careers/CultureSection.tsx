import React from 'react';

const CultureSection: React.FC = () => {
    return (
        <section className="flex md:flex-row items-center md:items-start p-8 bg-white px-28 gap-10">
            <div className="flex flex-col items-center md:items-start border">
                <div
                    className="w-64 h-64 bg-blue-400 mb-8 p-8 rounded-lg shadow-md"
                    style={{
                        backgroundImage: "url('/Images/culture.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Content inside the div (if any) */}
                </div>

                <div className="bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center w-64 h-64">
                    <div className="text-6xl font-bold">90%</div>
                    <div className="text-xl mt-2">Job Satisfaction</div>
                    <div className="text-sm mt-2">Our employees love working for Supaklin</div>
                </div>
            </div>
            <div className="md:w-2/3 border h-64">
                <div className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend">/Our culture</div>
                <h2 className="text-3xl font-bold mb-8 text-[rgba(36,35,42,1)] mt-3">Collaboration and Growth</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {[
                        { title: 'Collaboration', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                        { title: 'Improvement', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                        { title: 'Innovation', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                        { title: 'Accountability', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                        { title: 'Customer Focus', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                        { title: 'Work-Life Balance', description: 'Elit nisl morbi nunc enim pellentesque ultrices ultrices. Sit elementum massa eleifend semper.' },
                    ].map((item, index) => (
                        <div key={index}>
                            <h3 className="text-xl font-bold flex items-center mt-2">
                                <span className="mr-2 text-[rgba(36,35,42,1)] text-justify">➡</span> {item.title}
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
