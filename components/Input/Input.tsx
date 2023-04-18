import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css";

export const Input = forwardRef(
    (
        { className, ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <input
                className={cn(styles.input, className)}
                ref={ref}
                {...props}
            />
        );
    }
);
