import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {stegaClean} from "@sanity/client/stega";
import Taxons from "~/components/Taxons";
import {Tabs, Tab} from '@commercelayer/app-elements'
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";

export default function Taxon({taxon}: { taxon: SanityDocument }) {
    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage
    const {t} = useTranslation()

    {
        taxon["allTaxonProducts"] = []
        taxon?.taxons?.map((taxo) => {
            taxon["allTaxonProducts"] = taxon["allTaxonProducts"] || []
            taxo.products ? taxon["allTaxonProducts"].push(...taxo.products) : null
            {
                taxo.taxons?.map((tx) => {
                    if (tx.products) {
                        tx.products ? taxon["allTaxonProducts"].push(...tx.products) : null
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

    if (Array.isArray(taxon.taxons)) {
        return (
            <>
                <div class="ml-4 flex h-24 border-2 border-gray-300 p-3 text-gray-700 shadow-md">
                </div>
                <main className="container mx-auto p-4 prose prose-lg">
                    <Tabs

                        keepAlive
                        onTabSwitch={function zs() {
                        }}
                    >
                        < Tab
                            name={`${t('All products')} (${taxon["allTaxonProducts"].length})`}
                            key="...">

                            <Prods products={taxon.products}></Prods>
                        </Tab>
                        {taxon.taxons.map((tx) => {
                            return (
                                <Tab name={tx.title} key={tx._id}>
                                    <div>
                                        <Taxons taxon={tx}></Taxons>
                                    </div>
                                    <Prods products={tx.products}></Prods>
                                </Tab>
                            )
                        })}
                    </Tabs>
                </main>
            </>
        )
    } else {
        return (
            <main className="container mx-auto p-4 prose prose-lg">


                <div key={taxon._id}>
                          <span className="rounded border-2 p-4 border-primary text-primary">
              <Link
                  to={`/${language}/${encodeURI(stegaClean(taxon.taxonomies[0]))}`}>{encodeURI(stegaClean(taxon.taxonomies[0]))}</Link>
                              -
                                            <Link
                                                to={`/${language}/${encodeURI(stegaClean(taxon.title))}`}>{stegaClean(taxon.title)}</Link>

              </span>
                    <Prods products={taxon.products}></Prods>
                </div>


            </main>
        )
    }


}



