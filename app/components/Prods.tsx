import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";

export default function Prods({products}: { product: SanityDocument }) {

    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
                <div
                    className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products?.map((prod) => {
                        return (
                            <>
                                <div className="group relative">
                                    <div
                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">

                                        <img src={prod.imageUrl} width={75} alt={prod.title}
                                             className="h-full w-full object-contain object-center lg:h-full lg:w-full"/>
                                    </div>
                                    <div className="">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link
                                                    to={stegaClean(`/${language}/${prod.taxonomy}/${prod.taxons}/${prod.title}`)}> {stegaClean(prod.title)} </Link>

                                            </h3>
                                            <Attributes product={prod}></Attributes>
                                        </div>
                                        <Variants product={prod}></Variants>
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
