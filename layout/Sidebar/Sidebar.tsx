import { Search } from "../../components";
import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";
import cn from "classnames";
import styles from "./Sidebar.module.css";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
    return (
        <div className={cn(styles.sidebar, className)} {...props}>
            <Logo className={styles.logo} />
            <Search />
            <Menu />
        </div>
    );
};
