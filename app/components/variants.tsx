import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'

import ToBuyVariant from "~/components/toBuyVariant";
import * as React from "react";
import {useState} from "react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel'

import ProductAttributes from "~/components/productAttributes";
import VariantsAttributes from "~/components/variantAttributes";


export default function Variants({product, emblaImageDetail, setEmblaImageDetail}: {
    variant: SanityDocument
}) {
    const {t} = useTranslation('')
    const [selectedSku, setSelectedSku] = useState(null)
    const [emblaImage, setEmblaImage] = useState(null)
    const OPTIONS: EmblaOptionsType = {}
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    let groupedVariantsAttrs
    let variantsAttrs: any[] = []
    product.variants?.map((variant) => {
        if (Array.isArray(variant.attributes)) {
            let vAttrs = variant.attributes.filter(attr => attr._type === 'attribute')
            vAttrs.forEach(function (element) {
                delete element["visualPresentation"]
                element.sku = stegaClean(variant.sku)
                element.value = stegaClean(element.value.toUpperCase())
                element.description = stegaClean(element.description)
                element.images = variant.images
                element.name = stegaClean(element.name.toUpperCase())
                element.label = stegaClean(element.name.toUpperCase())
                //element.content = <div className="text-xs">{element.label}</div>
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
            ...prevState, [attributeName.toUpperCase()]: attributeValue,
        }));
    };

    //const  lastElement= variantsPrices


    return (<main className="">

        {product.variantsImages.length > 1 ? <EmblaCarousel slides={product.variantsImages}
                                                            setSelectedSku={setSelectedSku}
                                                            selectedSku={selectedSku}
                                                            setEmblaImage={setEmblaImage || setEmblaImageDetail}
                                                            emblaImage={emblaImage || emblaImageDetail}
                                                            setEmblaImageDetail={setEmblaImageDetail}
                                                            emblaImageDetail={emblaImageDetail}
                                                            options={OPTIONS}
                                                            groupedVariantsAttrs={groupedVariantsAttrs}
                                                            variantsAttrs={variantsAttrs}
                                                            handleAttributeChange={handleAttributeChange}
                                                            dynamicAttributes={dynamicAttributes}
                                                            setDynamicAttributes={setDynamicAttributes}

            />


            : <img src={product.imageUrl}/>}

        <div>
            {

                product.variantsPrice?.length ?

                    <div className="font-semibold">
                        {product.variantsPrice[0][1]} --- {product.variantsPrice[product.variantsPrice.length - 1][1]}
                    </div>

                    : null}
            {product.stock_items?.length ? <div className="font-semibold">

                    {product.stock_items[0]?.quantity ? `Qt in stock:  ${product.stock_items[0].quantity}` : null}
                </div>

                : null}

        </div>

        <div>
            <ProductAttributes product={product}></ProductAttributes>
        </div>

        {/* {product.variantsPrice[0]?
                (
                <div>
                    {product.variantsPrice[0][0]}--{product.variantsPrice[product.variantsPrice.length - 1][1]}
                </div>
            ):null
            }*/}


        <VariantsAttributes props={{
            product,
            variantsAttrs,
            groupedVariantsAttrs,
            dynamicAttributes,
            setDynamicAttributes,
            handleAttributeChange,
            selectedSku,
            setSelectedSku,
            emblaImage,
            setEmblaImage,
            emblaImageDetail,
            setEmblaImageDetail,
            OPTIONS
        }}/>
        {/*  show cheapest and expensive variant price  */}

        {/*<div>{variantsPrices[0][0]} - {variantsPrices[lastElement][0]}</div>*/}
        <ToBuyVariant selectedSku={selectedSku} setSelectedSku={setSelectedSku}
                      handleAttributeChange={handleAttributeChange}
                      dynamicAttributes={dynamicAttributes}
                      setDynamicAttributes={setDynamicAttributes}></ToBuyVariant>

    </main>)

}



