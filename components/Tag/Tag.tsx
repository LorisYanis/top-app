import { TagProps } from "./Tag.props";
import cn from "classnames";
import styles from "./Tag.module.css";

export const Tag = ({
    size = "normal",
    color = "ghost",
    href,
    children,
    className,
    ...props
}: TagProps) => {
    return (
        <div
            className={cn(styles.tag, className, {
                [styles.big]: size === "big",
                [styles.normal]: size === "normal",
                [styles.primary]: color === "primary",
                [styles.ghost]: color === "ghost",
                [styles.red]: color === "red",
                [styles.green]: color === "green",
                [styles.gray]: color === "gray",
            })}
            {...props}
        >
            {href ? <a>{children}</a> : <>{children}</>}
        </div>
    );
};
