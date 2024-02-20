import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <div
                className="flex flex-col h-screen overflow-x-hidden bg-hero-pattern bg-top bg-cover"
            >
                <Header />
                <main className="flex-grow">{children}</main>

            </div>
            <Footer />
        </>
    );
}

export default Layout;