import { DividerProps } from "./Divider.props";
import cn from "classnames";
import styles from "./Divider.module.css";

export const Divider = ({ className, ...props }: DividerProps) => {
    return <hr className={cn(styles.hr, className)} />;
};
