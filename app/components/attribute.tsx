import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'
import AttributeVisualization from "~/components/attributeVisualization";

export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    //console.log(attribute)



    return (
        <main className="">




                <InputToggleButton
                    label={attribute[0].name}
                    mode="single"
                    onChange={function zs() {
                    }}
                    options={
                        attribute
                    }
                />

            {attribute.map((attribute) => {
                return (
                    <>
                        <AttributeVisualization attribute={attribute}></AttributeVisualization>
                            <span className="container p-4">
                                <cl-price code={stegaClean(attribute.sku)}>
                                    <cl-price-amount type="compare-at"></cl-price-amount>
                                    <cl-price-amount type="price"></cl-price-amount>
                                </cl-price>
                            </span>
                        <cl-add-to-cart code={stegaClean(attribute.sku)} quantity="1" kind="sku">
                            {t('Add to cart')}
                        </cl-add-to-cart>
                    </>
                )
            })}
        </main>
    )

}








