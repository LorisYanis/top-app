import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css";

export const Input = forwardRef(
    (
        { error, className, ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className={styles.inputWrapper}>
                <input
                    className={cn(styles.input, className, {
                        [styles.error]: error,
                    })}
                    ref={ref}
                    {...props}
                />
                <span className={styles.errorMessage} role="alert">
                    {error && error.message}
                </span>
            </div>
        );
    }
);
