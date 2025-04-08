import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {CommerceLayer} from "@commercelayer/sdk";
import AddToCartButton from "@commercelayer/react-components/orders/AddToCartButton";
import {OrderStorage} from "@commercelayer/react-components";


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    return (
        <>


            <div>
                <cl-availability code={stegaClean(selectedSku)}>
                    <cl-availability-status type="available" style={{color: "green"}}>
                        {t("• available")}
                    </cl-availability-status>
                    <div>
                        <cl-availability-status type="available">

                            {t("Ready to be shipped in ")}
                            <cl-availability-info type="min-days"></cl-availability-info>
                            -
                            <cl-availability-info type="max-days"></cl-availability-info>
                            {t(" days ")}
                            {t("with ")}
                            <cl-availability-info type="shipping-method-name"></cl-availability-info>
                            (
                            <cl-availability-info type="shipping-method-price"></cl-availability-info>
                            )
                        </cl-availability-status>
                        <cl-availability-status type="unavailable" style={{color: "red"}}>
                            {t("• out of stock")}
                        </cl-availability-status>
                    </div>
                </cl-availability>

                <cl-price code={stegaClean(selectedSku)}>
                    <cl-price-amount type="compare-at"></cl-price-amount>
                    <cl-price-amount type="price"></cl-price-amount>
                </cl-price>
                <div>
                    <cl-add-to-cart code={stegaClean(selectedSku)} quantity="1" kind="sku" _external_price={true}>
                        {t('Add to cart')}
                    </cl-add-to-cart>
                </div>
            </div>
        </>
    )

}








