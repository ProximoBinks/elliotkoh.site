import Link from 'next/link';

const WorkCard = ({ 
    title, 
    imagePath, 
    link, 
    tags, 
    year,
    color = "#8fb4dc", // Default to your blue color if none provided
    titleColor = "#ffffff", // New prop for title color
    imageClassName = "" // Optional prop for specific image styling
}) => {
    const CardContent = () => (
        <div className="group">
            <img 
                src={imagePath} 
                alt={title} 
                className={`transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto ${imageClassName}`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                <h3 
                    className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0"
                    style={{ color: titleColor }}
                >
                    {title}
                </h3>
                <div className="flex flex-row space-x-2">
                    {tags.map((tag, index) => (
                        <span 
                            key={index}
                            className="outline outline-[1px] text-xs font-semibold rounded-lg backdrop-blur-md bg-white bg-opacity-10 flex items-center justify-center min-h-[26px] px-2.5 text-center"
                            style={{ 
                                outlineColor: color,
                                color: color
                            }}
                        >
                            <span className="block">{tag}</span>
                        </span>
                    ))}
                    <span 
                        className="relative text-xs font-semibold rounded-lg flex items-center justify-center min-h-[26px] px-2.5 text-center overflow-hidden"
                        style={{ 
                            backgroundColor: color,
                        }}
                    >
                        <span className="relative z-10 mix-blend-difference text-white">{year}</span>
                    </span>
                </div>
            </div>
        </div>
    );

    return link ? (
        <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href={link} target="_blank">
            <CardContent />
        </Link>
    ) : (
        <div className="transition-all relative overflow-hidden rounded-lg">
            <CardContent />
        </div>
    );
};

export default WorkCard; 