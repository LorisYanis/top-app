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
            <span
                className={cn({
                    [styles.active]: sort === SortEnum.Rating,
                })}
                onClick={() => setSort(SortEnum.Rating)}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                    onSortHandle(key, SortEnum.Rating)
                }
            >
                <SortIcon className={styles.sortIcon} />
                По рейтингу
            </span>
            <span
                className={cn({
                    [styles.active]: sort === SortEnum.Price,
                })}
                onClick={() => setSort(SortEnum.Price)}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                    onSortHandle(key, SortEnum.Price)
                }
            >
                <SortIcon className={styles.sortIcon} />
                По цене
            </span>
        </div>
    );
};
