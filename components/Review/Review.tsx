import { ReviewProps } from "./Review.props";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Rating } from "..";
import cn from "classnames";
import styles from "./Review.module.css";
import UserIcon from "./user.svg";

export const Review = ({ review, className, ...props }: ReviewProps) => {
    const { name, title, description, createdAt, rating } = review;

    return (
        <div className={cn(styles.review, className)} {...props}>
            <UserIcon className={styles.user} />
            <div className={styles.nameBlock}>
                <span className={styles.name}>{name}:</span>
                <span>{title}</span>
            </div>
            <div className={styles.date}>
                {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
            </div>
            <div className={styles.rating}>
                <Rating rating={rating} />
            </div>
            <div className={styles.description}>{description}</div>
        </div>
    );
};
