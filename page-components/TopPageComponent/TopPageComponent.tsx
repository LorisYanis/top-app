import { Advantage, HhData, Htag, Product, Sort, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useReducer } from "react";
import { sortReducer } from "./sort.reducer";

export const TopPageComponent = ({
    firstCategory,
    page,
    products,
}: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating }
    );

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag size="big" color="gray">
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts &&
                    sortedProducts.map((product) => (
                        <Product key={product._id} product={product} />
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
