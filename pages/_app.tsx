import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({
    Component,
    pageProps,
    router,
}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Top App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" />
                <meta property="og:title" content="OWL Top" />
                <meta
                    property="og:description"
                    content="The best top application you've ever seen"
                />
                <meta
                    property="og:url"
                    content="{process.env.NEXT_PUBLIC_DOMAIN + router.asPath}"
                />
                <meta property="og:locale" content="ru_Ru" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
