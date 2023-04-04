import { PProps } from "./P.props";
import cn from "classnames";
import styles from "./P.module.css";

export const P = ({
    size = "normal",
    children,
    className,
    ...props
}: PProps) => {
    return (
        <p
            className={cn(styles.p, className, {
                [styles.big]: size === "big",
                [styles.normal]: size === "normal",
                [styles.small]: size === "small",
            })}
            {...props}
        >
            {children}
        </p>
    );
};
