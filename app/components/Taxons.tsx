import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {Tabs, Tab} from '@commercelayer/app-elements'
import Taxon from "~/components/Taxon";
import TaxonTaxon from "~/components/TaxonTaxon";

export default function Taxons({taxon}: { taxon: SanityDocument }) {


    if (Array.isArray(taxon.taxons)) {
        null
    } else {
        return null
    }


    return (
        <main className="container mx-auto prose prose-lg p-4">
            <Tabs

                keepAlive
                onTabSwitch={function zs() {
                }}
            >
                < Tab
                    name="..."
                    key="...">

                    <Prods products={taxon.products}></Prods>
                </Tab>
                {taxon.taxons.map((tx) => {
                    return (
                        <Tab name={tx.title} key={tx._id}>
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



