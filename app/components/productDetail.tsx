import {Card, CardDescription, CardTitle} from "@/components/ui/card"

import ProductImagescarousel from "~/components/productImagescarousel";
import {stegaClean} from "@sanity/client/stega";

import Variants from "~/components/variants"
import {useState} from "react";

export default function Component(props) {

    const [emblaImage, setEmblaImage] = useState("")

    const product = props.product[0]
    let myProduct
    props.product?.map((prod) => {

        //console.log(prod)
        if (Array.isArray(prod.variants)) {
            prod.variantsImages = []

            prod.variantsImages.push({"url": prod.imageUrl, "alt": stegaClean(prod.title)})

            prod.variants.map((vrnt) => {
                vrnt.images?.map((image) => {
                    image.alt ? image.alt : image.alt = stegaClean(vrnt.title)
                    image.sku ? image.sku : image.sku = stegaClean(vrnt.sku)
                    image.attributes ? image.attributes : image.attributes = stegaClean(vrnt.attributes)
                    prod.variantsImages.push(image)
                })
            })
        } else {
            prod.variantsImages = [{"url": prod.imageUrl, "alt": stegaClean(prod.title)}]
        }
        myProduct=prod
    })

    return (

        <Card className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-2">
                        <ProductImagescarousel images={myProduct.variantsImages} emblaImage={emblaImage}  setEmblaImage= {setEmblaImage}/>
                <div className="grid gap-6">
                    <div>
                        <CardTitle className="text-xl font-semibold first-line:uppercase">{product.title}</CardTitle>
                        <CardDescription className="p-5 px-8 text-muted-foreground">
                            {product.description}
                        </CardDescription>
                    </div>

                    {Array.isArray(product.variants) && product.variants.length > 0 ?
                        <Variants product={product} emblaImageDetail={emblaImage} setEmblaImageDetail={setEmblaImage}></Variants> : null}
                </div>
            </div>
        </Card>
    )
}