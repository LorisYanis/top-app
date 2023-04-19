import { Search } from "../../components";
import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import Link from "next/link";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
    return (
        <div className={cn(styles.sidebar, className)} {...props}>
            <Link href="/">
                <Logo className={styles.logo} />
            </Link>
            <Search />
            <Menu />
        </div>
    );
};
