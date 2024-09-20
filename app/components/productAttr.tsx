import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Label} from "@/components/ui/label"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button"

import {RadioGroupItem} from "@/components/ui/radio-group";
import Tooltip from "~/components/attrTooltip"
import {InfoIcon} from "lucide-react";

function getTheColorCode(attribute) {
    return stegaClean(attribute.value.toString())
}



export default function ProductAttr({setSelectedSku,setSelectedSize, selectedSku,selectedSize,setSelectedColor , selectedColor,setEmblaImage,emblaImage,emblaOptions,attr}: { attribute: SanityDocument }) {


    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;




    function setSkuButton( sku, size, emblaOptions){
        setSelectedSku(stegaClean(sku))
        setSelectedSize(stegaClean(size))
        setEmblaImage(3)

    }
    return (

        Reg_Exp.test(stegaClean(attr.value)) ?

            <>
                {attr.description ?
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
                                    /*
                                                            className={selectedColor === stegaClean(attr.value) ? "bg-primary text-white px-4 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 hover:text-base" : "px-4 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none hover:text-base"}
                                    */
                                    className={stegaClean(selectedColor) === stegaClean(attr.value) ? "w-7 h-7 rounded-full ring-4 ring-black    cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex " : "w-7 h-7 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex "}

                                    style={{backgroundColor: getTheColorCode(attr)}}
                                    onClick={() => setSelectedSku(stegaClean(attr.sku))}
                                >
                                    <div
                                        className="h-11 w-11 rounded-full border-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                                </Label>
                                <div
                                    className="absolute -top-1.5 -right-1.5 bg-blue-400 rounded-full ">
                                    <div className="h-1.5 w-1.5 -top-2 -right-2 text-blue text-xs font-bold">

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
                            /*
                                                    className={selectedColor === stegaClean(attr.value) ? "bg-primary text-white px-4 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 hover:text-base" : "px-4 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none hover:text-base"}
                            */
                            className={stegaClean(selectedColor) === stegaClean(attr.value) ? "w-7 h-7 rounded-full ring-4 ring-black    cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex " : "w-7 h-7 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex "}

                            style={{backgroundColor: getTheColorCode(attr)}}
                            onClick={() => setSelectedSku(stegaClean(attr.sku))}
                        >
                            <div
                                className="h-11 w-11 rounded-full border-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                        </Label>

                    </div>
                }
            </>
            :

            <span className="mx-1 rounded p-2 border-1 border-primary-light px-1.5">

                {attr.description ?
                    <Tooltip content={attr.description} position="right">

                        <div className="relative inline-block">
                            <Button
                                value={stegaClean(attr.value)}
                                variant="outline"
                                size={stegaClean(attr.value)}
                                className={selectedSize === stegaClean(attr.value) ? "bg-primary text-white px-1 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 " : "px-2 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-300 focus:outline-none "}
                                onClick={() => setSkuButton(stegaClean(attr.sku), stegaClean(attr.value), emblaOptions)}
                            >
                                {attr.value.toUpperCase()}
                            </Button>
                            <div
                                className="absolute -top-1.5 -right-1.5 bg-blue-400 rounded-full ">
                                <div className="h-1.5 w-1.5 -top-2 -right-2 text-blue text-xs font-bold">

                                </div>
                            </div>
                        </div>

                    </Tooltip>
                    : <Button
                        value={stegaClean(attr.value)}
                        variant="outline"
                        size={stegaClean(attr.value)}
                        className={selectedSize === stegaClean(attr.value) ? "bg-primary text-white px-1 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 " : "px-2 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-300 focus:outline-none "}
                        onClick={() => setSkuButton(stegaClean(attr.sku), stegaClean(attr.value),emblaOptions)}
                    >
                        {attr.value.toUpperCase()}
                    </Button>}

                {emblaImage}
            </span>
    )


}



