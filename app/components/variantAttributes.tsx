import {Label} from "@/components/ui/label";
import {stegaClean} from "@sanity/client/stega";
import {RadioGroup} from "@/components/ui/radio-group";
import VariantAttr from "~/components/variantAttr";

export default function VariantsAttributes(props) {

    //todo show only if it exists in stock


    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    const {
        product,
        variantsAttrs,
        groupedVariantsAttrs,
        dynamicAttributes,
        setDynamicAttributes,
        handleAttributeChange,
        selectedSku,
        setSelectedSku,
        emblaImage,
        setEmblaImage,
        emblaImageDetail,
        setEmblaImageDetail,
        OPTIONS
    } = {...props.props}
    //setVariantDetailLink(linkVariantDetail)
    return (

        <main className="">


            {Object.entries(groupedVariantsAttrs)?.map((attribute, i, groupedVariantsAttrs) => {
                //atribute[0] is name and attribute[1] is array of value/s
                Object.keys(attribute[1]).forEach(k => attribute[1][k].value = typeof attribute[1][k].value == 'string' ? attribute[1][k].value.trim().toUpperCase() : attribute[1][k].value)

                attribute[1].sort((a, b) => a.value.localeCompare(b.value))

                return (
                    <>
                        <hr className="m-2"/>
                        <Label htmlFor="color" className="text-xs">
                            {attribute[0]}
                        </Label>
                        {attribute[1].length > 0 ?

                            <div className="m-2 flex flex-wrap gap-1">
                                {Reg_Exp.test(stegaClean(attribute[1][0].value)) ?
                                    <>
                                        <RadioGroup
                                            value={dynamicAttributes[attribute[0]]}
                                            //onValueChange={handleAttributeChange(stegaClean(attribute[0]),stegaClean(attribute[1][0].value))}
                                            className="m-2 flex flex-wrap gap-8"
                                        >
                                            {attribute[1].map((attr, index) => {
                                                let nIndex = index + 1
                                                let cIndex = index
                                                if (stegaClean(attribute[1][nIndex]?.value.toUpperCase()) == stegaClean(attribute[1][cIndex].value.toUpperCase())) {
                                                    null
                                                } else {
                                                    return (
                                                        <VariantAttr setSelectedSku={setSelectedSku}
                                                                     selectedSku={selectedSku}
                                                                     setEmblaImage={setEmblaImage || setEmblaImageDetail}
                                                                     emblaImage={emblaImage || emblaImageDetail}
                                                                     emblaOptions={OPTIONS}
                                                                     attr={attr}
                                                                     groupedVariantsAttrs={groupedVariantsAttrs}
                                                                     variantsAttrs={variantsAttrs}
                                                                     handleAttributeChange={handleAttributeChange}
                                                                     dynamicAttributes={dynamicAttributes}
                                                                     setDynamicAttributes={setDynamicAttributes}
                                                                     variantsImages={product.variantsImages}
                                                        />
                                                    )

                                                }

                                            })}
                                        </RadioGroup>
                                    </>
                                    :
                                    attribute[1].map((attr, i) => {
                                        //to check if allready listed or repeated value ...
                                        if (stegaClean(attribute[1][i + 1]?.value.toUpperCase()) == stegaClean(attribute[1][i].value.toUpperCase())) {
                                            null
                                        } else {
                                            return (
                                                <VariantAttr setSelectedSku={setSelectedSku}
                                                             selectedSku={selectedSku}
                                                             setEmblaImage={setEmblaImage || setEmblaImageDetail}
                                                             emblaImage={emblaImage || emblaImageDetail}
                                                             emblaOptions={OPTIONS}
                                                             attr={attr}
                                                             groupedVariantsAttrs={groupedVariantsAttrs}
                                                             variantsAttrs={variantsAttrs}
                                                             handleAttributeChange={handleAttributeChange}
                                                             dynamicAttributes={dynamicAttributes}
                                                             setDynamicAttributes={setDynamicAttributes}
                                                             variantsImages={product.variantsImages}
                                                />
                                            )

                                        }

                                    })
                                }
                            </div> : null}
                    </>
                )
            })
            }
        </main>
    )
}


