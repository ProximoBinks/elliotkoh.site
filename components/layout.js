import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <div
                className="flex flex-col min-h-screen overflow-x-hidden bg-hero-pattern bg-top bg-cover"
            >
                <Header />
                <main className="flex-grow min-h-screen">{children}</main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
