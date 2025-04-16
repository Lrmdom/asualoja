import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import React, {useState, useEffect} from 'react';

import {
    AddToCartButton,
    AvailabilityContainer,
    AvailabilityTemplate, PlaceOrderButton,
    Price,
    PricesContainer, SkuField, Skus, SkusContainer
} from "@commercelayer/react-components"
import * as React from "react";

import {ClientOnly} from "remix-utils/client-only"
import {CommerceLayer} from "@commercelayer/sdk";
import Cookies from "js-cookie";
import {authenticate} from "@commercelayer/js-auth";
import {useTranslation} from "react-i18next";


//todo
/*prices are influenced by factors like seasonality; location, particularly related to other factors like an event (e.g. Paris 2024 Olympics);
property size; and so on. However, the advent of AI introduces new possibilities for all brands to utilize dynamic pricing. Specifically, OpenAI's ChatGPT has revolutionized the way a business can implement a dynamic pricing strategy*/


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const {t} = useTranslation()

    const [skuOptions, setSkuOptions] = useState([]);

    //TODO test webhooks with https://app.requestbin.net/

    async function getSkuOptions() {
        //const sku = stegaClean(selectedSku)
        const getCookieToken = Cookies.get("clIntegrationToken")
        const cl = CommerceLayer({
            organization: import.meta.env.VITE_MY_ORGANIZATION, accessToken: getCookieToken,
        })
        const mysku = await cl.skus.list({include: ['sku_options'], filters: {code_eq: selectedSku}})
        console.log(mysku)
        setSkuOptions(mysku[0].sku_options);
        return mysku[0].sku_options
    }


    async function addCartExternalPrice() {
        const sku = stegaClean(selectedSku)
        const orderId = localStorage.getItem("execlogOrderPersistKey")
        const getCookieToken2 = Cookies.get("clIntegrationToken2")
        const cl = CommerceLayer({
            organization: import.meta.env.VITE_MY_ORGANIZATION, accessToken: getCookieToken2,
        })


        const lineData = {
            "type": "line_items",
            "sku_code": selectedSku,
            "_external_price":true,
            "quantity": 1,
            "unit_amount_cents": 555555,
            "order": {id: orderId, type: "orders"},
            "metadata": {}

        }


        const newLine_item = await cl.line_items.create(lineData).catch(error => console.log(error.errors))
        console.log(newLine_item)


        const orderData = {
            "type": "orders",
            "id": orderId,
            "validate": true,
            /*"cart_url": "brilliant-custard-06fc9a.netlify.app",*/
            // "checkout_url": "resplendent-gnome-8fd84a.netlify.app",
            "customer_email": "john@example.com",

            metadata: {
                store_location: "to define fn yet",
                user_event: "to define fn yet",
                user_location: "to define fn yet",
                start_Date: new Date().toISOString(), end_Date: new Date().toISOString(), vehicleModel: "Yamaha R1 Leon"
            }
        }


        const newordermetadata = await cl.orders.update(orderData).catch(error => console.log(error.errors))
        console.log(newordermetadata)


        const lineItemOptionData = {
            "type": "line_item_options",
            "line_item": {id: newLine_item.id, type: "line_items"},
            "quantity": 1,
            "options": {},
            "sku_option": {id: "BzaPsKYePX", type: "sku_options"},
            metadata:{}

        }

        const newLine_item_option = await cl.line_item_options.create(lineItemOptionData).catch(error => console.log(error.errors))
        console.log(newLine_item_option)

    }


    async function addSkuOption() {

        const getCookieToken2 = Cookies.get("clIntegrationToken2")
        const cl = CommerceLayer({
            organization: import.meta.env.VITE_MY_ORGANIZATION, accessToken: getCookieToken2,
        })

        const orderId = localStorage.getItem("execlogOrderPersistKey")
        /*
                {"data":{
                    "sku_code": "SKU-BICI-GRAVTREK-SLR6",
                        "type": "line_items",
                        //_external_price: true,
                        "name": "my test name to use i18n",
                        "quantity": 1,
                        "unit_amount_cents": 10000,
                        "order": "KaehedryvA",
                        "metadata": {
                        "store_location": "to define fn yet",
                            "user_event": "to define fn yet",
                            "user_location": "to define fn yet",
                            "start_Date": "2025-04-25", "end_Date": "2025-04-27",
                            "vehicleModel": "Yamaha R1 Leon"
                    }
                }
                }*/


        const lineData = {
            "type": "line_items",
            "attributes": {
                "sku_code": "SKU-BICI-TDOTERR-TREKMAR5-GEN3-1",
                "quantity": 1,
                "_update_quantity": true
            },
            "relationships": {
                "order": {
                    "data": {
                        "id": "KaehednKpR",
                        "type": "orders"
                    }
                }
            }
        }


        const mylineitem = await cl.line_items.create({lineData})

        const lineDataOption = {
            name: "opção Seguro",
            line_item: mylineitem.id,
            metadata: {
                store_location: "to define fn yet",
                user_event: "to define fn yet",
                user_location: "to define fn yet",
                start_Date: new Date().toISOString(), end_Date: new Date().toISOString(), vehicleModel: "Yamaha R1 Leon"
            }
        }

        const mylineitemoption = await cl.line_item_options.create({lineDataOption})
        console.log(mylineitemoption)
    }



    return (<>


        {

            selectedSku ? (<>
                <>
                    <button className="bg-primary" onClick={addCartExternalPrice}> add cart external
                        price{selectedSku}</button>
                    <button className="bg-primary-300" onClick={getSkuOptions}>Get sku options
                        from {selectedSku} </button>
                    <div>
                        {skuOptions && skuOptions.length > 0 ? (
                            skuOptions.map((option) => (
                                <div key={option.id}>
                                    <button onClick={addSkuOption}
                                            className="bg-primary-500">{t(stegaClean(option.name))} - {option.formatted_price_amount}</button>
                                    {t("Elevate Your Digital Presence")}
                                </div>

                            ))
                        ) : (
                            <div>No options available for this SKU.</div>
                        )}
                    </div>
                </>
                <SkusContainer
                    skus={[
                        selectedSku
                    ]}
                >
                    <Skus>
                        <SkuField
                            attribute="name"
                            tagElement="div"
                        />
                    </Skus>
                </SkusContainer>
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
                        {childrenProps => {
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
            </>) : null}


        {/*<OrderStorage persistKey="execlogOrderPersistKey">

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
            /*onClick={addCartExternalPrice(stegaClean(selectedSku))}*/
            disabled={stegaClean(selectedSku) ? false : true}//TODO if is available activate button
            //skuCode={stegaClean(selectedSku)}
            skuCode={stegaClean(selectedSku)}
            quantity="1"
            lineItem={
                {
                    name:"leo test line_item with external_price",
                    externalPrice: true,
                    metadata:{}
                }
            }
            lineItemOption={{skuOptionId:"BzaPsKYePX", options:{}, quantity:1 }}
            className="px-3 py-2 bg-black text-white rounded disabled:opacity-50 hover:opacity-90 focus:outline focus:outline-offset-20 focus:outline-purple-500 "
            label={stegaClean(selectedSku)}
            hostedCartUrl='https://brilliant-custard-06fc9a.netlify.app/'
            checkoutUrl='https://resplendent-gnome-8fd84a.netlify.app/'
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
    </>)

}
