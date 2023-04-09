import { AppContext } from "../../context/app.context";
import { useContext, useEffect } from "react";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { format } from "date-fns";
import styles from "./Menu.module.css";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
    {
        route: "courses",
        name: "Курсы",
        icon: <CoursesIcon />,
        id: TopLevelCategory.Courses,
    },
    {
        route: "services",
        name: "Сервисы",
        icon: <ServicesIcon />,
        id: TopLevelCategory.Services,
    },
    {
        route: "books",
        name: "Книги",
        icon: <BooksIcon />,
        id: TopLevelCategory.Books,
    },
    {
        route: "products",
        name: "Продукты",
        icon: <ProductsIcon />,
        id: TopLevelCategory.Products,
    },
];

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <a className={styles.mainLink} href={`/${m.route}`}>
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
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>
                            {m._id.secondCategory}
                        </div>
                        <div
                            className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened,
                            })}
                        >
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((page) => (
            <a
                className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false,
                })}
                href={`/${route}/${page.alias}`}
            >
                {page.category}
            </a>
        ));
    };

    return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
