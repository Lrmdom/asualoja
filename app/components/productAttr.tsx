import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button"

import {RadioGroupItem} from "@/components/ui/radio-group";

function getTheColorCode(attribute) {
    return stegaClean(attribute.value.toString())
}



export default function ProductAttr({setSelectedSku,setSelectedSize, selectedSku,selectedSize,setSelectedColor , selectedColor,attr}: { attribute: SanityDocument }) {
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    function setSkuButton( sku,size){
        setSelectedSku(stegaClean(sku))
        setSelectedSize(stegaClean(size))

    }

    return (
// TODO replace button for Radio and radiogroup

        Reg_Exp.test(stegaClean(attr.value)) ?
            <>
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
                        className={stegaClean(selectedColor) === stegaClean(attr.value) ? "w-10 h-10 rounded-full ring-4 ring-black    cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex " : "w-10 h-10 rounded-full  ring-4 ring-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex "}

                        style={{backgroundColor: getTheColorCode(attr)}}
                        onClick={() => setSelectedSku(stegaClean(attr.sku))}
                    >
                        <div
                            className="h-11 w-11 rounded-full border-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                    </Label>
                    {attr.description ?
                        <div className="rounded border p-2 text-xs border-primary"> {attr.description}</div> : null}
                </div>

            </>
            :

            <span className="rounded border-2 border-primary-light p-2 px-1.5 mx-1 max-w-24">
                <Button
                    variant="outline"
                    size={stegaClean(attr.value)}
                    className={selectedSize === stegaClean(attr.value) ? "bg-primary text-white px-4 py-1 text-sm  font-semibold rounded border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 hover:text-base" : "px-4 py-1 text-sm text-purple-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none hover:text-base"}
                    /*onClick={() =>setSkuButton(stegaClean(attr.sku),stegaClean(attr.value))}*/
                    onClick={() => setSkuButton(stegaClean(attr.sku), stegaClean(attr.value))}
                >
                    {attr.value.toUpperCase()}
                </Button>

                {attr.description ?<div className="text-xs"> {attr.description} </div>: null}

            </span>
    )


}



