import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Raleway } from 'next/font/google';
import Script from 'next/script';
import Layout from '../components/layout';
import '../styles/globals.css';

// Self-hosted via next/font: no render-blocking Google Fonts request, no layout
// shift, and the full variable weight range (globals.css relied on 400-900).
const raleway = Raleway({ subsets: ['latin'], display: 'swap' });

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // globals.css forces scroll-behavior: smooth for in-page anchors, but that
    // also animates Next's scroll-to-top on route changes — new pages appear at
    // the old scroll offset and visibly glide up. Suspend smooth scrolling for
    // the duration of the navigation so the jump to top is instant.
    useEffect(() => {
        const root = document.documentElement;

        const disableSmooth = () =>
            root.style.setProperty('scroll-behavior', 'auto', 'important');
        const restoreSmooth = () =>
            setTimeout(() => root.style.removeProperty('scroll-behavior'), 0);

        router.events.on('routeChangeStart', disableSmooth);
        router.events.on('routeChangeComplete', restoreSmooth);
        router.events.on('routeChangeError', restoreSmooth);
        return () => {
            router.events.off('routeChangeStart', disableSmooth);
            router.events.off('routeChangeComplete', restoreSmooth);
            router.events.off('routeChangeError', restoreSmooth);
        };
    }, [router.events]);

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
