import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {Tabs,Tab} from '@commercelayer/app-elements'

export default function Taxons({taxon}: { taxon: SanityDocument }) {


    if(Array.isArray(taxon.taxons)){
        null
    }else{
        return null
    }


    return (
        <main className="container mx-auto prose prose-lg p-4">
            <Tabs

                keepAlive
                onTabSwitch={function zs() {
                }}
            >
            {taxon.taxons.map((tx) => {
                return (
                    <Tab name={tx.title} key={tx._id}>
                        <div>
                          {/*<span className="bg-primary p-4 rounded text-white">
                            {taxon.title}-{tx.title}
                          </span>*/}
                            <Prods products={tx.products}></Prods>

                        </div>
                    </Tab>
                )
            })}
            </Tabs>
        </main>
    )
}



