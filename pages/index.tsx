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
        <div className="indexWrapper">
            <div className="owlText">
                <Htag tag="h1">OWL Top - the topics app</Htag>
                <P>Search the 7,000+ courses in Coursera Plus</P>
            </div>
            <Button
                className="coursesButton"
                appearance="primary"
                arrow="right"
            >
                Check Courses
            </Button>
        </div>
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
