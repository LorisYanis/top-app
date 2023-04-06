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
            <div>
                <Sidebar />
                <div>{children}</div>
            </div>
            <Footer />
        </>
    );
};
