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
                        <CardTitle className="text-2xl font-bold">Cozy Autumn Sweater</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Soft and warm knit sweater for the fall season.
                        </CardDescription>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="color" className="text-base font-medium">
                                Color
                            </Label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className={`h-8 w-8 rounded-full border-2 border-muted ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        selectedColor === "#333" ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{backgroundColor: "#333"}}
                                    onClick={() => setSelectedColor("#333")}
                                />
                                <button
                                    type="button"
                                    className={`h-8 w-8 rounded-full border-2 border-muted ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        selectedColor === "#f44336" ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{backgroundColor: "#f44336"}}
                                    onClick={() => setSelectedColor("#f44336")}
                                />
                                <button
                                    type="button"
                                    className={`h-8 w-8 rounded-full border-2 border-muted ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        selectedColor === "#4caf50" ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{backgroundColor: "#4caf50"}}
                                    onClick={() => setSelectedColor("#4caf50")}
                                />
                                <button
                                    type="button"
                                    className={`h-8 w-8 rounded-full border-2 border-muted ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        selectedColor === "#2196f3" ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{backgroundColor: "#2196f3"}}
                                    onClick={() => setSelectedColor("#2196f3")}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="size" className="text-base font-medium">
                                Size
                            </Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={selectedSize === "S" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => setSelectedSize("S")}
                                >
                                    S
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={selectedSize === "M" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => setSelectedSize("M")}
                                >
                                    M
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={selectedSize === "L" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => setSelectedSize("L")}
                                >
                                    L
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={selectedSize === "XL" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => setSelectedSize("XL")}
                                >
                                    XL
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