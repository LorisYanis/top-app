import { FooterProps } from "./Footer.props";
import cn from "classnames";
import { format } from "date-fns";
import styles from "./Footer.module.css";

export const Footer = ({ className, ...props }: FooterProps) => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>
                OwlTop © 2022 - {format(new Date(), "yyyy")} All rights reserved
            </div>
            <a className={styles.link} href="#" target="_blank">
                Terms of use
            </a>
            <a className={styles.link} href="#" target="_blank">
                Privacy Policy
            </a>
        </footer>

        //<div className={cn(styles.text, styles["text-left"])}>
        //     <span>OwlTop © 2023 All rights reserved</span>
        //     </div>
        //     <div className={cn(styles.text, styles["text-right"])}>
        //         <span>Terms of Use</span>
        //         <span>Privacy Policy</span>
        //     </div>
    );
};
