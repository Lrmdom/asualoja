import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"

import {RadioGroupItem} from "@/components/ui/radio-group";
import Tooltip from "~/components/attrTooltip"

function getTheColorCode(attribute) {
    return stegaClean(attribute.value.toString())
}


export default function VariantAttr({
                                        setSelectedSku,
                                        selectedSku,
                                        setEmblaImage,
                                        emblaImage,
                                        emblaOptions,
                                        attr,
                                        groupedVariantsAttrs,
                                        variantsAttrs,
                                        handleAttributeChange,
                                        dynamicAttributes,
                                        setDynamicAttributes,
                                        variantsImages
                                    }: { attribute: SanityDocument }) {


    function enabledAttrs(attr, variantsAttrs) {

        const skusUnicos = new Set(
            variantsAttrs
                .filter(e => stegaClean(e.value) === stegaClean(attr.value))
                .map(obj => obj.sku)
        );

        const finalAttrs = variantsAttrs
            .filter(obj => skusUnicos.has(obj.sku))
            .sort((a, b) => a.sku.localeCompare(b.sku));
        handleAttributeChange("FINALATTRS", {finalAttrs})
    }


    function setSkuImage(attr, variantsImages) {

        let index = variantsImages.findIndex(x => x.sku === attr.sku)
        setEmblaImage(index)
    }



    function setSkuButton(attr, stateSet, setSkuImage) {
        setSelectedSku(stegaClean(attr.sku))

    }

    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    const attrExists = dynamicAttributes?.FINALATTRS?.finalAttrs.includes(attr)

    return (
        <>
            {Reg_Exp.test(stegaClean(attr.value)) ?

                attr.description ?
                    <div key={attr.value} className="flex">

                        <Tooltip content={attr.description} position="right">

                            <div className="relative inline-block">
                                <RadioGroupItem
                                    value={stegaClean(attr.value)}
                                    id={stegaClean(attr.value)}
                                    className="sr-only peer"


                                />
                                <Label
                                    htmlFor={stegaClean(attr.value)}
                                    className={dynamicAttributes[stegaClean(attr.name.toUpperCase())] === stegaClean(attr.value) ? "drop-shadow-md w-7 h-7 rounded-full ring-4 ring-black cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex " : attrExists === false ? "opacity-30 line-through drop-shadow-2xl w-7 h-7 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex" : "drop-shadow-2xl w-7 h-7 rounded-full ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex "}
                                    style={{backgroundColor: getTheColorCode(attr)}}
                                    onClick={() => setSkuButton(stegaClean(attr.sku), handleAttributeChange(stegaClean(attr.name), stegaClean(attr.value)), setSkuImage(attr, variantsImages), enabledAttrs(attr, variantsAttrs, dynamicAttributes))}
                                >
                                    <div
                                        className="h-11 w-11 rounded-full border-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                                </Label>
                                <div
                                    className={"absolute rounded-full bg-blue-400 -top-1.5 -right-1.5"}>
                                    <div className="-top-2 -right-2 text-xs font-bold h-1.5 w-1.5 text-blue">

                                    </div>
                                </div>
                            </div>

                        </Tooltip>

                    </div>

                    :
                    <div key={attr.value} className="flex">
                        <RadioGroupItem
                            value={stegaClean(attr.value)}
                            id={stegaClean(attr.value)}
                            className="sr-only peer"
                        />
                        <Label
                            htmlFor={stegaClean(attr.value)}

                            className={dynamicAttributes[stegaClean(attr.name.toUpperCase())] === stegaClean(attr.value) ? "drop-shadow-md w-7 h-7 rounded-full ring-4 ring-black cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex" : attrExists === false ? "opacity-30 line-through drop-shadow-2xl w-7 h-7 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex" : " drop-shadow-2xl w-7 h-7 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex"}

                            style={{backgroundColor: getTheColorCode(attr)}}

                            onClick={() => setSkuButton(stegaClean(attr.sku), handleAttributeChange(stegaClean(attr.name.toUpperCase()), stegaClean(attr.value)), setSkuImage(attr, variantsImages), enabledAttrs(attr, variantsAttrs, dynamicAttributes))}
                        >
                            <div
                                className="h-11 w-11 rounded-full border-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                        </Label>

                    </div>


            :

            <span className="mx-1 rounded p-2 border-1 border-primary-light px-1.5">

                {attr.description ?
                    <Tooltip content={attr.description} position="right">

                        <div className="relative inline-block">
                            <Button
                                value={stegaClean(attr.value)}
                                variant="outline"
                                size={stegaClean(attr.value)}
                                className={dynamicAttributes[stegaClean(attr.name.toUpperCase())] === stegaClean(attr.value) ? "drop-shadow-md bg-primary text-white px-2 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 " : attrExists == false ? "opacity-70 line-through font-bold drop-shadow-2xl px-1 py-1 text-xs text-muted-foreground rounded border  hover:text-white hover:bg-purple-300 focus:outline-none " : " drop-shadow-2xl px-2 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-300 focus:outline-none "}
                                /* onClick={() => setSkuButton(stegaClean(attr.sku), stegaClean(attr.value), emblaOptions)}*/
                                onClick={() => setSkuButton(stegaClean(attr.sku), handleAttributeChange(stegaClean(attr.name.toUpperCase()), stegaClean(attr.value)), setSkuImage(attr, variantsImages), enabledAttrs(attr, variantsAttrs, dynamicAttributes))}
                            >
                                {attr.value.toUpperCase()}
                            </Button>
                            <div
                                className="absolute rounded-full bg-blue-400 -top-1.5 -right-1.5">
                                <div className="-top-2 -right-2 text-xs font-bold h-1.5 w-1.5 text-blue">

                                </div>
                            </div>
                        </div>
                    </Tooltip>

                    : <Button
                        value={stegaClean(attr.value)}
                        variant="outline"
                        size={stegaClean(attr.value)}
                        className={dynamicAttributes[stegaClean(attr.name.toUpperCase())] === stegaClean(attr.value) ? "drop-shadow-md bg-primary text-white px-2 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 " : attrExists === false ? "opacity-70 line-through font-bold drop-shadow-2xl px-1 py-1 text-xs text-muted-foreground rounded border  hover:text-white hover:bg-purple-300 focus:outline-none " : " drop-shadow-2xl px-2 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-300 focus:outline-none "}
                        /*onClick={() => setSkuButton(stegaClean(attr.sku), stegaClean(attr.value),emblaOptions)}*/
                        onClick={() => setSkuButton(stegaClean(attr.sku), handleAttributeChange(stegaClean(attr.name.toUpperCase()), stegaClean(attr.value)), setSkuImage(attr, variantsImages), enabledAttrs(attr, variantsAttrs, dynamicAttributes))}
                    >
                        {attr.value.toUpperCase()}
                    </Button>}

            </span>
            }
        </>

    )


}


