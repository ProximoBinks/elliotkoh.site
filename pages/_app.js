import { Raleway } from 'next/font/google';
import Script from 'next/script';
import Layout from '../components/layout';
import '../styles/globals.css';

// Self-hosted via next/font: no render-blocking Google Fonts request, no layout
// shift, and the full variable weight range (globals.css relied on 400-900).
const raleway = Raleway({ subsets: ['latin'], display: 'swap' });

function MyApp({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${raleway.style.fontFamily}, sans-serif;
                }
            `}</style>

            {/* Google Analytics — loaded after hydration so it never blocks rendering */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-MJW0JEJSJH"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MJW0JEJSJH');
                `}
            </Script>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
