import type {SanityDocument} from '@sanity/client'
import Taxons from '~/components/Taxons'
import Prods from "~/components/Prods";
import {stegaClean} from "@sanity/client/stega";
import {Tabs, Tab} from '@commercelayer/app-elements'
import {useTranslation} from "react-i18next";

export default function Taxonomy({taxonomies}: { taxonomy: SanityDocument }) {
    const {
        title,
        taxons,
    } = taxonomies
    const {t} = useTranslation()

    let allTaxonomyProducts = []
    {
        taxons?.map((taxon) => {

            taxon.products? allTaxonomyProducts.push(...taxon.products): null
            {
                taxon.taxons?.map((tx) => {
                    if (tx.products) {
                        tx.products? allTaxonomyProducts.push(...tx.products): null
                    }
                    {
                        tx.taxons?.map((txn) => {
                            if (txn.products) {
                                txn.products? allTaxonomyProducts.push(...txn.products): null
                            }
                        })
                    }
                })
            }
        })
    }
    const uniqueProductArray = [...new Set(allTaxonomyProducts)]
    return (
        <main className="container mx-auto prose prose-lg p-2 ">
            {title ? (
                <h1 className='text-xl text-primary p-2 '>
                    <b>{title}</b>
                </h1>
            ) : null}


            <Tabs

                keepAlive
                onTabSwitch={function zs() {
                }}
            >
                < Tab
                    name={t('All products')}
                    key={t('All products')}>

                    <Prods products={uniqueProductArray}></Prods>
                </Tab>

                {taxons?.map((taxon) => {
                    return (


                        < Tab
                            name={taxon.title}
                            key={taxon._id}>
                            < div>
                                <Taxons taxon={taxon}></Taxons>
                            </div>
                            <Prods products={taxon.products}></Prods>
                        </Tab>
                    )
                })}
            </Tabs>
        </main>
    )
}
