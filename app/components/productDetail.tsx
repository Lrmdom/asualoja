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

export default function Component(props) {
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
const product = props.product[0]
    return (
        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
                <div>

                    {props.product?.map((prod) => {
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
                                <div className="container mx-auto prose prose-lg border rounded">
                                    <ProductImagescarousel images={prod.variantsImages}/>


                                </div>
                            </>
                        )
                    })}
                </div>

                <div className="grid gap-6">
                    <div>
                        <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {product.description}
                        </CardDescription>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="color" className="text-base font-medium">
                                Color
                            </Label>
                            <div className="flex items-center gap-2">
                                {/*TODO if is valid color */}
                                <button
                                    type="button"
                                    className={`h-8 w-8 rounded-full border-2 border-muted ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        selectedColor === "#333" ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{backgroundColor: "#333"}}
                                    onClick={() => setSelectedColor("#333")}
                                />

                            </div>
                        </div>
                        <div>
                            <Label htmlFor="size" className="text-base font-medium">
                                Size
                            </Label>
                            <div className="flex items-center gap-2">
                                {/*TODO if is valid color*/}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={selectedSize === "S" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => setSelectedSize("S")}
                                >
                                    S
                                </Button>


                            </div>
                        </div>
                    </div>
                    <div>
                        <Button size="lg" className="w-full">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}