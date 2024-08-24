import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {stegaClean} from "@sanity/client/stega";
import Taxons from "~/components/Taxons";
import {Tabs, Tab} from '@commercelayer/app-elements'
import {useTranslation} from "react-i18next";

export default function TaxonTaxon({taxon}: { taxon: SanityDocument }) {
    const {t} = useTranslation()
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
                        name={t('All products')}
                        key={t('All products')}>

                        <Prods products={taxon.products}></Prods>
                    </Tab>

                    {taxon.taxons.map((tx) => {
                        return (
                            <Tab name={`${tx.title}(${tx.products.length})`} key={tx._id}>

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
                          {/*<span className="bg-primary p-4 rounded text-white">
                           {stegaClean(taxon.title)}
                          </span>*/}
                    <Prods products={taxon.products}></Prods>
                </div>


            </main>
        )
    }


}



