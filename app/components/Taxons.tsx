import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {Tabs, Tab} from '@commercelayer/app-elements'
import Taxon from "~/components/Taxon";
import TaxonTaxon from "~/components/TaxonTaxon";
import {useTranslation} from "react-i18next";

export default function Taxons({taxon}: { taxon: SanityDocument }) {

    const {t} = useTranslation()

    if (Array.isArray(taxon.taxons) && taxon.taxons.length > 0) {
        null
    } else {
        return null
    }


    {
        taxon["allTaxonProducts"]=[]
        taxon?.taxons?.map((taxo) => {
            taxon["allTaxonProducts"] = taxon["allTaxonProducts"] || []
            taxo.products && taxo.products.length > 0 ? taxon["allTaxonProducts"].push(...taxo.products) : null
            {
                taxo.taxons?.map((tx) => {
                    if (tx.products) {
                        taxo.products ? taxon["allTaxonProducts"].push(...tx.products) : null
                    }
                    {
                        tx.taxons?.map((txn) => {
                            if (txn.products) {
                                txn.products ? taxon["allTaxonProducts"].push(...txn.products) : null
                            }
                        })
                    }
                })
            }
        })
    }
    const uniqueProductArray = [...new Set(taxon["allTaxonProducts"])]

    return (
        <main className="container mx-auto prose prose-lg p-4 ">
            <Tabs
                keepAlive
                onTabSwitch={function zs() {
                }}
            >
                < Tab
                    name={`${t('All products')} (${taxon["allTaxonProducts"]?.length })`}
                    key={t('All products')}>

                    <Prods products={taxon.products}></Prods>
                </Tab>
                {taxon.taxons.map((tx) => {

                    if (Array.isArray(tx.taxons) && tx.taxons.length > 0) {

                        tx.taxons.map((tax) => {
                            tx["allTaxonProducts"] = tx["allTaxonProducts"] || []
                            if (tax.products) {
                                tx.products ? tx["allTaxonProducts"].push(...tax.products) : null
                            }
                            if (Array.isArray(tax.taxons)&& tax.taxons.length > 0) {
                                tax.taxons?.map((txn) => {
                                    if (txn.products) {
                                        tx.products ? tx["allTaxonProducts"].push(...txn.products) : null
                                    }
                                    if (Array.isArray(txn.taxons)&& txn.taxons.length > 0) {
                                        txn.taxons?.map((txn2) => {
                                            console.log(txn2)
                                            if (txn2.products) {
                                                tx.products ? tx["allTaxonProducts"].push(...txn2.products) : null
                                                txn2.products ? txn2["allTaxonProducts"].push(...txn2.products) : null

                                            }
                                        })
                                    }
                                })
                            }
                        })

                    }
                    return (

                        <Tab
                            name={`${tx.title} (${tx.products?.length || tx["allTaxonProducts"]?.length})`}
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



