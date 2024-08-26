import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {stegaClean} from "@sanity/client/stega";
import Taxons from "~/components/Taxons";
import {Tabs, Tab} from '@commercelayer/app-elements'
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";

export default function Taxon({taxon}: { taxon: SanityDocument }) {
    const { i18n } = useTranslation()
    const language = i18n.resolvedLanguage
    const {t} = useTranslation()

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

    if (Array.isArray(taxon.taxons)) {
        return (
            <>
            <main className="container mx-auto prose prose-lg p-4 ">
                <Tabs

                    keepAlive
                    onTabSwitch={function zs() {
                    }}
                >
                    < Tab
                        name={`${t('All products')} (${allTaxonProducts.length})`}
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
            <main className="container mx-auto prose prose-lg p-4">


                <div key={taxon._id}>
                          <span className="border-2 border-primary p-4 rounded text-primary">
              <Link to={`/${language}/${stegaClean(taxon.taxonomies[0])}`}>{stegaClean(taxon.taxonomies[0])}</Link>
                              -
                                            <Link to={`/${language}/${stegaClean(taxon.title)}`}>{stegaClean(taxon.title)}</Link>

              </span>
                    <Prods products={taxon.products}></Prods>
                </div>


            </main>
        )
    }


}



