import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {useTranslation} from 'react-i18next'
export default function ProductAttributes({product}: { attribute: SanityDocument }) {
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
        if (Array.isArray(prodAttrs) && prodAttrs.length > 0) {

            return (
                <main className="">
                    {prodAttrs.map((attribute) => {
                        return (
                            <>
                                <div key={attribute._key} className="*:text-gray-600 *:uppercase">
                                    <span className="text-xs font-bold text-primary">{attribute.name}</span> : <span className="text-xs">{attribute.value}</span>

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



