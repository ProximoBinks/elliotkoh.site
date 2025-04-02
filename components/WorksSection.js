import { useState } from 'react';
import Image from 'next/image';
import WorkCard from './WorkCard';

const CATEGORIES = ["HyperTools", "Client", "Personal", "University"];

const WorksSection = ({ works }) => {
    const [showAll, setShowAll] = useState(false);

    const getCategoryColor = (category) => {
        switch (category) {
            case "HyperTools":
                return "text-[#b48df0]"; // Purple for HyperTools
            case "University":
                return "text-white"; // Yellow for University
            case "Client":
                return "text-red-500"; // Red for Client
            case "Personal":
                return "text-[#23a4de]"; // Original blue for Personal
            default:
                return "text-[#8fb4dc]";
        }
    };

    const renderCategoryTitle = (category) => {
        if (category === "University") {
            return (
                <div className="flex items-center gap-3">
                    <Image
                        src="/uoa-logo.png"
                        alt="University of Auckland"
                        width={30}
                        height={30}
                        className="object-contain"
                        quality={100}
                        priority
                    />
                    <span>UNIVERSITY WORK</span>
                </div>
            );
        }

        if (category === "HyperTools") {
            return (
                <div className="flex items-center gap-3">
                    <Image
                        src="/hypertools-nobackground.png"
                        alt="HyperTools"
                        width={30}
                        height={30}
                        className="object-contain"
                        quality={100}
                        priority
                    />
                    <span>HYPERTOOLS</span>
                </div>
            );
        }

        if (category === "Client") {
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src="/red-tick.png"
                        alt="Client Work"
                        width={20}
                        height={20}
                        className="object-contain"
                        quality={100}
                        priority
                    />
                    <span>CLIENT WORK</span>
                </div>
            );
        }

        if (category === "Personal") {
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src="/personal-projects.png"
                        alt="Personal Projects"
                        width={35}
                        height={35}
                        className="object-contain"
                        quality={100}
                        priority
                    />
                    <span className="mt-[0.3rem]">PERSONAL PROJECTS</span>
                </div>
            );
        }

        return "PERSONAL PROJECTS";
    };

    return (
        <>
            <div className="flex items-center justify-between mb-10">
                <h1 className="uppercase font-extrabold text-4xl sm:text-6xl md:text-7xl">
                    selected works.
                </h1>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-4 py-2 border border-[#8fb4dc]/30 rounded-full text-sm font-medium hover:bg-[#8fb4dc]/10 transition-all duration-300 text-[#8fb4dc]"
                >
                    {showAll ? "Group by Category" : "Show All"}
                </button>
            </div>

            <div className="transition-all duration-300">
                {showAll ? (
                    // All works in one grid
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {works.map((work, index) => (
                            <WorkCard key={index} {...work} />
                        ))}
                    </div>
                ) : (
                    // Grouped by category
                    <div className="space-y-16">
                        {CATEGORIES.map((category) => {
                            const filteredWorks = works.filter(
                                (work) => work.category === category
                            );

                            if (filteredWorks.length === 0) return null;

                            return (
                                <div key={category}>
                                    <h2
                                        className={`text-2xl font-bold mb-6 tracking-wide ${getCategoryColor(category)}`}
                                    >
                                        {renderCategoryTitle(category)}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredWorks.map((work, index) => (
                                            <WorkCard key={index} {...work} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default WorksSection; 