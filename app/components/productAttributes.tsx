import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {Label} from "../../@/components/ui/label";
import {Button} from "../../@/components/ui/button"
import {Suspense, useState} from "react";
import {InputRadioGroup} from "@commercelayer/app-elements";
import ProductAttr from "~/components/productAttr";
import {RadioGroup} from "../../@/components/ui/radio-group";
import ToBuyVariant from "~/components/toBuyVariant";


function setSelectedColorSku( sku,color){
    setSelectedSku(sku)
    setSelectedColor(color)
}

export default function ProductAttributes({product}: { attribute: SanityDocument }) {

    const {t} = useTranslation('')
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSku, setSelectedSku] = useState("")

    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    let groupedVariantsAttrs
    if (Array.isArray(product.variants)) {


        let variantsAttrs: any[] = []
        product.variants.map((variant) => {
            if (Array.isArray(variant.attributes)) {

                let vAttrs = variant.attributes.filter(attr => attr._type === 'attribute')
                vAttrs.forEach(function (element) {
                    element.sku = stegaClean(variant.sku)
                    element.images = variant.images
                    element.label = stegaClean(element.value.toUpperCase())
                    element.content = <div className="text-xs">{element.label}</div>
                    Reg_Exp.test(stegaClean(element.value)) ? element.className = `bg-[${stegaClean(element.value)}]` : null

                });

                variantsAttrs = variantsAttrs.concat(vAttrs)
                variantsAttrs = variantsAttrs.sort((a, b) => a.name.localeCompare(b.name))
            }
        })

        groupedVariantsAttrs = variantsAttrs.reduce((current, item) => {
            if (!current[stegaClean(item.name.trim())]) {
                current[stegaClean(item.name.trim())] = [];
            }
            current[stegaClean(item.name.trim())].push(item);

            return current;
        }, {});
    }
    return (<main className="">

        <div className="grid gap-4">
            <div>


                <div className="flex items-center gap-2">
                    {Object.entries(groupedVariantsAttrs).map((attribute) => {
                        //atribute[0] is name and attribute[1] is array of value/s

                        return (
                            <>
                                <Label htmlFor="color" className="text-base font-medium">
                                    {attribute[0]}
                                </Label>
                                {attribute[1].length > 0 ?

                                    <div>
                                        {Reg_Exp.test(stegaClean(attribute[1][0].value)) ?
                                            <>
                                                <RadioGroup
                                                    value={selectedColor}
                                                    onValueChange={setSelectedColor}
                                                    className="flex flex-wrap gap-4 justify-center"
                                                >
                                                    {attribute[1].map((attr) => {
                                                        return (

                                                            <ProductAttr setSelectedSku={setSelectedSku} setSelectedSize={setSelectedSize} selectedSku={selectedSku} selectedSize={selectedSize} attr={attr}></ProductAttr>

                                                        )

                                                    })}
                                                </RadioGroup>
                                                <div className="mt-6 text-center">
                                                    <span
                                                        className="text-sm text-muted-foreground">Selected color: </span>
                                                    <span className="font-semibold"
                                                          style={{color: stegaClean(selectedColor)}}>
                                            {selectedColor}
                                                        {selectedSku}
                                            </span>
                                                </div>
                                            </>
                                            :
                                            attribute[1].map((attr) => {
                                                return (

                                                    <ProductAttr setSelectedSku={setSelectedSku} setSelectedSize={setSelectedSize} selectedSku={selectedSku} selectedSize={selectedSize} attr={attr}></ProductAttr>

                                                )

                                            })


                                        }

                                    </div> : null}

                            </>
                        )
                    })}


                </div>
                <ToBuyVariant selectedSku={selectedSku} ></ToBuyVariant>
            </div>
        </div>

    </main>)

}



