import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div
            className="flex flex-col h-screen overflow-x-hidden bg-cover bg-top bg-hero-pattern"
        >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;