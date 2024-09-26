import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import Taxons from "~/components/Taxons";
import {Tab, Tabs} from '@commercelayer/app-elements'
import {useTranslation} from "react-i18next";

export default function TaxonTaxon({taxon}: { taxon: SanityDocument }) {
    const {t} = useTranslation()
    if (Array.isArray(taxon.taxons) && taxon.taxons.length > 0) {
        return (
            <>
                <main className="container mx-auto p-4 prose prose-lg">
                    <Tabs

                        keepAlive
                        onTabSwitch={function zs() {
                        }}
                    >
                        < Tab
                            name={t('All products')}
                            key={t('All products')}>

                            <Prods products={taxon.products}></Prods>
                        </Tab>

                        {taxon.taxons.map((tx) => {
                            taxon["allTaxonProducts"] = []
                            if (Array.isArray(tx.taxons) && tx.taxons.length > 0) {

                                tx.taxons.map((txx) => {
                                    tx["allTaxonProducts"] = tx["allTaxonProducts"] || []
                                    txx.products ? tx["allTaxonProducts"].push(...txx.products) : null
                                })
                            }
                            return (
                                <Tab name={`${tx.title}(${tx.products?.length || tx["allTaxonProducts"]})`}
                                     key={tx._id}>

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
                    {/*<span className="rounded p-4 text-white bg-primary">
                           {stegaClean(taxon.title)}
                          </span>*/}
                    <Prods products={taxon.products}></Prods>
                </div>


            </main>
        )
    }


}



