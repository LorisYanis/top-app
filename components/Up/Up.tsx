import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { scrollTopButtonAnimation } from "../../helpers/helpers";
import { useScrollY } from "../../hooks/useScrollY";
import styles from "./Up.module.css";
import UpIcon from "./up.svg";

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    const yPosition = useScrollY();

    useEffect(() => {
        controls.start({ opacity: scrollTopButtonAnimation(yPosition) });
    }, [yPosition]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.button
            className={styles.up}
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={controls}
        >
            <UpIcon />
        </motion.button>
    );
};
