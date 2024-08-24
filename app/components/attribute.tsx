import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import {Avatar, Dropdown, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'
import AttributeVisualization from "~/components/attributeVisualization";
import ToBuyVariant from "~/components/toBuyVariant";

export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    if (attribute[0].visualPresentation && stegaClean(attribute[0].visualPresentation.visualization) === "InputToggleButton") {
        return (
            attribute.map((attr) => {
                return (
                    <div>
                        <input type="radio" value={attr.value} name="size"/> {attr.value}
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )

            })


            /*<ClientOnly fallback={null}>
                {() => <InputToggleButton
                    label={attribute.name}
                    mode="single"
                    onChange={function zs() {
                    }}
                    options={attribute}
                />}
            </ClientOnly>*/
        )
    }
    if (attribute[0].visualPresentation && stegaClean(attribute[0].visualPresentation.visualization) === "InputToggleColorButton") {
        return (
            attribute.map((attr) => {
                return (
                    <div>
                        <AttributeVisualization attribute={attr}></AttributeVisualization>
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )

            })

        )

    }

    if (attribute[0].visualPresentation && stegaClean(attribute[0].visualPresentation.visualization) === "InputToggleColor") {
        return (
            attribute.map((attr) => {
                return (
                    <div>
                        <AttributeVisualization attribute={attr}></AttributeVisualization>
                        <ToBuyVariant attribute={attr}></ToBuyVariant>

                    </div>
                )
            })

        )

    }

    if (attribute[0].visualPresentation && stegaClean(attribute[0].visualPresentation.visualization) === "Dropdown") {
        return (
            <div>
                <Dropdown dropdownItems={attribute}></Dropdown>
            </div>
        )
    }
    //todo if not visualPresentation, check if valid color else visualpresentation=InputToggleButton or dropdown if more than 5 options
    /*return (
        <main className="">
            {attribute.map((attr) => {
                debugger;
                return (
                    <>
                        <AttributeVisualization attribute={attr}></AttributeVisualization>
                        <span className="container p-4">
                                <cl-price code={stegaClean(attr.sku)}>
                                    <cl-price-amount type="compare-at"></cl-price-amount>
                                    <cl-price-amount type="price"></cl-price-amount>
                                </cl-price>
                            </span>
                        <div>
                            <cl-availability code={stegaClean(attr.sku)}>
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
                        <cl-add-to-cart code={stegaClean(attr.sku)} quantity="1" kind="sku">
                            {t('Add to cart')}
                        </cl-add-to-cart>
                    </>
                )
            })}
        </main>
    )*/
}








