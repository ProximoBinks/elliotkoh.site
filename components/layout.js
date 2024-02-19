import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <div 
                className="flex flex-col min-h-screen overflow-x-hidden"
                style={{
                    background: 'rgb(119,119,254)',
                    background: 'radial-gradient(circle, rgba(119,119,254,1) 0%, rgba(113,113,255,1) 28%, rgba(64,64,255,1) 86%, rgba(26,26,255,1) 100%)'
                }}
            >
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;