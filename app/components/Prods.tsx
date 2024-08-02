import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";
import client from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {Link} from "@remix-run/react";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

function urlFor(source) {
    return builder.image(source)
}

export default function Prods({products}: { product: SanityDocument }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">


                <div
                    className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {products?.map((prod) => {
                        return (
                            <>
                                <div  className="group relative">
                                    <div  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">

                                        <img src={prod.imageUrl} width={75} alt={prod.title}
                                             className="h-full w-full object-contain object-center lg:h-full lg:w-full"/>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                            {/*    todo if taxon array use prod.taxons[0]*/}
                                                <Link to={stegaClean(`/${prod.taxonomy}/${prod.taxons}/${prod.title}`)}> {stegaClean(prod.title)} </Link>

                                            </h3>

                                            {/*
                                                    <p className="mt-1 text-sm text-gray-500">{prod.color}</p>
*/}
                                            <Attributes product={prod}></Attributes>
                                        </div>
                                        {/*
                                                <p className="text-sm font-medium text-gray-900">{prod.price}</p>
*/}
                                        {/*<Variants product={prod}></Variants>*/}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
