import { FunctionComponent } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { LayoutProps } from "./Layout.props";
import cn from "classnames";
import styles from "./Layout.module.css";

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <Sidebar></Sidebar>
            <div>{children}</div>
            <Footer />
        </>
    );
};

export const withLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};
