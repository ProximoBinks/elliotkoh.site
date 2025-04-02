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
                className={`fixed top-0 right-0 h-screen w-screen md:w-[768px] bg-[#393632] shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ zIndex: 90 }}
            >
                {/* Menu Content */}
                <div className="h-full flex flex-col justify-center px-12">
                    <nav className="flex-1 flex items-center">
                        <ul className="space-y-1 md:space-y-2 text-5xl md:text-6xl w-full">
                            <li>
                                <Link
                                    href="/"
                                    className="font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/keyboards"
                                    className="font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    KEYBOARDS
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/hobbies"
                                    className="font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    HOBBIES
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="font-bold text-white/90 hover:text-[#8fb4dc] transition-colors duration-300 block"
                                    onClick={toggleMenu}
                                >
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer with Email and Social Links */}
                    <div className="pb-12 mt-auto">
                        <p className="text-[#a29e9a] text-sm md:text-lg font-bold uppercase ">Email Address</p>
                        <p className="text-white/90 mb-6 text-sm md:text-lg"><a href="mailto:elliot@proximo.life">elliot@proximo.life</a></p>

                        <div className="flex space-x-3 text-sm md:text-base">
                            <Link
                                href="https://www.linkedin.com/in/elliotkoh1/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/90 border border-white/30 px-4 py-[0.6rem] rounded-full hover:bg-white/10 transition-colors duration-300"
                            >
                                LINKEDIN
                            </Link>
                            <Link
                                href="https://instagram.com/elliot.koh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/90 border border-white/30 px-4 py-[0.6rem] rounded-full hover:bg-white/10 transition-colors duration-300"
                            >
                                INSTAGRAM
                            </Link>
                            <Link
                                href="https://hypertools.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative text-white/90 border border-white/30 px-4 py-[0.6rem] rounded-full hover:bg-white/5 hover:border-[#b464ff]/50 hover:text-white transition-all duration-300 overflow-hidden group"
                            >
                                <span className="relative z-10">HYPERTOOLS</span>
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#b464ff]/20 to-transparent transition-transform duration-1000 ease-in-out"></span>
                            </Link>
                        </div>
                    </div>
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