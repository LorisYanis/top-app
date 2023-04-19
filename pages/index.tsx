import axios from "axios";
import { GetStaticProps } from "next";
import { useState } from "react";
import { Htag, Button, P, Tag, Rating, Input, Textarea } from "../components";
import { API } from "../helpers/api";
import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
    const [rating, setRating] = useState<number>(0);

    return (
        <>
            <Htag tag="h1">Text h1</Htag>
            <Htag tag="h2">Text h2</Htag>
            <Htag tag="h3">Text h3</Htag>
            <Button appearance="primary" arrow="right">
                Button
            </Button>
            <Button appearance="ghost" arrow="down">
                Button
            </Button>
            <P size="big">Big</P>
            <P size="normal">Normal</P>
            <P>Normal without props</P>
            <P size="small">Small</P>
            <Tag color="ghost">Ghost</Tag>
            <Tag color="green">Green</Tag>
            <Tag color="red">Red</Tag>
            <Tag color="primary">Primary</Tag>
            <Rating isEditable rating={rating} setRating={setRating} />
            <Rating rating={rating} />
            <Input placeholder="test" />
            <Textarea placeholder="test" />
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory,
    });
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
