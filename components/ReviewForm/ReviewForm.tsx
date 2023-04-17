import { ReviewFormProps } from "./ReviewForm.props";
import { Input, Button, Rating, Textarea } from "..";
import { useState } from "react";
import CloseIcon from "./close.svg";
import cn from "classnames";
import styles from "./ReviewForm.module.css";

export const ReviewForm = ({
    productId,
    className,
    ...props
}: ReviewFormProps) => {
    const [rating, setRating] = useState<number>(0);

    return (
        <>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input placeholder="Имя" />
                <Input
                    className={styles.inputTitle}
                    placeholder="Заголовок отзыва"
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Rating isEditable rating={rating} setRating={setRating} />
                </div>
                <Textarea
                    className={styles.textarea}
                    placeholder="Текст отзыва"
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить</Button>
                    <span className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <CloseIcon className={styles.closeIcon} />
            </div>
        </>
    );
};
