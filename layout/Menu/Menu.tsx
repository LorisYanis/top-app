import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion } from "framer-motion";
import cn from "classnames";
import Link from "next/link";
import styles from "./Menu.module.css";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        hidden: { marginBottom: 0 },
        visible: {
            marginBottom: 20,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.04,
            },
        },
    };

    const variantsChildren = {
        hidden: { opacity: 0, height: 0 },
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
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <Link legacyBehavior href={`/${m.route}`}>
                            <a className={styles.mainLink}>
                                <div
                                    className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]:
                                            m.id == firstCategory,
                                    })}
                                >
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div
                                className={styles.secondLevel}
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                            >
                                {m._id.secondCategory}
                            </div>
                            <motion.div
                                layout
                                initial={m.isOpened ? "visible" : "hidden"}
                                animate={m.isOpened ? "visible" : "hidden"}
                                variants={variants}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((p) => (
            <motion.div variants={variantsChildren} key={p._id}>
                <Link legacyBehavior href={`/${route}/${p.alias}`}>
                    <a
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]:
                                `/${route}/${p.alias}` == router.asPath,
                        })}
                    >
                        {p.category}
                    </a>
                </Link>
            </motion.div>
        ));
    };

    return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
