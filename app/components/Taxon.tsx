import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'

export default function Taxon({taxon}: { taxon: SanityDocument }) {




    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">


                        <div key={taxon._id}>
                          <span className="text-red">
                            {taxon.title}-{taxon.title}
                          </span>
                            <Prods products={taxon.products}></Prods>

                        </div>


        </main>
    )
}



