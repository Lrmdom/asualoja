import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
/*
import { InputRadioGroup,ListItem } from '@commercelayer/app-elements'
*/

export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
console.log(attribute)
        return (
            <main className="border border-primary border-1 rounded p-2 w-60">

                {attribute.map((attribute) => {
                    return (
                        <>
                        <div key={attribute._key} className="p4">
                            <span className="p-4 text-primary">{attribute.value}</span>
                            {/*<InputRadioGroup
                                name="carrier"
                                onChange={function zs(){}}
                                options={[
                                    {
                                        content: <ListItem alignIcon="center" alignItems="top" borderStyle="none" icon={<Avatar alt="DHL" border="none" shape="circle" size="small" src="carriers:dhl"/>} padding="none"><div><Text size="regular" weight="bold">Domestic Express · 48h</Text><Text size="small" tag="div" variant="info" weight="medium">DHL Express</Text></div><Text size="regular" weight="bold" wrap="nowrap">€7,41</Text></ListItem>,
                                        value: 'DHL1'
                                    },
                                    {
                                        content: <ListItem alignIcon="center" alignItems="top" borderStyle="none" icon={<Avatar alt="Fedex" border="none" shape="circle" size="small" src="carriers:fedex"/>} padding="none"><div><Text size="regular" weight="bold">Express Pro · 48h</Text><Text size="small" tag="div" variant="info" weight="medium">Fedex</Text></div><Text size="regular" weight="bold" wrap="nowrap">$12,00</Text></ListItem>,
                                        value: 'Fedex'
                                    },
                                    {
                                        content: <ListItem alignIcon="center" alignItems="top" borderStyle="none" icon={<Avatar alt="DHL" border="none" shape="circle" size="small" src="carriers:dhl"/>} padding="none"><div><Text size="regular" weight="bold">Domestic Express 1200 · 24h</Text><Text size="small" tag="div" variant="info" weight="medium">DHL Express</Text></div><Text size="regular" weight="bold" wrap="nowrap">€37,61</Text></ListItem>,
                                        value: 'DHL2'
                                    }
                                ]}
                                title="Select a Rate"
                            />*/}
                            <span>
                                <cl-price code={stegaClean(attribute.sku)}>
                                    <cl-price-amount type="compare-at"></cl-price-amount>
                                    <cl-price-amount type="price"></cl-price-amount>
                                </cl-price>
                            </span>
                            <span>
                                <cl-add-to-cart code={stegaClean(attribute.sku)} quantity="1" kind="sku">
                                    {t('Add to cart')}
                                </cl-add-to-cart>
                            </span>
                        </div>
                </>
                )

                })}
            </main>
        )
    /*} else {
        return null
    }*/


}








