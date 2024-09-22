import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {Label} from "@/components/ui/label";

import ProductAttr from "~/components/productAttr";
import {RadioGroup} from "@/components/ui/radio-group";
import ToBuyVariant from "~/components/toBuyVariant";
import {useState} from "react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel'

import ProductAttributes from "~/components/productAttributes";


export default function VariantAttributes({product}: { attribute: SanityDocument }) {

    const {t} = useTranslation('')

    const [selectedSku, setSelectedSku] = useState("")
    const [emblaImage, setEmblaImage] = useState("")

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
        if (!current[stegaClean(item.name.trim().toUpperCase())]) {
            current[stegaClean(item.name.trim().toUpperCase())] = [];
        }
        current[stegaClean(item.name.trim().toUpperCase())].push(item);
        return current;
    }, {});


    const [dynamicAttributes, setDynamicAttributes] = useState({});

    const handleAttributeChange = (attributeName, attributeValue) => {

        setDynamicAttributes((prevState) => ({
            ...prevState,
            [attributeName.toUpperCase()]: attributeValue,
        }));
    };


    return (<main className="">
        {product.variantsImages.length > 1 ?
            <EmblaCarousel slides={product.variantsImages}
                           setSelectedSku={setSelectedSku}
                           selectedSku={selectedSku}
                           setEmblaImage={setEmblaImage}
                           emblaImage={emblaImage}
                           options={OPTIONS}
                           groupedVariantsAttrs={groupedVariantsAttrs}
                           variantsAttrs={variantsAttrs}
                           handleAttributeChange={handleAttributeChange}
                           dynamicAttributes={dynamicAttributes}
                           setDynamicAttributes={setDynamicAttributes}

            />

            : <img src={product.imageUrl}/>}
        <div className="grid">
            <div>
                <div>
                    <ProductAttributes product={product}></ProductAttributes>
                </div>
                {Object.entries(groupedVariantsAttrs)?.map((attribute, i, groupedVariantsAttrs) => {
                    //atribute[0] is name and attribute[1] is array of value/s
                    Object.keys(attribute[1]).forEach(k => attribute[1][k].value = typeof attribute[1][k].value == 'string' ? attribute[1][k].value.trim().toUpperCase() : attribute[1][k].value)

                    attribute[1].sort((a, b) => a.value.localeCompare(b.name))


                    return (
                        <>
                            <hr className="m-2"/>
                            <Label htmlFor="color" className="text-xs">
                                {attribute[0]}
                            </Label>
                            {
                                attribute[1].length > 0 ?

                                    <div className="flex flex-wrap gap-1 m-2">
                                        {Reg_Exp.test(stegaClean(attribute[1][0].value)) ?
                                            <>
                                                <RadioGroup
                                                    value={dynamicAttributes[attribute[0]]}
                                                    //onValueChange={handleAttributeChange(stegaClean(attribute[0]),stegaClean(attribute[1][0].value))}
                                                    className="flex flex-wrap gap-8 m-2"
                                                >
                                                    {attribute[1].map((attr, i) => {
                                                        if (stegaClean(attribute[1][i + 1]?.value.toUpperCase()) == stegaClean(attribute[1][i].value.toUpperCase())) {
                                                            null
                                                        } else {
                                                            return (
                                                                <ProductAttr setSelectedSku={setSelectedSku}
                                                                             selectedSku={selectedSku}
                                                                             setEmblaImage={setEmblaImage}
                                                                             emblaImage={emblaImage}
                                                                             emblaOptions={OPTIONS}
                                                                             groupedVariantsAttrs={groupedVariantsAttrs}
                                                                             attr={attr}
                                                                             variantsAttrs={variantsAttrs}
                                                                             handleAttributeChange={handleAttributeChange}
                                                                             dynamicAttributes={dynamicAttributes}
                                                                             setDynamicAttributes={setDynamicAttributes}
                                                                             variantsImages={product.variantsImages}
                                                                ></ProductAttr>
                                                            )
                                                        }

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

                                            attribute[1].map((attr, i) => {

                                                if (stegaClean(attribute[1][i + 1]?.value.toUpperCase()) == stegaClean(attribute[1][i].value.toUpperCase())) {
                                                    null
                                                } else {
                                                    return (
                                                        <ProductAttr setSelectedSku={setSelectedSku}
                                                                     selectedSku={selectedSku}
                                                                     setEmblaImage={setEmblaImage}
                                                                     emblaImage={emblaImage}
                                                                     emblaOptions={OPTIONS}
                                                                     attr={attr}
                                                                     groupedVariantsAttrs={groupedVariantsAttrs}
                                                                     variantsAttrs={variantsAttrs}
                                                                     handleAttributeChange={handleAttributeChange}
                                                                     dynamicAttributes={dynamicAttributes}
                                                                     setDynamicAttributes={setDynamicAttributes}
                                                                     variantsImages={product.variantsImages}
                                                        ></ProductAttr>
                                                    )
                                                }

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



