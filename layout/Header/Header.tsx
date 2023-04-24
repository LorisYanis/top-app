import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HeaderProps } from "./Header.props";
import { ButtonIcon } from "../../components";
import { motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import cn from "classnames";
import styles from "./Header.module.css";
import Logo from "../logo.svg";
import Link from "next/link";

export const Header = ({ className, ...props }: HeaderProps) => {
    const [isMenuShowed, setIsMenuShowed] = useState<boolean>(false);
    const route = useRouter();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setIsMenuShowed(false);
    }, [route]);

    const variants = {
        closed: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: shouldReduceMotion ? 0 : "100%",
        },
        opened: {
            opacity: 1,
            x: 0,
            transition: shouldReduceMotion
                ? {}
                : {
                      stiffness: 100,
                      type: "spring",
                  },
        },
    };

    return (
        <header className={cn(className, styles.header)} {...props}>
            <Link href="/">
                <Logo className={styles.logo} />
            </Link>
            <ButtonIcon
                appearance="white"
                icon="menuIcon"
                onClick={() => setIsMenuShowed(true)}
            />
            {isMenuShowed && (
                <motion.div
                    className={styles.mobileMenu}
                    variants={variants}
                    initial="closed"
                    animate="opened"
                >
                    <Sidebar />
                    <ButtonIcon
                        className={styles.closeIcon}
                        appearance="white"
                        icon="closeIcon"
                        onClick={() => setIsMenuShowed(false)}
                    />
                </motion.div>
            )}
        </header>
    );
};
