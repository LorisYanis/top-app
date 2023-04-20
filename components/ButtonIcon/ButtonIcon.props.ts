import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import closeIcon from "./close.svg";
import menuIcon from "./menu.svg";
import upIcon from "./up.svg";

export const icons = {
    closeIcon,
    menuIcon,
    upIcon,
};

export type iconName = keyof typeof icons;

export interface ButtonIconProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    appearance: "primary" | "white";
    icon: iconName;
}
