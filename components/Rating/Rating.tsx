import {
    useEffect,
    useState,
    KeyboardEvent,
    forwardRef,
    ForwardedRef,
    useRef,
} from "react";
import { RatingProps } from "./Rating.props";
import cn from "classnames";
import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

export const Rating = forwardRef(
    (
        {
            isEditable = false,
            rating,
            setRating,
            error,
            tabIndex,
            className,
            ...props
        }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
            new Array(5).fill(<></>)
        );
        const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

        useEffect(() => {
            constructRating(rating);
        }, [rating, tabIndex]);

        const computeFocus = (r: number, i: number): number => {
            if (!isEditable || !setRating) {
                return -1;
            }

            if (!r && i === 0) {
                return tabIndex ?? 0;
            }

            if (r === i + 1) {
                return tabIndex ?? 0;
            }

            return -1;
        };

        const constructRating = (currentRating: number) => {
            const updatedArray = ratingArray.map(
                (r: JSX.Element, i: number) => {
                    return (
                        <span
                            className={cn(styles.starWrapper)}
                            onMouseEnter={() => changeDisplay(i + 1)}
                            onMouseLeave={() => changeDisplay(rating)}
                            onClick={() => onClick(i + 1)}
                            tabIndex={computeFocus(rating, i)}
                            onKeyDown={(e: KeyboardEvent) => handleKey(e)}
                            ref={(r) => ratingArrayRef.current?.push(r)}
                        >
                            <StarIcon
                                className={cn(styles.star, {
                                    [styles.filled]: i < currentRating,
                                    [styles.editable]: isEditable,
                                })}
                            />
                        </span>
                    );
                }
            );

            setRatingArray(updatedArray);
        };

        const changeDisplay = (i: number) => {
            if (!isEditable) {
                return;
            }
            constructRating(i);
        };

        const onClick = (i: number) => {
            if (!isEditable || !setRating) {
                return;
            }
            setRating(i);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (!isEditable || !setRating) {
                return;
            }

            if (!rating) {
                setRating(0);
            }

            if (e.code === "ArrowRight" || e.code === "ArrowUp") {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
                ratingArrayRef.current[rating]?.focus();
            }

            if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
                e.preventDefault();
                setRating(rating > 1 ? rating - 1 : 1);
                ratingArrayRef.current[rating - 2]?.focus();
            }
        };

        return (
            <div
                className={cn(styles.ratingWrapper, className, {
                    [styles.ratingError]: error,
                })}
                ref={ref}
                {...props}
            >
                {ratingArray.map((r: JSX.Element, i: number) => (
                    <span key={i}>{r}</span>
                ))}
                {error && (
                    <span className={styles.errorMessage}>{error.message}</span>
                )}
            </div>
        );
    }
);
