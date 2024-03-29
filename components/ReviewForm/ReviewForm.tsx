import { useState } from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import { Input, Button, Rating, Textarea } from "..";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IReviewForm, IReviewFormSentResponse } from "./RefiewForm.interface";
import { API } from "../../helpers/api";
import CloseIcon from "./close.svg";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import axios from "axios";

export const ReviewForm = ({
    productId,
    isOpened,
    className,
    ...props
}: ReviewFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>();

    const onSubmit: SubmitHandler<IReviewForm> = async (
        formData: IReviewForm
    ) => {
        try {
            const { data } = await axios.post<IReviewFormSentResponse>(
                API.review.createDemo,
                { ...formData, productId }
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError("Что-то пошло не так...");
            }
        } catch (error) {
            setIsError(error.message);
        }
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.title ? true : false}
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
                                tabIndex={isOpened ? 0 : -1}
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-label="Текст отзыва"
                    aria-invalid={errors.textarea ? true : false}
                />
                <div className={styles.submit}>
                    <Button
                        appearance="primary"
                        tabIndex={isOpened ? 0 : -1}
                        onClick={() => clearErrors()}
                    >
                        Отправить
                    </Button>
                    <span className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            {isSuccess && (
                <div className={styles.success} role="alert">
                    <div className={styles.successTitle}>
                        Ваш отзыв отправлен
                    </div>
                    <div>
                        Спасибо, ваш отзыв будет опубликован после проверки.
                    </div>
                    <CloseIcon
                        className={styles.successCloseIcon}
                        onClick={() => setIsSuccess(!isSuccess)}
                        tabIndex={0}
                        aria-label="закрыть оповещение"
                        onKeyDown={(key: KeyboardEvent) => {
                            if (key.key === "Enter") {
                                setIsSuccess(!isSuccess);
                            }
                        }}
                    />
                </div>
            )}
            {isError && (
                <div className={styles.error} role="alert">
                    <div>Что-то пошло не так...</div>
                    <CloseIcon
                        className={styles.errorCloseIcon}
                        onClick={() => setIsError(undefined)}
                        tabIndex={0}
                        aria-label="закрыть оповещение"
                        onKeyDown={(key: KeyboardEvent) => {
                            if (key.key === "Enter") {
                                setIsError(undefined);
                            }
                        }}
                    />
                </div>
            )}
        </form>
    );
};
