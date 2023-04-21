import { motion, useMotionValue } from "framer-motion";
import { ButtonProps } from "./Button.props";
import ArrowIcon from "./arrow.svg";
import styles from "./Button.module.css";
import cn from "classnames";
import { useEffect } from "react";

export const Button = ({
    appearance,
    arrow = "none",
    children,
    className,
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <motion.button
            className={cn(styles.button, className, {
                [styles.primary]: appearance === "primary",
                [styles.ghost]: appearance === "ghost",
            })}
            whileHover={{ scale: 1.04 }}
            {...props}
        >
            {children}
            {arrow !== "none" && (
                <ArrowIcon
                    className={cn(styles.arrow, {
                        [styles.arrowDown]: arrow === "down",
                    })}
                />
            )}
        </motion.button>
    );
};
