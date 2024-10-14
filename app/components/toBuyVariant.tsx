import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'

import {
    AddToCartButton,
    AvailabilityContainer,
    AvailabilityTemplate,
    CartLink,
    CommerceLayer,
    LineItemsContainer,
    LineItemsCount,
    OrderContainer,
    OrderStorage,
    Price,
    PricesContainer
} from "@commercelayer/react-components"
import * as React from "react";
import {useState} from "react";

import {ClientOnly} from "remix-utils/client-only"
import {authenticate} from "@commercelayer/js-auth";
import Cookies from "js-cookie";


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const [data, setData] = useState(null);
    const {t} = useTranslation('')
    const [isLoading, setIsLoading] = useState(true);





    const MyCartIcon = () => (
        <div className='relative inline-block cursor-pointer text-xs font-bold'>
            <LineItemsContainer>

                {/* static icon */}
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='36'
                    height='36'
                    fill='currentColor'
                    viewBox='0 0 256 256'
                >
                    <path
                        d='M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z'/>
                </svg>

                {/* total number of cart items */}
                <LineItemsCount className='absolute bottom-2 left-1/2 transform -translate-x-1/2'/>

            </LineItemsContainer>
        </div>
    )


    return (
        <>

            <CommerceLayer
                accessToken="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoicFJ2RGlyYU9ZcCIsImNsaWVudF9pZCI6IjlCckQ0RlVNelJEVEh4NU1MQklPQ09yczdUVVdsNklJMGw4UTVCTkU2dzgiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJhb1hPQmhlbmVsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJna1dvbXVWUGJrIiwiQm5EUWd1d2pRRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDphb1hPQmhlbmVsIiwiZXhwIjoxNzI4OTAwNTA1LCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjEwOTc4NDY0MzcxOTAyNzA4LCJpYXQiOjE3Mjg4ODYxMDUsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.FBYjAJ-RubffFHdbLZZ4k4YUvwSqCfRWgKBhH7xhDJG77aoYp_pIgFix8Z7CDYzVMxLmPVwNoN1vvf-BzYhN_CPcs4I3OYBYlPsQjAmvZ5Z3dalRZkBxeWzOaAvv86N1AkJvt9y9qpnAD5SDdKIrYXZou6W1LAdrqwOx_UDlgGdQLAv7lIwKSi-5XdzwaezaYK6hSmx_1yjDu0g03sSWFhJBMFXeHve4EE3h4_aeKdTQzPTIYro4-Cbfyc2q-r1ggSa9S6tlgOaWdtFBKbbL_nNBTQUr-jrjEAH6Y60ymUxME0p3FxnaORA9sbDzHq834S1E3dYUtqubZ4Im1lOt8iWtUoTF-Dcwj0Ej0GaGW0_MSTNlgannLl0-ZgmwyhCktFMZc6bEesSC1lojzKL94BMR4pq3zKcqNXR7y-xkOI3C_vWDvTegAxysoKxC25VUYuw3WIdNrqex7v47LcdmKNZYm3v5hcEFl5DpfljInmYtsigo7IcbKKX84u4e8ttVbjaP9JRHorP41HF31adWWTISVhncLH1XlF9-rcwRC4KQEJyQODzfacicxfwETzmk_5htetZGQfyPBZ3Tj-3ygGnpHOEDQAG8YI9q8OxwLf8lmsQl5k--aaL3pQpuRY09dA8ugfwDQRMpgjd367i-0P4RoOjg4EXeVhuNiwIIrl8"
                endpoint="https://execlog.commercelayer.io">





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

                <PricesContainer>
                    <cl-price code={stegaClean(selectedSku)}>
                        <cl-price-amount type="compare-at"></cl-price-amount>
                        <cl-price-amount type="price"></cl-price-amount>
                    </cl-price>
                    {/*<ClientOnly fallback={null}>
                        {selectedSku?() => <Price
                            className="font-bold text-primary"
                            compareClassName="line-through ml-2 text-xl"
                            skuCode={stegaClean(selectedSku?selectedSku:"")}
                        />:null}

                    </ClientOnly>*/}
                </PricesContainer>

                <AvailabilityContainer skuCode={stegaClean(selectedSku ? selectedSku : "")}>
                    <AvailabilityTemplate>

                        {selectedSku ? (childrenProps => {
                            return <div>
                                <p className='font-bold'>Custom logic:</p>
                                <p className='mb-8'>
                                    {childrenProps.quantity} items available delivered in{' '}
                                    {childrenProps.min?.days} - {childrenProps.max?.days} days
                                </p>
                                <p className='font-bold'>The delivery_lead_times object</p>
                                <pre>{JSON.stringify(childrenProps, null, 5)}</pre>
                            </div>;
                          }) : null
                        }

                    </AvailabilityTemplate>
                    {/*<AvailabilityTemplate
                        showShippingMethodName
                        showShippingMethodPrice
                        timeFormat="days"
                        className="text-gray-600"
                    />*/}

                </AvailabilityContainer>
                <OrderStorage persistKey="cl-examples-addToCart">

                        <OrderContainer>

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
                                skuCode={stegaClean(selectedSku?selectedSku:"")}
                                quantity="1"

                                className="px-3 py-2 bg-black text-white rounded disabled:opacity-50"
                                label="Add SKU to cart"
                                /*buyNowMode={true}
                                redirectToHostedCart={true}*/
                                hostedCartUrl='brilliant-custard-06fc9a.netlify.app'
                                protocol="https"
                                /*buyNowMode={true}
                                checkoutUrl='brilliant-custard-06fc9a.netlify.app/checkoputhosted'
                                redirectToHostedCart={true}*/
                            />
                        </OrderContainer>
                    </OrderStorage>
            </CommerceLayer>

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
                   <cl-add-to-cart code={stegaClean(selectedSku)} quantity="1" kind="sku">
                        {t('Add to cart')}
                    </cl-add-to-cart>
                </div>
            </div>
        </>
    )

}








