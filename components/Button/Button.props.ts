import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps
    extends Omit<
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "ref"
    > {
    appearance: "primary" | "ghost";
    arrow?: "right" | "down" | "none";
    children: ReactNode;
}
