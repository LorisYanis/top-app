import { useState } from "react";
import { Input, Button } from "..";
import { SearchProps } from "./Search.props";
import cn from "classnames";
import styles from "./Search.module.css";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps) => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: "/search",
            query: {
                q: search,
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            goToSearch();
        }
    };

    return (
        <form className={cn(styles.search, className)} role="search" {...props}>
            <Input
                className={styles.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onKeyDown={handleKeyDown}
            />
            <Button
                className={styles.button}
                appearance={"primary"}
                onClick={goToSearch}
                aria-label="Искать по сайту"
            >
                <GlassIcon />
            </Button>
        </form>
    );
};
