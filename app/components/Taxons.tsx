import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {Tabs, Tab} from '@commercelayer/app-elements'
import Taxon from "~/components/Taxon";
import TaxonTaxon from "~/components/TaxonTaxon";
import {useTranslation} from "react-i18next";

export default function Taxons({taxon}: { taxon: SanityDocument }) {

    const {t} = useTranslation()

    if (Array.isArray(taxon.taxons)) {
        null
    } else {
        return null
    }

    let allTaxonProducts = []
    {
        taxon?.taxons?.map((taxo) => {

            taxo.products ? allTaxonProducts.push(...taxo.products) : null
            {
                taxo.taxons?.map((tx) => {
                    if (tx.products) {
                        tx.products ? allTaxonProducts.push(...tx.products) : null
                    }
                    {
                        tx.taxons?.map((txn) => {
                            if (txn.products) {
                                txn.products ? allTaxonProducts.push(...txn.products) : null
                            }
                        })
                    }
                })
            }
        })
    }
    const uniqueProductArray = [...new Set(allTaxonProducts)]

    return (
        <main className="container mx-auto prose prose-lg p-4">
            <Tabs

                keepAlive
                onTabSwitch={function zs() {
                }}
            >
                < Tab
                    name={`${t('All products')} (${allTaxonProducts.length })`}
                    key={t('All products')}>

                    <Prods products={taxon.products}></Prods>
                </Tab>
                {taxon.taxons.map((tx) => {

                    if (Array.isArray(tx.taxons)) {
                        let allTaxonProducts

                        tx.taxons.map((tax) => {
                            taxon["allTaxonProducts"] = taxon["allTaxonProducts"] || []
                            taxon.products ? taxon["allTaxonProducts"].push(...tax.products) : null
                            tax.taxons?.map((txn) => {
                                if (txn.products) {
                                    txn.products ? taxon["allTaxonProducts"].push(...txn.products) : null
                                }
                            })
                        })

                    }
                    return (

                        <Tab
                            name={`${tx.title} (${tx.products?.length || taxon["allTaxonProducts"]})`}
                            key={tx._id}>
                            <div>
                                <TaxonTaxon taxon={tx}></TaxonTaxon>
                            </div>
                            <Prods products={tx.products}></Prods>
                        </Tab>
                    )
                })}
            </Tabs>
        </main>
    )
}



