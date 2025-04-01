import React, { useState } from 'react';
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    React.useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button 
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-[100] w-12 h-12 flex flex-col justify-center items-center group bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle menu"
            >
                <div className={`w-5 h-0.5 bg-black transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-black my-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-black transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>

            {/* Slide-in Menu */}
            <div 
                className={`fixed top-0 right-0 h-full w-[400px] bg-[#1a1a1a] shadow-2xl transform transition-transform duration-500 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ zIndex: 90 }}
            >
                {/* Menu Content */}
                <div className="h-full flex flex-col pt-32 px-12">
                    <nav className="flex-1 bg-[#3a3733]">
                        <ul className="space-y-8">
                            <li>
                                <Link 
                                    href="/" 
                                    className="text-4xl font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/keyboards" 
                                    className="text-4xl font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    KEYBOARDS
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/hobbies" 
                                    className="text-4xl font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    HOBBIES
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/contact" 
                                    className="text-4xl font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Optional: Add footer content
                    <div className="pb-12">
                        <p className="text-white/50 text-sm">© 2024 Elliot Koh</p>
                    </div> */}
                </div>
            </div>

            {/* Overlay for closing menu when clicking outside */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500"
                    style={{ zIndex: 89 }}
                    onClick={toggleMenu}
                />
            )}
        </div>
    );
};

export default HamburgerMenu;