import type {SanityDocument} from '@sanity/client'
import {useTranslation} from 'react-i18next'
import Tooltip from "~/components/attrTooltip";

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
    if (Array.isArray(product.attributes)) {
        let prodAttrs = product.attributes.filter(attr => attr._type === 'attribute')
        if (Array.isArray(prodAttrs) && prodAttrs.length > 0) {

            return (
                <main className="">
                    {prodAttrs.map((attribute) => {
                        return (
                            <>
                                <div key={attribute._key} className="*:text-gray-600 *:uppercase">
                                    <span className="text-xs font-bold text-primary">{attribute.name}</span> :
                                    {attribute.description ?
                                        <Tooltip content={attribute.description} position="right">
                                            <div className="relative inline-block">

                                                <span className="text-xs">{attribute.value}</span>
                                                <div
                                                    className="absolute top-1 -right-2 rounded-full bg-blue-400">
                                                    <div
                                                        className="top-1 -right-2 text-xs font-bold h-1.5 w-1.5 text-blue">

                                                    </div>
                                                </div>
                                            </div>
                                        </Tooltip> : <span className="text-xs">{attribute.value}</span>
                                    }

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



