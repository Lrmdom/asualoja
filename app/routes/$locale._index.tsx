import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import i18next from '~/i18next.server'
//import { Text, Badge, Button, CardDialog, ListDetailsItem, Spacer, StatusIcon} from "@commercelayer/app-elements";

export const meta: MetaFunction = () => {
    return [
        {title: 'New Remix App'},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}

export default function Index() {
    const {t} = useTranslation('')
    return (
        <>
            <h1>{t('title')}</h1>

            <Hero/>
           {/* <Badge variant="success">
                completed
            </Badge>
            <Button variant="primary" children={undefined}>HELLLO FROM APP ELEMENTS</Button>
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
            </CardDialog>*/}
        </>
    )
}
