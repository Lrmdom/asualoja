import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {Label} from "../../@/components/ui/label";
import {Button} from "../../@/components/ui/button"
import {Suspense, useState} from "react";
import {InputRadioGroup} from "@commercelayer/app-elements";
import {RadioGroupItem} from "../../@/components/ui/radio-group";

function getTheColorCode(attribute) {
    return stegaClean(attribute.value.toString())
}

export default function ProductAttr({setSelectedSku,setSelectedSize, selectedSku,selectedSize,attr}: { attribute: SanityDocument }) {
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    function setSkuButton( sku,size){
        console.log("leonl" +sku)
        setSelectedSku(sku)
        setSelectedSize(size)
        console.log(selectedSku)
    }

    return (
// TODO replace button for Radio and radiogroup

        Reg_Exp.test(stegaClean(attr.value)) ?
            <>
                <div key={attr.value} className="flex items-center">
                    <RadioGroupItem
                        value={attr.value}
                        id={attr.value}
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor={attr.value}
                        className="w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex items-center justify-center"
                        style={{backgroundColor: getTheColorCode(attr)}}
                        onClick={() =>setSelectedSku(stegaClean(attr.sku))}
                    >
                        <span className="sr-only">{attr.value}</span>
                        <div
                            className="w-11 h-11 rounded-full border-2 border-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100"></div>
                    </Label>
                </div>
                <div className="text-xs">{attr.description ? attr.description : null}</div>
            </>
            :
            <>
                <Button
                    variant="outline"
                    size={stegaClean(attr.value)}
                    className={selectedSize === stegaClean(attr.value) ? "bg-primary text-primary-foreground" : ""}
                    /*onClick={() =>setSkuButton(stegaClean(attr.sku),stegaClean(attr.value))}*/
                    onClick={() =>setSelectedSku(stegaClean(attr.sku))}
                >
                    {attr.value.toUpperCase()}
                    {attr.description && attr.description }
                </Button>
                <span>{selectedSize}</span>

            </>
    )


}



