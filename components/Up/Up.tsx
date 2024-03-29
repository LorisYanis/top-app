import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { scrollTopButtonAnimation } from "../../helpers/helpers";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonIcon } from "..";
import styles from "./Up.module.css";
import cn from "classnames";

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    const yPosition = useScrollY();

    useEffect(() => {
        controls.start({
            opacity: scrollTopButtonAnimation(yPosition),
        });
    }, [yPosition]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.div
            className={cn(styles.up, {
                [styles.default]: yPosition === 0,
                [styles.pointer]: yPosition > 0,
            })}
            initial={{ opacity: 0 }}
            animate={controls}
            aria-hidden="true"
        >
            <ButtonIcon
                appearance="primary"
                icon="upIcon"
                onClick={scrollToTop}
            />
        </motion.div>
    );
};
