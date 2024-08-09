import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'


export default function AttributeVisualization({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')
    //console.log(attribute)
    let visualization
    debugger;
    if (attribute.visualPresentation === "InputToggleColor") {
        visualization =
            <>
        <span>
          <input type="color" id="head" name="head" value="#e66465" disabled/>
        </span>

                <span>
          <input type="color" id="body" name="body" value="#f6b73c" disabled/>
        </span>
            </>

    }
    if (attribute.visualPresentation === "InputToggleButton") {
        visualization =
            <ClientOnly fallback={null}>
                {() => <InputToggleButton
                    label={attribute[0].name}
                    mode="single"
                    onChange={function zs() {
                    }}
                    options={attribute}
                />}
            </ClientOnly>

    }

    return (
        <main className="">

            {visualization}


        </main>
    )

}








