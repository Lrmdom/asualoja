import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {Dropdown} from '@commercelayer/app-elements'
import AttributeVisualization from "~/components/attributeVisualization";
import ToBuyVariant from "~/components/toBuyVariant";

export default function Attribute({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
//console.log(attribute[0].visualPresentation)
    if (stegaClean(attribute[0].visualPresentation?.visualization) === "InputToggleButton") {
        return (
            attribute.map((attr) => {
                const output = `rounded border border-primary p-2 ${attr.sku}`

                return (
                    <div>
                        <button className={output} value={stegaClean(attr.value)}
                                name="size"> {stegaClean(attr.value.toUpperCase())}</button>
                        {attr.description ?

                            <div
                                className="container p-4 bg-black text-white">{attr.description ? attr.description : null}</div>

                            : null}
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )

            })

        )
    }
    if (stegaClean(attribute[0].visualPresentation?.visualization) === "InputToggleColorButton") {
        return (
            attribute.map((attr) => {
                return (
                    <div>
                        <AttributeVisualization attribute={attr}></AttributeVisualization>
                        {attr.description ?

                            <div
                                className="container p-4 bg-black text-white">{attr.description ? attr.description : null}</div>

                            : null}
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )

            })

        )

    }

    if (stegaClean(attribute[0].visualPresentation?.visualization) === "InputToggleColor") {
        return (
            attribute.map((attr) => {
                return (
                    <div>
                        <AttributeVisualization attribute={attr}></AttributeVisualization>
                        {attr.description ?

                            <div
                                className="container p-4 bg-black text-white">{attr.description ? attr.description : null}</div>

                            : null}
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )
            })

        )

    }

    if (stegaClean(attribute[0].visualPresentation?.visualization) === "Dropdown") {
        return (
            <div>
                <Dropdown dropdownItems={attribute}></Dropdown>
            </div>
        )
    }

    if (attribute[0].visualPresentation === null) {
        let Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        return (
            attribute.map((attr) => {
                let output = `rounded border border-primary p-2 ${attr.sku}`
                Reg_Exp.test(stegaClean(attr.value)) ?   //is valid color?
                    output = <AttributeVisualization attribute={attr}/>
                    :
                    output =
                        <button className={output} value={stegaClean(attr.value)}
                                name="size"> {stegaClean(attr.value.toUpperCase())}</button>
                return (
                    <div>
                        {output}
                        {attr.description ?

                            <div
                                className="container p-4 bg-black text-white">{attr.description ? attr.description : null}</div>

                            : null}
                        <ToBuyVariant attribute={attr}></ToBuyVariant>
                    </div>
                )

            })

        )
    }


    //todo if not visualPresentation, check if valid color else visualpresentation=InputToggleButton or dropdown if more than 5 options
    /*return (
        <main className="">
            {attribute.map((attr) => {
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








