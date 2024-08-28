import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
import {ClientOnly} from "remix-utils/client-only"
import {Avatar, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'


export default function AttributeVisualization({attribute}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')

    return (
        <input type="color" id="head" name="head" value={stegaClean(attribute.value)}
               disabled/>

    )

}
