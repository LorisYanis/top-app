import { Htag, Button, P, Tag } from "../components";

export default function Home(): JSX.Element {
    return (
        <>
            <Htag tag="h1">Text</Htag>
            <Htag tag="h2">Text</Htag>
            <Htag tag="h3">Text</Htag>
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
        </>
    );
}
