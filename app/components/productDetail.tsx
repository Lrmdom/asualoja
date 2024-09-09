
import {Card, CardTitle, CardDescription} from "@/components/ui/card"

import ProductImagescarousel from "~/components/productImagescarousel";
import {stegaClean} from "@sanity/client/stega";

import ProductAttributes from "~/components/variantAttributes"

export default function Component(props) {

    const product = props.product[0]



    return (

        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
                <div>

                    {props.product?.map((prod) => {

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
                        return (
                            <>
                                    <ProductImagescarousel images={prod.variantsImages}/>


                            </>
                        )
                    })

                    }
                </div>

                <div className="grid gap-6">
                    <div >
                        <CardTitle className="text-xl font-semibold first-line:uppercase " >{product.title}</CardTitle>
                        <CardDescription className="text-muted-foreground px-8 p-5">
                            {product.description}
                        </CardDescription>
                    </div>

                    {Array.isArray(product.variants)? <ProductAttributes product={product}></ProductAttributes>:null}


                </div>
            </div>
        </Card>
    )
}