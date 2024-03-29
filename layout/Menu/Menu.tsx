import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";
import cn from "classnames";
import Link from "next/link";
import styles from "./Menu.module.css";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        hidden: { marginBottom: 0 },
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion
                ? {}
                : {
                      when: "beforeChildren",
                      staggerChildren: 0.04,
                  },
        },
    };

    const variantsChildren = {
        hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
        visible: {
            opacity: 1,
            height: 29,
        },
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                })
            );
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map((m) => (
                    <li key={m.route} aria-expanded={m.id === firstCategory}>
                        <Link legacyBehavior href={`/${m.route}`}>
                            <a className={styles.mainLink}>
                                <div
                                    className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]:
                                            m.id === firstCategory,
                                    })}
                                >
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                className={styles.secondLevel}
                                tabIndex={0}
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                                aria-expanded={m.isOpened ? true : false}
                            >
                                {m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                initial={m.isOpened ? "visible" : "hidden"}
                                animate={m.isOpened ? "visible" : "hidden"}
                                variants={variants}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(
                                    m.pages,
                                    menuItem.route,
                                    m.isOpened ?? false
                                )}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (
        pages: PageItem[],
        route: string,
        isOpened: boolean
    ) => {
        return pages.map((p) => (
            <motion.li
                className={styles.thirdLevelLink}
                variants={variantsChildren}
                key={p._id}
            >
                <Link legacyBehavior href={`/${route}/${p.alias}`}>
                    <a
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]:
                                `/${route}/${p.alias}` == router.asPath,
                        })}
                        tabIndex={isOpened === true ? 0 : -1}
                        aria-current={
                            `/${route}/${p.alias}` == router.asPath
                                ? "page"
                                : false
                        }
                    >
                        {p.category}
                    </a>
                </Link>
            </motion.li>
        ));
    };

    return (
        <nav className={styles.menu} role="navigation">
            {buildFirstLevel()}
        </nav>
    );
};
