import {
    Advantage,
    HhData,
    Htag,
    Product,
    Sort,
    Tag,
    Up,
} from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { decOfNumber } from "../../helpers/helpers";
import { useReducedMotion } from "framer-motion";
import styles from "./TopPageComponent.module.css";

export const TopPageComponent = ({
    firstCategory,
    page,
    products,
}: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating }
    );
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        dispatchSort({ type: "reset", initialState: products });
    }, [products]);

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    return (
        <div className={styles.wrapper}>
            <Up />
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag
                        size="big"
                        color="gray"
                        aria-label={`${products.length} ${decOfNumber(
                            products.length,
                            ["курс", "курса", "курсов"]
                        )}`}
                    >
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div role="list">
                {sortedProducts &&
                    sortedProducts.map((product) => (
                        <Product
                            role="listitem"
                            layout={shouldReduceMotion ? false : true}
                            key={product._id}
                            product={product}
                        />
                    ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag size="big" color="red">
                    hh.ru
                </Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && (
                <HhData {...page.hh} />
            )}
            <div className={styles.advantages}>
                {page.advantages.length !== 0 && (
                    <Htag tag="h2">Преймущества</Htag>
                )}
                {page &&
                    page.advantages.map((advantage) => (
                        <Advantage
                            key={advantage._id}
                            title={advantage.title}
                            description={advantage.description}
                            _id={advantage._id}
                        />
                    ))}
                {page.seoText && (
                    <div
                        className={styles.seo}
                        dangerouslySetInnerHTML={{ __html: page.seoText }}
                    />
                )}
                <Htag className={styles.h2} tag="h2">
                    Получаемые навыки
                </Htag>
                <div className={styles.tags}>
                    {page.tags.map((tag) => (
                        <Tag className="tag" key={tag} color="primary">
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};
