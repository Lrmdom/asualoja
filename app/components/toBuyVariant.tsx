import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'

import {
    AddToCartButton,
    AvailabilityContainer,
    AvailabilityTemplate,
    LineItemsContainer,
    LineItemsCount,
    OrderContainer,
    OrderStorage,
    Price,
    PricesContainer
} from "@commercelayer/react-components"
import * as React from "react";
import {useEffect, useState} from "react";

import {ClientOnly} from "remix-utils/client-only"
import {useNavigate} from "@remix-run/react";
import {redirect} from "@remix-run/node";
import {CommerceLayer} from "@commercelayer/sdk";
import Cookies from "js-cookie";


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {

    return (
        <>

            {/*<SkusContainer
                    skus={[
                        "SKU-BICI-TDOTERR-TREKFUEL9.8-GXGEN4-1"
                        stegaClean(selectedSku?selectedSku:"trekMadoneSL7")
                    ]}
                >
                    <Skus>
                        <SkuField
                            attribute="code"
                            attribute="name"
                            tagElement="div"
                        />
                    </Skus>
                </SkusContainer>
                </SkusContainer>*/}
            {selectedSku ? (
                <>
            <PricesContainer>

                <ClientOnly fallback={null}>
                    {() => <Price
                        className="font-bold text-primary"
                        compareClassName="line-through ml-2 text-xl"
                        skuCode={stegaClean(selectedSku)}
                    />}

                </ClientOnly>
            </PricesContainer>

                    <AvailabilityContainer skuCode={stegaClean(selectedSku)}>

                        <AvailabilityTemplate>
                            {/*//TODO id selectedSku?show:hide*/}
                            {
                                childrenProps => {
                                    return <div>
                                        <p className='font-bold'>Custom logic:</p>
                                        <p className='mb-8'>
                                            {childrenProps.quantity} items available delivered in{' '}
                                            {childrenProps.min?.days} - {childrenProps.max?.days} days
                                        </p>
                                        <p className='font-bold'>The delivery_lead_times object</p>
                                        <pre>{JSON.stringify(childrenProps, null, 20)}</pre>
                                    </div>;
                                }}

                        </AvailabilityTemplate>
                        <AvailabilityTemplate
                            showShippingMethodName
                            showShippingMethodPrice
                            timeFormat="days"
                            className="text-gray-600"
                        />

                    </AvailabilityContainer>
                </>
            ) : null}


            {/*<OrderStorage persistKey="execlogdemoorder">

                <OrderContainer>*/}

                    {/*<p>
                                <AddToCartButton
                                    className="px-3 py-2 bg-black text-white rounded disabled:opacity-50 hover:opacity-70"
                                    label="Add SKU to cart"
                                    quantity="1"
                                    disabled={!selectedSku}
                                    skuCode={stegaClean(selectedSku)}
                                />
                            </p>*/}


                    <AddToCartButton
                        disabled={stegaClean(selectedSku) ? false : true}//TODO if is available activate button
                        skuCode={stegaClean(selectedSku)}
                        quantity="1"

                        className="px-3 py-2 bg-black text-white rounded disabled:opacity-50 hover:opacity-90 focus:outline focus:outline-offset-20 focus:outline-purple-500 "
                        label="Add SKU to cart"
                        hostedCartUrl='brilliant-custard-06fc9a.netlify.app'
                        checkoutUrl='resplendent-gnome-8fd84a.netlify.app'
                        /*buyNowMode={true}*/
                        /*redirectToHostedCart={true}*/
                        /*buyNowMode={true}
                        redirectToHostedCart={true}*/
                    >
                        {/*{
                        childrenProps => {
                            return <div>

                                <pre>{JSON.stringify(childrenProps, null, 20)}</pre>
                            </div>;
                        }}*/}

                    </AddToCartButton>

               {/* </OrderContainer>

            </OrderStorage>*/}


            {/*<div>
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
    </div>*/}
        </>
    )

}








