import React, { useState } from 'react';
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            {/* Hamburger Button */}
            <button 
                onClick={toggleMenu}
                className="relative z-50 w-10 h-10 flex flex-col justify-center items-center group"
                aria-label="Toggle menu"
            >
                <div className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black my-1.5 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>

            {/* Menu Overlay */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <nav className="h-full flex flex-col items-center justify-center">
                    <ul className="space-y-8 text-center">
                        <li>
                            <Link 
                                href="/" 
                                className="text-4xl font-bold hover:text-[#8fb4dc] transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/keyboards" 
                                className="text-4xl font-bold hover:text-[#8fb4dc] transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                Keyboards
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/hobbies" 
                                className="text-4xl font-bold hover:text-[#8fb4dc] transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                Hobbies
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/contact" 
                                className="text-4xl font-bold hover:text-[#8fb4dc] transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu; 