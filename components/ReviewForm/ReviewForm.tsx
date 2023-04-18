import { ReviewFormProps } from "./ReviewForm.props";
import { Input, Button, Rating, Textarea } from "..";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IReviewForm } from "./RefiewForm.interface";
import CloseIcon from "./close.svg";
import cn from "classnames";
import styles from "./ReviewForm.module.css";

export const ReviewForm = ({
    productId,
    className,
    ...props
}: ReviewFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IReviewForm>();

    const onSubmit: SubmitHandler<IReviewForm> = (data: IReviewForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register("name", {
                        required: { value: true, message: "Заполните имя" },
                    })}
                    error={errors.name}
                    placeholder="Имя"
                />
                <Input
                    className={styles.inputTitle}
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Заполните заголовок",
                        },
                    })}
                    error={errors.title}
                    placeholder="Заголовок отзыва"
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: true,
                                message: "Выбирете оценку",
                            },
                        }}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                error={errors.rating}
                                setRating={field.onChange}
                                ref={field.ref}
                            />
                        )}
                    />
                </div>
                <Textarea
                    className={styles.textarea}
                    {...register("textarea", {
                        required: {
                            value: true,
                            message: "Введите текст отзыва",
                        },
                    })}
                    error={errors.textarea}
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
        </form>
    );
};
