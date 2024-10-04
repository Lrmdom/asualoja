import type {SanityDocument} from '@sanity/client'
import Taxons from '~/components/Taxons'
import Prods from "~/components/Prods";
import {Tab, Tabs} from '@commercelayer/app-elements'
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

            taxon.products ? allTaxonomyProducts.push(...taxon.products) : null
            {
                taxon.taxons?.map((tx) => {
                    if (tx.products) {
                        tx.products ? allTaxonomyProducts.push(...tx.products) : null
                    }
                    {
                        tx.taxons?.map((txn) => {
                            if (txn.products) {
                                txn.products ? allTaxonomyProducts.push(...txn.products) : null
                            }
                        })
                    }
                })
            }
        })
    }
    const uniqueProductArray = [...new Set(allTaxonomyProducts)]
    return (
        <main className="container mx-auto p-2 prose prose-lg">
            {title ? (
                <h1 className='p-2 text-xl text-primary'>
                    <b>{title}</b>
                </h1>
            ) : null}

            <Tabs

                keepAlive
                onTabSwitch={function zs() {
                }}
            >
                < Tab
                    name={`${t('All products')} (${allTaxonomyProducts.length})`}
                    key={t('All products')}>

                    <Prods products={uniqueProductArray}></Prods>
                </Tab>

                {taxons?.map((taxonn) => {

                    if (Array.isArray(taxonn.taxons)) {

                        taxonn.taxons.map((tx) => {
                            if (tx.products) {
                                taxonn["allTaxonProducts"] = taxonn["allTaxonProducts"] || []
                                taxonn.products ? taxonn["allTaxonProducts"].push(...tx.products) : null
                            }
                        })
                    }
                    return (

                        < Tab
                            name={`${taxonn.title} (${taxonn.products?.length || taxonn.allTaxonProducts?.length})`}
                            key={taxonn._id}>
                            < div>
                                <Taxons taxon={taxonn}></Taxons>
                            </div>
                            <Prods products={taxonn.products}></Prods>
                        </Tab>
                    )
                })}
            </Tabs>
        </main>
    )
}
