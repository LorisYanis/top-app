import { ProductProps } from "./Product.props";
import { Button, Card, Rating, Tag } from "..";
import cn from "classnames";
import styles from "./Product.module.css";

export const Product = ({ product, className, ...props }: ProductProps) => {
    let reviews: string;

    if (product.reviewCount === 1) {
        reviews = "отзыв";
    } else if (product.reviewCount > 1 && product.reviewCount < 5) {
        reviews = "отзыва";
    } else {
        reviews = "отзывов";
    }

    return (
        <Card className={cn(styles.product, className)}>
            <div className={styles.logo}>
                <img
                    src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                    alt={product.title}
                />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>{product.price}</div>
            <div className={styles.credit}>{product.credit}</div>
            <div className={styles.rating}>
                <Rating rating={product.reviewAvg ?? 0} />
            </div>
            <div className={styles.tags}>
                {product.categories.map((category) => (
                    <Tag key={category} color="ghost">
                        {category}
                    </Tag>
                ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
                {product.reviewCount} {reviews}
            </div>
            <div className={styles.hr}>
                <hr />
            </div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>features</div>
            <div className={styles.advBlock}>
                <div className={styles.advantages}>
                    <div>Преимущества</div>
                    <div>{product.advantages}</div>
                </div>
                <div className={styles.disadvantages}>
                    <div>Недостатки</div>
                    <div>{product.disAdvantages}</div>
                </div>
            </div>
            <div className={styles.hr}>
                <hr />
            </div>
            <div className={styles.actions}>
                <Button appearance="primary">Узнать подробнее</Button>
                <Button appearance="ghost" arrow="right">
                    Читать отзывы
                </Button>
            </div>
        </Card>
    );
};
