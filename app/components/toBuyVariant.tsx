import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'


export default function ToBuyVariant({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')

    console.log(attribute)

    return (
        <>
        <span className="container p-4">
                                <cl-price code={stegaClean(attribute.sku)}>
                                    <cl-price-amount type="compare-at"></cl-price-amount>
                                    <cl-price-amount type="price"></cl-price-amount>
                                </cl-price>
                            </span>
            <div>
                <cl-availability code={stegaClean(attribute.sku)}>
                    <cl-availability-status type="available" style={{color: "green"}}>
                        {t("• available")}
                    </cl-availability-status>
                    <cl-availability-status type="available-with-info">
                        ready to be shipped in
                        <cl-availability-info type="min-days"></cl-availability-info>-
                        <cl-availability-info type="max-days"></cl-availability-info>
                        days
                        with <cl-availability-info type="shipping-method-name"></cl-availability-info> (
                        <cl-availability-info type="shipping-method-price"></cl-availability-info>
                        )
                    </cl-availability-status>
                    <cl-availability-status type="unavailable" style={{color: "red"}}>
                        • out of stock
                    </cl-availability-status>
                </cl-availability>
            </div>
            <cl-price code={stegaClean(attribute.sku)}>
                <cl-price-amount type="compare-at"></cl-price-amount>
                <cl-price-amount type="price"></cl-price-amount>
            </cl-price>
            <cl-add-to-cart code={stegaClean(attribute.sku)} quantity="1" kind="sku">
                {t('Add to cart')}
            </cl-add-to-cart>
        </>
    )

}








