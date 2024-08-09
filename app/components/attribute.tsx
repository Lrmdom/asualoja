import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import { lazy, Suspense } from "react";
import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'


export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    console.log(attribute)
    return (
        <main className="">

            <ClientOnly fallback={null}>
                {() => <InputToggleButton
                    label={attribute[0].name}
                    mode="single"
                    onChange={function zs() {
                    }}
                    options={
                        attribute
                    }
                />}
            </ClientOnly>

            {attribute.map((attribute) => {
                return (
                    <>
                            <span className="container p-4">
                                <cl-price code={stegaClean(attribute.sku)}>
                                    <cl-price-amount type="compare-at"></cl-price-amount>
                                    <cl-price-amount type="price"></cl-price-amount>
                                </cl-price>
                            </span>
                    </>
                )
            })}
        </main>
    )

}








