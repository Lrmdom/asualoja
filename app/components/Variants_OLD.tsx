import {stegaClean} from "@sanity/client/stega"

import {useTranslation} from 'react-i18next'

//import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";
import VariantAttributes_OLD from "~/components/variantAttributes_OLD";
import {InputRadioGroup} from "@commercelayer/app-elements";
import {Suspense} from "react";


/*const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})*/

export default function Variants_OLD({product}: { variants: SanityDocument }) {
    const {t} = useTranslation('')


    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if (Array.isArray(product.variants)) {


        let variantsAttrs: any[] = []
        product.variants.map((variant) => {
            if (Array.isArray(variant.attributes)) {

                let vAttrs = variant.attributes.filter(attr => attr._type === 'attribute')
                vAttrs.forEach(function (element) {
                    element.sku = stegaClean(variant.sku)
                    element.images = variant.images
                    element.label = stegaClean(element.value.toUpperCase())
                    element.content = <div className="text-xs">{element.label}</div>
                    Reg_Exp.test(stegaClean(element.value)) ? element.className = `bg-[${stegaClean(element.value)}]` : null

                });

                variantsAttrs = variantsAttrs.concat(vAttrs)
                variantsAttrs = variantsAttrs.sort((a, b) => a.name.localeCompare(b.name))
            }
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
                <div className="">
                    {/*<img src={variant.images ? variant.images[0].url : null} width={75}
                                         alt={variant.title}/>
                                    <span>{variant.title}</span>*/}

                    {Object.entries(groupedVariantsAttrs).map((attribute) => {
                        //atribute[0] is name and attribute[1] is array of value/s

                        return (
                            <>
                                {attribute[1].length > 0 ?

                                    <div>


                                        <Suspense>
                                            <InputRadioGroup
                                                name={attribute[0] + attribute[1][0].sku}
                                                options={attribute[1]}
                                                title={attribute[0]}
                                                viewMode="grid"
                                            />

                                        </Suspense>

                                    </div>
                                    : null}


                            </>
                        )
                    })}


                    <VariantAttributes_OLD attributes={groupedVariantsAttrs}></VariantAttributes_OLD>


                </div>
            </>
        )
    } else {
        return null
    }


}



