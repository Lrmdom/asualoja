import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
/*import {authenticate} from "@commercelayer/js-auth"*/
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

export default function ToBuyVariant({selectedSku}: { attribute: SanityDocument }) {
    const [data, setData] = useState(null);
    const {t} = useTranslation('')
    const [isLoading, setIsLoading] = useState(true);


    /*const fetchData = async () => {
        try {
            const auth = await authenticate('client_credentials', {
                clientId: 'GMt9oCgl_PQGr_XCwhy3l-V3-9eAEPEeWmGhkEQtnoY',
                scope: 'market:id:vlkaZhkGNj'
            });
            setData(auth);
debugger
            console.log('Authentication successful:', auth);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();*/
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

    const options = {
        organization: "Execlog",
        accessToken: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTmp2ZGllYlhZTiIsImNsaWVudF9pZCI6IkdNdDlvQ2dsX1BRR3JfWEN3aHkzbC1WMy05ZUFFUEVlV21HaGtFUXRub1kiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJ2bGthWmhrR05qIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJna1dvbXVWUGJrIiwiQm5EUWd1d2pRRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDp2bGthWmhrR05qIiwiZXhwIjoxNzI4MDQyMzQxLCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjc1ODYxNDg0NjA3MzI1MTUsImlhdCI6MTcyODAyNzk0MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.GG2SPPXTLMPNbL_HB4KFf-ayG4pHbtKUXYKvqOmhr2WEP4NzH-9xLEUUT958BH0XipNOFEs4Ky8R1YLghwojcVxUor79rkyn7lSvcMJy9u-Xt9B7zi0b1fGvyZ3EZNS3uUF0SK5rztD7sn5WeT8w-nZ05TCJuLpCxHMND9Z-l9z3gsKDl5bUxFsKCAp7753n-xn-491cwXlryIjluXKghKj2meSRNWqWIJLJ3QiRFQkV3e68EFPXwhPGO_RYJIg8crpigag_6aOxiV9ul2-tEosL26Th4rTpCA6AzAQuBtfeZmIL94lFeoTJISOHlEgFDeEBoni6sFvVO4gx2vijZlSi6bbYOWfS2dca0ko4ZSvCifEoLM4PEC0Iy3WGFHi5yvCN4I86x-Cpq7-AKMZU797bT8J0O0ToRT6_SIZJc4IaclCy4tg2_vl2VHp7ijlELjAA3O5OYzD9e1tSaLuxDQV1XB1jhOuqtdEu36jsGE0iEabxsoAdXfz3Lnaw1gx8NrufHw9eSwhZT7AMuZim3Q17N7WqvFMBQI9tjEuB7gdfNwkqVW1_4GYzMdmmesUqJ5pw9E6dp_o1VU39ND8XYcc-uoZ--uEfYnY2-92ZVLIZBPg6HVSx79llJbLVvpp1kZR73HGNndM4uRs4LZmr5cQ_8suBCkTsknH-atIMmuo"

    }

    /*debugger
    const { sdkClient } = useCommerceLayer()
    debugger*/
    /*
        sdkClient().skus.list({ filters: { code_eq: 'trekMadoneSL7' } })
    */

    debugger
    return (
        <>

            <CommerceLayer
                accessToken="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTmp2ZGllYlhZTiIsImNsaWVudF9pZCI6IkdNdDlvQ2dsX1BRR3JfWEN3aHkzbC1WMy05ZUFFUEVlV21HaGtFUXRub1kiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJ2bGthWmhrR05qIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJna1dvbXVWUGJrIiwiQm5EUWd1d2pRRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDp2bGthWmhrR05qIiwiZXhwIjoxNzI4MDQyMzQxLCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjc1ODYxNDg0NjA3MzI1MTUsImlhdCI6MTcyODAyNzk0MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.GG2SPPXTLMPNbL_HB4KFf-ayG4pHbtKUXYKvqOmhr2WEP4NzH-9xLEUUT958BH0XipNOFEs4Ky8R1YLghwojcVxUor79rkyn7lSvcMJy9u-Xt9B7zi0b1fGvyZ3EZNS3uUF0SK5rztD7sn5WeT8w-nZ05TCJuLpCxHMND9Z-l9z3gsKDl5bUxFsKCAp7753n-xn-491cwXlryIjluXKghKj2meSRNWqWIJLJ3QiRFQkV3e68EFPXwhPGO_RYJIg8crpigag_6aOxiV9ul2-tEosL26Th4rTpCA6AzAQuBtfeZmIL94lFeoTJISOHlEgFDeEBoni6sFvVO4gx2vijZlSi6bbYOWfS2dca0ko4ZSvCifEoLM4PEC0Iy3WGFHi5yvCN4I86x-Cpq7-AKMZU797bT8J0O0ToRT6_SIZJc4IaclCy4tg2_vl2VHp7ijlELjAA3O5OYzD9e1tSaLuxDQV1XB1jhOuqtdEu36jsGE0iEabxsoAdXfz3Lnaw1gx8NrufHw9eSwhZT7AMuZim3Q17N7WqvFMBQI9tjEuB7gdfNwkqVW1_4GYzMdmmesUqJ5pw9E6dp_o1VU39ND8XYcc-uoZ--uEfYnY2-92ZVLIZBPg6HVSx79llJbLVvpp1kZR73HGNndM4uRs4LZmr5cQ_8suBCkTsknH-atIMmuo"
                endpoint="https://execlog.commercelayer.io">


                {/*<button  className="font-bold text-primary" onClick={async () => {
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

                        <cl-price code={stegaClean(selectedSku)}>
                            <cl-price-amount type="compare-at"></cl-price-amount>
                            <cl-price-amount type="price"></cl-price-amount>
                        </cl-price>
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








