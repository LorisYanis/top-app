import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
    const onSortHandle = (key: KeyboardEvent, action: SortEnum) => {
        if (key.key === "Enter" && action === SortEnum.Rating) {
            setSort(SortEnum.Rating);
        }
        if (key.key === "Enter" && action === SortEnum.Price) {
            setSort(SortEnum.Price);
        }
    };

    return (
        <div className={cn(styles.sort, className)} {...props}>
            <div style={{ display: "none" }} id="sort">
                Сортировка
            </div>
            <button
                className={cn({
                    [styles.active]: sort === SortEnum.Rating,
                })}
                id="rating"
                onClick={() => setSort(SortEnum.Rating)}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                    onSortHandle(key, SortEnum.Rating)
                }
                aria-labelledby="sort rating"
                aria-selected={sort === SortEnum.Rating}
            >
                <SortIcon className={styles.sortIcon} />
                По рейтингу
            </button>
            <button
                className={cn({
                    [styles.active]: sort === SortEnum.Price,
                })}
                id="price"
                onClick={() => setSort(SortEnum.Price)}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                    onSortHandle(key, SortEnum.Price)
                }
                aria-labelledby="sort price"
                aria-selected={sort === SortEnum.Price}
            >
                <SortIcon className={styles.sortIcon} />
                По цене
            </button>
        </div>
    );
};
