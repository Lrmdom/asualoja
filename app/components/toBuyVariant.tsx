import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {authenticate} from "@commercelayer/js-auth"

const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    /*const auth = await authenticate('client_credentials', {
        clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
        scope: 'market:id:vlkaZhkGNj'
    })*/

    return (
        <>
            {/*
            <CommerceLayer accessToken={auth.accessToken} endpoint="https://execlog.commercelayer.io">
                <SkusContainer
                    skus={[
                        "SKU-BICI-TDOTERR-TREKFUEL9.8-GXGEN4-1"
                    ]}
                >
                    <Skus>
                        <SkuField
                            attribute="code"
                            tagElement="div"
                        />
                    </Skus>
                </SkusContainer>

                <PricesContainer>
                    <Price
                        className="font-bold text-primary"
                        compareClassName="line-through ml-2 text-xl"
                        skuCode={stegaClean(selectedSku)}
                    />
                </PricesContainer>
                <AvailabilityContainer skuCode={stegaClean(selectedSku)}>
                    <AvailabilityTemplate
                        showShippingMethodName
                        showShippingMethodPrice
                        timeFormat="days"
                        className="text-3xl text-gray-600"
                    />
                </AvailabilityContainer>
                <OrderStorage persistKey="cl-examples-addToCart">
                    <OrderContainer>
                    <p>
                        <AddToCartButton
                            className="rounded bg-black px-3 py-2 text-white hover:opacity-70 disabled:opacity-50"
                            label="Add SKU to cart"
                            quantity="1"
                            disabled={!selectedSku}
                            skuCode={stegaClean(selectedSku)}
                        />
                    </p>
                    </OrderContainer>
                </OrderStorage>
            </CommerceLayer>
*/}
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
                <cl-add-to-cart code={stegaClean(selectedSku)} quantity="1" kind="sku">
                    {t('Add to cart')}
                </cl-add-to-cart>
            </div>
        </>
    )

}








