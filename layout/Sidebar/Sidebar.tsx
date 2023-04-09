import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import { Menu } from "../Menu/Menu";

export const Sidebar = ({ ...props }: SidebarProps) => {
    return (
        <div {...props}>
            <Menu />
        </div>
    );
};
