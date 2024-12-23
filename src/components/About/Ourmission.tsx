// OurMission.tsx
import React from 'react';

type MissionData = {
    number: string;
    title: string;
    description: string;
};

type OurMissionProps = {
    missions: MissionData[];
};

const Ourmission: React.FC<OurMissionProps> = ({ missions }) => {
    return (
        <section className="p-8 bg-gray-50 px-[10%] my-12 h-[100%]">
            <h1 className="text-6xl font-bold text-rgba[(36,35,42,1)] mb-6 font-lexend">Our Mission</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((mission, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start gap-2 p-4"
                    >
                        <h2 className="text-5xl font-bold text-[rgba(0,84,165,1)] font-lexend">{mission.number}</h2>
                        <h3 className="text-3xl font-semibold text-rgba[(36,35,42,1)] font-lexend">{mission.title}</h3>
                        <p className="text-sm text-[rgba(107,106,126,1)] font-sans">{mission.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Ourmission;
