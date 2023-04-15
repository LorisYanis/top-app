import { ButtonProps } from "./Button.props";
import ArrowIcon from "./arrow.svg";
import styles from "./Button.module.css";
import cn from "classnames";

export const Button = ({
    appearance,
    arrow = "none",
    children,
    className,
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance === "primary",
                [styles.ghost]: appearance === "ghost",
            })}
            {...props}
        >
            {children}
            {arrow !== "none" && (
                <ArrowIcon
                    className={
                        cn(styles.arrow,     {
                            [styles.arrowDown]: arrow === "down",
                        })
                    }
                />
            )}
        </button>
    );
};
