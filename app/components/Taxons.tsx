import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'

export default function Taxons({taxon}: { taxon: SanityDocument }) {


    if(Array.isArray(taxon.taxons)){
        null
    }else{
        return null
    }


    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {taxon.taxons.map((tx) => {
                return (
                    <>
                        <div key={tx._id}>
                          <span className="text-red">
                            {taxon.title}-{tx.title}
                          </span>
                            <Prods products={tx.products}></Prods>

                        </div>
                    </>
                )
            })}

        </main>
    )
}



