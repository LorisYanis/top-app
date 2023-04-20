import { motion } from "framer-motion";
import { ProductProps } from "./Product.props";
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "..";
import { decOfNumber, priceMoney } from "../../helpers/helpers";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import styles from "./Product.module.css";

export const Product = motion(
    forwardRef(
        (
            { product, className, ...props }: ProductProps,
            ref: ForwardedRef<HTMLDivElement>
        ) => {
            const [isReviewOpened, setIsReviewOpened] =
                useState<boolean>(false);
            const reviewRef = useRef<HTMLDivElement>(null);

            const scrollToReview = () => {
                setIsReviewOpened(true);
                reviewRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            };

            return (
                <div className={className} ref={ref} {...props}>
                    <Card className={cn(styles.product)}>
                        <div className={styles.logo}>
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_DOMAIN +
                                    product.image
                                }
                                alt={product.title}
                                width={70}
                                height={70}
                            />
                        </div>
                        <div className={styles.title}>{product.title}</div>
                        <div className={styles.price}>
                            {priceMoney(product.price)}
                            {product.oldPrice && (
                                <Tag className={styles.oldPrice} color="green">
                                    {priceMoney(
                                        product.price - product.oldPrice
                                    )}
                                </Tag>
                            )}
                        </div>
                        <div className={styles.credit}>
                            {priceMoney(product.credit)}/
                            <span className={styles.month}>мес</span>
                        </div>
                        <div className={styles.rating}>
                            <Rating
                                rating={
                                    product.reviewAvg ?? product.initialRating
                                }
                            />
                        </div>
                        <div className={styles.tags}>
                            {product.categories.map((category) => (
                                <Tag
                                    className={styles.category}
                                    key={category}
                                    color="ghost"
                                >
                                    {category}
                                </Tag>
                            ))}
                        </div>
                        <div className={styles.priceTitle}>цена</div>
                        <div className={styles.creditTitle}>кредит</div>
                        <div className={styles.rateTitle}>
                            <a onClick={scrollToReview}>
                                <span>{product.reviewCount}</span>
                                {decOfNumber(product.reviewCount, [
                                    "отзыв",
                                    "отзыва",
                                    "отзывов",
                                ])}
                            </a>
                        </div>
                        <Divider className={styles.hr} />
                        <div className={styles.description}>
                            {product.description}
                        </div>
                        <div className={styles.features}>
                            {product.characteristics.map((characteristic) => (
                                <div
                                    className={styles.characteristic}
                                    key={characteristic.name}
                                >
                                    <span className={styles.characteristicName}>
                                        {characteristic.name}
                                    </span>
                                    <span
                                        className={styles.characteristicDots}
                                    ></span>
                                    <span
                                        className={styles.characteristicValue}
                                    >
                                        {characteristic.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.advBlock}>
                            {product.advantages && (
                                <div className={styles.advantages}>
                                    <div className={styles.advTitle}>
                                        Преимущества
                                    </div>
                                    <div>{product.advantages}</div>
                                </div>
                            )}
                            {product.disAdvantages && (
                                <div className={styles.disadvantages}>
                                    <div className={styles.advTitle}>
                                        Недостатки
                                    </div>
                                    <div>{product.disAdvantages}</div>
                                </div>
                            )}
                        </div>
                        <Divider className={cn(styles.hr, styles.hr2)} />
                        <div className={styles.actions}>
                            <Button
                                className={styles.button1}
                                appearance="primary"
                            >
                                Узнать подробнее
                            </Button>
                            <Button
                                className={styles.button2}
                                appearance="ghost"
                                arrow={isReviewOpened ? "down" : "right"}
                                onClick={() => {
                                    setIsReviewOpened(!isReviewOpened);
                                }}
                            >
                                Читать отзывы
                            </Button>
                        </div>
                    </Card>
                    <Card
                        className={cn(styles.review, {
                            [styles.closed]: !isReviewOpened,
                            [styles.opened]: isReviewOpened,
                        })}
                        color="blue"
                        ref={reviewRef}
                    >
                        {product.reviews.map((review) => (
                            <div key={review._id}>
                                <Review review={review} />
                                <Divider />
                            </div>
                        ))}
                        <ReviewForm productId={product._id} />
                    </Card>
                </div>
            );
        }
    )
);
