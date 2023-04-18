import { TextareaProps } from "./Textarea.props";
import cn from "classnames";
import styles from "./Textarea.module.css";
import { ForwardedRef, forwardRef } from "react";

export const Textarea = forwardRef(
    (
        { className, ...props }: TextareaProps,
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        return (
            <textarea
                className={cn(styles.textarea, className)}
                ref={ref}
                {...props}
            />
        );
    }
);
