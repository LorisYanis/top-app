import React from "react";
import { Htag } from "../Htag/Htag";
import { AdvantageProps } from "./Advantage.props";
import DoneIcon from "./done.svg";
import styles from "./Advantage.module.css";

export const Advantage = ({ title, description }: AdvantageProps) => {
    return (
        <div className={styles.advantage}>
            <DoneIcon className={styles.icon} />
            <Htag className={styles.title} tag="h3">
                {title}
            </Htag>
            <div className={styles.stick}></div>
            <p className={styles.description}>{description}</p>
        </div>
    );
};
