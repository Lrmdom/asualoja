import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {Label} from "@/components/ui/label";

import ProductAttr from "~/components/productAttr";
import {RadioGroup} from "@/components/ui/radio-group";
import ToBuyVariant from "~/components/toBuyVariant";
import {useState} from "react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";

import EmblaCarousel from '~/components/emblaCarousel/EmblaCarousel'
import {EmblaOptionsType} from 'embla-carousel'

import {ClientOnly} from "remix-utils/client-only"
import ProductAttributes from "~/components/productAttributes";

/*function setSkuImage( attrValue,attr){
    debugger;
    let sku = attr[1][0].sku
    //sku is not correct must do a find attr[0].find({value:attrValue}).sku
    //let sku2=attr[0].find({value:attrValue}).sku
    //attrValue?setSelectedSku(stegaClean(sku)):null

    //attrValue?setSelectedColor(stegaClean(attrValue)):null
    attrValue

}*/

export default function VariantAttributes({product}: { attribute: SanityDocument }) {

    const {t} = useTranslation('')
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSku, setSelectedSku] = useState("")
    const [emblaImage, setEmblaImage] = useState()

    const OPTIONS: EmblaOptionsType = {}
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    let groupedVariantsAttrs

    let variantsAttrs: any[] = []
    product.variants?.map((variant) => {
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
        if (!current[stegaClean(item.name.trim().toUpperCase())] ) {
            current[stegaClean(item.name.trim().toUpperCase())] = [];
        }
        current[stegaClean(item.name.trim().toUpperCase())].push(item);
        return current;
    }, {});


    return (<main className="">
        {product.variantsImages.length > 1 ?
        <EmblaCarousel slides={product.variantsImages}
                                  setSelectedSku={setSelectedSku}
                                  setSelectedSize={setSelectedSize}
                                  selectedSku={selectedSku}
                                  selectedSize={selectedSize}
                                  setSelectedColor={setSelectedColor}
                                  selectedColor={selectedColor}
                                  setEmblaImage={setEmblaImage}
                                  emblaImage={emblaImage}
                                  options={OPTIONS}/>

            : <img src={product.imageUrl} />}
        <div className="grid">
            <div>
                <div>
                    <ProductAttributes product={product}></ProductAttributes>
                </div>
                {Object.entries(groupedVariantsAttrs)?.map((attribute) => {
                    //atribute[0] is name and attribute[1] is array of value/s
                    return (
                        <>
                            <hr className="m-2"/>
                            <Label htmlFor="color" className="text-xs">
                                {attribute[0]}
                            </Label>
                            {attribute[1].length > 0 ?

                                <div className="flex flex-wrap gap-1 m-2">
                                    {Reg_Exp.test(stegaClean(attribute[1][0].value)) ?
                                        <>
                                            <RadioGroup
                                                value={selectedColor}
                                                onValueChange={setSelectedColor}
                                                className="flex flex-wrap gap-8 m-2"
                                            >
                                                {attribute[1].map((attr) => {
                                                    return (

                                                        <ProductAttr setSelectedSku={setSelectedSku}
                                                                     setSelectedSize={setSelectedSize}
                                                                     selectedSku={selectedSku}
                                                                     selectedSize={selectedSize}
                                                                     setSelectedColor={setSelectedColor}
                                                                     selectedColor={selectedColor}
                                                                     setEmblaImage={setEmblaImage}
                                                                     emblaImage={emblaImage}
                                                                     emblaOptions={OPTIONS}
                                                                     attr={attr}

                                                        ></ProductAttr>

                                                    )

                                                })}
                                            </RadioGroup>
                                            {/*<div className="mt-6 text-center">
                                                    <span
                                                        className="text-sm text-muted-foreground">Selected color: </span>
                                                    <span className="font-semibold"
                                                          style={{color: stegaClean(selectedColor)}}>
                                                        {selectedColor}


                                                     </span>
                                                    <span className="text-xs font-semibold">{selectedSku}</span>
                                                    <span
                                                        className="text-sm text-muted-foreground">Selected size: </span>
                                                    <span
                                                        className="text-lg font-semibold text-primary">{selectedSize}</span>
                                                </div>*/}
                                        </>
                                        :

                                        attribute[1].map((attr) => {
                                            return (

                                                <ProductAttr setSelectedSku={setSelectedSku}
                                                             setSelectedSize={setSelectedSize}
                                                             selectedSku={selectedSku}
                                                             selectedSize={selectedSize}
                                                             setSelectedColor={setSelectedColor}
                                                             selectedColor={selectedColor}
                                                             setEmblaImage={setEmblaImage}
                                                             emblaImage={emblaImage}
                                                             emblaOptions={OPTIONS}
                                                             attr={attr}

                                                ></ProductAttr>

                                            )

                                        })
                                    }
                                </div> : null}

                        </>
                    )
                })}

                <ToBuyVariant selectedSku={selectedSku}></ToBuyVariant>
            </div>
        </div>

    </main>)

}



