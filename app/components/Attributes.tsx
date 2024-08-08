import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
export default function Attributes({product}: { attribute: SanityDocument }) {
    const {t} = useTranslation('')

    /*const {
        attributes,
    } = product*/
    /*const {
        title,
        value,
    } = attributes

    let displayAttrs
    if (attributes) {

        displayAttrs = <Attributes product={product}></Attributes>
    } else {

    }*/
    if(Array.isArray(product.attributes)) {
        let prodAttrs = product.attributes.filter(attr => attr._type === 'attribute')


        if (Array.isArray(prodAttrs)) {
            return (
                <main className="">
                    {prodAttrs.map((attribute) => {
                        return (
                            <>
                                <div key={attribute._key} className="">
                                    <b className="text-primary text-lg">{attribute.name}</b> :
                                    {attribute.value}
                                </div>
                            </>
                        )
                    })}

                </main>
            )
        } else {
            return null
        }

    }
}



