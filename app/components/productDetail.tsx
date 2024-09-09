import {Suspense, useState} from "react"
import {Card, CardTitle, CardDescription} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import ProductImagescarousel from "~/components/productImagescarousel";
import type {SanityDocument} from "@sanity/client";
import {stegaClean} from "@sanity/client/stega";
import {Link} from "@remix-run/react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";
import Attributes from "~/components/Attributes";
import Variants from "~/components/Variants";
import {ClientOnly} from "remix-utils/client-only"
import ProductAttributes from "~/components/productAttributes"

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
                                    prod.variantsImages.push(image)
                                })
                            })
                        } else {
                            prod.variantsImages = [{"url": prod.imageUrl, "alt": stegaClean(prod.title)}]
                        }
                        return (
                            <>
                                <div className="container mx-auto prose prose-lg ">
                                    <ProductImagescarousel images={prod.variantsImages}/>


                                </div>
                            </>
                        )
                    })

                    }
                </div>

                <div className="grid gap-6">
                    <div >
                        <CardTitle className="text-2xl font-bold first-line:uppercase" >{product.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {product.description}
                        </CardDescription>
                    </div>

                    {Array.isArray(product.variants)? <ProductAttributes product={product}></ProductAttributes>:null}


                </div>
            </div>
        </Card>
    )
}