import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="preload" as="image" href="/herosquare5.webp" />
            </Head>
            <div
                className="flex flex-col h-screen overflow-x-hidden bg-cover bg-top bg-hero-pattern"
            >
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;