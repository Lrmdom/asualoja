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

export default function ProductAttr({attr}: { attribute: SanityDocument }) {
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    return (
// TODO replace button for Radio and radiogroup

        Reg_Exp.test(stegaClean(attr.value)) ?
            <>
            <button
                type="button"
                className={` h-8 w-8 rounded-full border-2 border-muted ring-offset-background 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedColor === getTheColorCode(attr) ? "ring-2 ring-primary" : ""
                }`}
                style={{backgroundColor: getTheColorCode(attr)}}
                onClick={() => setSelectedColor(getTheColorCode(attr))}
            >


            </button>
            <div className="text-xs">{attr.description ? attr.description : null}</div>
            </>
:
            <>
                <Button
                    variant="outline"
                    size="sm"
                    className={selectedSize === "S" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setSelectedSize("S")}
                >
                    {attr.value.toUpperCase()}

                </Button>
                <div className="text-xs">{attr.description ? attr.description : null}</div>

            </>
    )


}



