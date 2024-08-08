import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import {ClientOnly} from "remix-utils/client-only"
import {useTranslation} from 'react-i18next'

//import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";
import VariantAttributes from "~/components/variantAttributes";

/*const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})*/


export default function Variants({product}: { variants: SanityDocument }) {
    const {t} = useTranslation('')

    if (Array.isArray(product.variants)) {

        let variantsAttrs: any[] = []
        product.variants.map((variant) => {
            let vAttrs = variant.attributes.filter(attr => attr._type === 'attribute')
            vAttrs.forEach(function (element) {
                element.sku = stegaClean(variant.sku)
                element.images = variant.images
            });
            variantsAttrs = variantsAttrs.concat(vAttrs)
            variantsAttrs = variantsAttrs.sort((a, b) => a.name.localeCompare(b.name))
        })

        let groupedVariantsAttrs = variantsAttrs.reduce((current, item) => {
            if (!current[stegaClean(item.name.trim())]) {
                current[stegaClean(item.name.trim())] = [];
            }
            current[stegaClean(item.name.trim())].push(item);

            return current;
        }, {});

        return (
            <>
                <div className="flex container p-2 grid grid-cols-2">
                    <div className="">
                        {/*<img src={variant.images ? variant.images[0].url : null} width={75}
                                         alt={variant.title}/>
                                    <span>{variant.title}</span>*/}

                        <span><VariantAttributes attributes={groupedVariantsAttrs}></VariantAttributes></span>

                    </div>

                </div>
            </>
        )
    } else {
        return null
    }


}



