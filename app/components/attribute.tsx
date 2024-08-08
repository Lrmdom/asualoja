import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'

import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'


export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    console.log(attribute)
    return (
        <main className="">
            <InputToggleButton
                label={attribute[0].name}
                mode="single"
                onChange={function zs(){}}
                options={
                attribute
               }
            />

            {attribute.map((attribute) => {
                return (
                    <>
                            <span>
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
    /*} else {
        return null
    }*/


}








