import type {SanityDocument} from '@sanity/client'

export default function Products({taxon}: { taxon: SanityDocument }) {
    const {
        title,
        taxons,
        products
    } = taxon

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">
            {title ? (
                    <h1>
                        <b>{title}</b>
                    </h1>
                ) : null}
    {taxon.taxons?.map((tx) => {
        return (
            <>
                <div key={tx._id}>
            <span className="bg-black text-white">
                {tx.title}
                </span>
                </div>
                <Product product={tx.products}></Product>
            </>
    )
    })}
    </main>
)
}



