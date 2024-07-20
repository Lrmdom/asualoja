import type {MetaFunction} from "@remix-run/node";

import { Steps, Card, Text, Badge, Button, CardDialog, ListDetailsItem, Spacer, StatusIcon} from "@commercelayer/app-elements";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    return (
        <div className="font-sans p-4">

            <div>
            <Badge variant="success">
                completed
            </Badge>
            <Button variant="primary" >HELLLO FROM APP ELEMENTS</Button>
            <CardDialog
                icon={<StatusIcon background="gray" gap="large" name="cloudArrowUp"/>}
                rightContent={<Text size="regular" weight="bold">$29</Text>}
                subtitle="DHL express"
                title="Express Easy"
            >
                <Spacer top="4">
                    <ListDetailsItem
                        border="none"
                        childrenAlign="right"
                        gutter="none"
                        label="Status"
                    >
                        <Button variant="link">
                            In transit
                        </Button>
                    </ListDetailsItem>
                    <ListDetailsItem
                        border="none"
                        childrenAlign="right"
                        gutter="none"
                        label="Tracking"
                    >
                        42314321ASD4545
                    </ListDetailsItem>
                    <ListDetailsItem
                        border="none"
                        childrenAlign="right"
                        gutter="none"
                        label="Estimated delivery"
                    >
                        May 17, 2023 12:00 AM
                    </ListDetailsItem>
                </Spacer>
            </CardDialog>
                <Steps
                    steps={[
                        {
                            label: 'Pre-Transit'
                        },
                        {
                            label: 'In Transit'
                        },
                        {
                            active: true,
                            label: 'Out for delivery'
                        },
                        {
                            label: 'Delivered'
                        }
                    ]}
                />

                <Button variant="primary">
                    Hello
                </Button>
                <Badge variant="success">123</Badge>
                <Card overflow="visible">
                    <p>
                        <strong>
                            I am a card
                        </strong>
                    </p>
                    <p>
                        I am a card content row
                    </p>
                    <p>
                        I am a card content row
                    </p>
                    <p>
                        I am a card content row
                    </p>
                </Card>
            </div>
            <h1 className="text-3xl">Welcome to Remix</h1>
            <ul className="list-disc mt-4 pl-6 space-y-2">
                <li>
                    <a
                        className="text-blue-700 underline visited:text-purple-900"
                        target="_blank"
                        href="https://remix.run/start/quickstart"
                        rel="noreferrer"
                    >
                        5m Quick Start
                    </a>
                </li>
                <li>
                    <a
                        className="text-blue-700 underline visited:text-purple-900"
                        target="_blank"
                        href="https://remix.run/start/tutorial"
                        rel="noreferrer"
                    >
                        30m Tutorial
                    </a>
                </li>
                <li>
                    <a
                        className="text-blue-700 underline visited:text-purple-900"
                        target="_blank"
                        href="https://remix.run/docs"
                        rel="noreferrer"
                    >
                        Remix Docs
                    </a>
                </li>
            </ul>
        </div>
    );
}
