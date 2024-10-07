import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {authenticate} from "@commercelayer/js-auth"
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
import {useState} from "react";

import {ClientOnly} from "remix-utils/client-only"
import Cookies from "js-cookie";


export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const [data, setData] = useState(null);
    const {t} = useTranslation('')
    const [isLoading, setIsLoading] = useState(true);


    const mytoken = (async () => {
        let token = "";
        const getCookieToken = Cookies.get("clIntegrationToken");
        if (!getCookieToken || getCookieToken === "undefined") {

            const auth = await authenticate('client_credentials', {
                clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
                scope: 'market:id:vlkaZhkGNj'
            })
            token = auth.accessToken;
            Cookies.set("clIntegrationToken", token, {
                expires: auth.expires
            });

        } else {
            token = getCookieToken || "";
        }

        console.log(token)
        return token;
    })();

    /*const cl = CommerceLayer({
        organization: 'Execlog',
        accessToken: mytoken
    })*/


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
                accessToken={mytoken}
                endpoint="https://execlog.commercelayer.io">


                {/*<button className="font-bold text-primary" onClick={async () => {
                    debugger
                    const skus = sdkClient.skus.list({filters: {code_cont: 'trekMadoneSL7'}})
                }}
                >
                    Fetch specific SKU code
                </button>*/}


                {/*<SkusContainer
                    skus={[
                        stegaClean(selectedSku?selectedSku:"trekMadoneSL7")
                    ]}
                >
                    <Skus>
                        <SkuField
                            attribute="name"
                            tagElement="div"
                        />
                    </Skus>
                </SkusContainer>*/}

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
                    <AvailabilityTemplate
                        showShippingMethodName
                        showShippingMethodPrice
                        timeFormat="days"
                        className="text-gray-600"
                    />

                </AvailabilityContainer>
                <OrderStorage persistKey="cl-examples-addToCart-Leon">
                    <OrderContainer>

                        <CartLink
                            className="text-blue-500 hover:underline"
                            label={MyCartIcon()}
                            onClick={function Fa() {
                            }}
                            target="_blank"
                        />


                        <AddToCartButton
                            disabled={stegaClean(selectedSku) ? false : true}//TODO if is available activate button
                            skuCode={stegaClean(selectedSku)}
                            quantity="1"

                            className="px-3 py-2 bg-black text-white rounded disabled:opacity-50"
                            label="Add SKU to cart"
                            /*buyNowMode={true}*/
                            /*redirectToHostedCart={true}*/
                            /*buyNowMode={true}
                            hostedCartUrl='https://brilliant-custard-06fc9a.netlify.app'
                            checkoutUrl='brilliant-custard-06fc9a.netlify.app/checkoputhosted'
                            redirectToHostedCart={true}*/
                        />
                    </OrderContainer>
                </OrderStorage>
            </CommerceLayer>


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
                <cl-add-to-cart code={stegaClean(selectedSku)} quantity="1" kind="sku" buyNowMode>
                    {t('Add to cart')}
                </cl-add-to-cart>
            </div>

        </>
    )

}








