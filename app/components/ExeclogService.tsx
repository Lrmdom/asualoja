import type {SanityDocument} from '@sanity/client'
import Taxons from '~/components/Taxons'
import Prods from "~/components/Prods";
import {stegaClean} from "@sanity/client/stega";
import {Tabs, Tab} from '@commercelayer/app-elements'

export default function Service({taxonomies}: { taxonomy: SanityDocument }) {
    const {
        title,
        taxons,
    } = taxonomies

    function haveProducts(taxon: any) {
        //console.log(taxon.products)
        if (taxon.products.length > 0) {
            return (
                <Tab name={taxon.title}
                     key={taxon._id}>
                    <div>
                        {/*<span className="bg-primary p-4 rounded text-white">
                            {taxon.title}-{tx.title}
                          </span>*/}
                        <Taxons taxon={taxon}></Taxons>
                    </div>
                    <Prods products={taxon.products}></Prods>
                </Tab>
            )
        } else {
            return null
        }
    }

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

                {taxons?.map((taxon) => {


                    return (
                        //todo if taxon.products? add tab with <Prods products={taxon.products}></Prods>

                        //haveProducts(taxon)

                        < Tab
                            name={taxon.title}
                            key={taxon._id}>
                            < div>
                                {/*<span className="bg-primary p-4 rounded text-white">
                            {taxon.title}-{tx.title}
                          </span>*/
                                }
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
