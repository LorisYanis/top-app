import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Top App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />;
        </>
    );
}
