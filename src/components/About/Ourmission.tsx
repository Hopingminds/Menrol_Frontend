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
        <section className="p-8 bg-gray-50 px-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((mission, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start gap-2 p-4"
                    >
                        <h2 className="text-4xl font-bold text-blue-600">{mission.number}</h2>
                        <h3 className="text-lg font-semibold text-gray-800">{mission.title}</h3>
                        <p className="text-sm text-gray-600">{mission.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Ourmission;
