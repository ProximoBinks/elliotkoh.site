import Link from 'next/link';

const WorkCard = ({ 
    title, 
    imagePath, 
    link, 
    tags, 
    year,
    color = "#8fb4dc", // Default to your blue color if none provided
    titleColor = "#ffffff", // New prop for title color
    yearTagColor, // New parameter
    imageClassName = "" // Optional prop for specific image styling
}) => {
    // Helper function to determine if a color is dark
    const isColorDark = (hexColor) => {
        // Handle edge case where color might be undefined or invalid
        if (!hexColor || hexColor.length !== 7) return false;
        
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        // Calculate relative luminance
        return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
    };

    // Get text color based on background color
    const getTextColor = (bgColor) => {
        if (yearTagColor) return yearTagColor; // Use custom color if provided
        if (!bgColor) return '#080807';
        return isColorDark(bgColor) ? '#ffffff' : '#080807';
    };

    const CardContent = () => (
        <div className="group">
            <img 
                src={imagePath} 
                alt={title} 
                className={`transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto ${imageClassName}`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row md:flex-col md:space-y-2 lg:flex-row lg:space-y-0 items-center sm:items-center sm:justify-between">
                <h3 
                    className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold text-center sm:text-left md:text-center lg:text-left"
                    style={{ color: titleColor }}
                >
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2 max-w-full justify-center sm:justify-start md:justify-center lg:justify-start">
                    {tags.map((tag, index) => (
                        <span 
                            key={index}
                            className="outline outline-[1px] text-xs font-semibold rounded-lg backdrop-blur-md bg-white bg-opacity-10 flex items-center justify-center min-h-[26px] px-2.5 text-center max-w-[120px] break-words"
                            style={{ 
                                outlineColor: color,
                                color: color
                            }}
                        >
                            <span className="block py-1">{tag}</span>
                        </span>
                    ))}
                    <span 
                        className="text-xs font-semibold rounded-lg flex items-center justify-center min-h-[26px] px-2.5 text-center whitespace-nowrap"
                        style={{ 
                            backgroundColor: color,
                            color: getTextColor(color)
                        }}
                    >
                        <span className="block">{year}</span>
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