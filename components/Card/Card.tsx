import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { CardProps } from "./Card.props";
import cn from "classnames";
import styles from "./Card.module.css";

export const Card = motion(
    forwardRef(
        (
            { color = "white", children, className, ...props }: CardProps,
            ref: ForwardedRef<HTMLDivElement>
        ) => {
            return (
                <div
                    className={cn(styles.card, className, {
                        [styles.white]: color === "white",
                        [styles.blue]: color === "blue",
                    })}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            );
        }
    )
);
