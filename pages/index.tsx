import { useState, useEffect } from "react";
import { Htag, Button, P, Tag, Rating } from "../components";

export default function Home(): JSX.Element {
    const [counter, setCounter] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);

    return (
        <>
            <Htag tag="h1">{counter}</Htag>
            <Htag tag="h2">Text</Htag>
            <Htag tag="h3">Text</Htag>
            <Button
                appearance="primary"
                arrow="right"
                onClick={() => setCounter(counter + 1)}
            >
                + count
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
        </>
    );
}
