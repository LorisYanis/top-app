import { FunctionComponent, useRef, useState } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { LayoutProps } from "./Layout.props";
import cn from "classnames";
import styles from "./Layout.module.css";
import { AppContextProvider, IAppContext } from "../context/app.context";

export const Layout = ({ children }: LayoutProps) => {
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const onSkipLinkHandle = (key: KeyboardEvent) => {
        if (key.key === "Enter") {
            bodyRef.current?.focus();
            setIsDisplayed(false);
        }
        setIsDisplayed(false);
    };

    return (
        <div className={styles.wrapper}>
            <a
                onFocus={() => setIsDisplayed(true)}
                className={cn(styles.skipLink, {
                    [styles.displayed]: isDisplayed,
                })}
                tabIndex={10}
                onKeyDown={(key: KeyboardEvent) => onSkipLinkHandle(key)}
            >
                Сразу к содержанию
            </a>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar}></Sidebar>
            <div className={styles.body} ref={bodyRef} tabIndex={0}>
                {children}
            </div>
            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider
                menu={props.menu}
                firstCategory={props.firstCategory}
            >
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};
