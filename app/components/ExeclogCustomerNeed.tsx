import type {SanityDocument} from '@sanity/client'
import {stegaClean} from '@sanity/client/stega'

import ExeclogCustomerNeedDetail from '~/components/ExeclogCustomerNeedDetail'

export default function ExeclogCustomerNeed({
                                                customerNeed,
                                            }: {
    customerNeed: SanityDocument
}) {
    const {serviceImage, code, description, image_url, name, title} =
        customerNeed
    return (
        <li>
            <main className="container mx-auto border-4 p-4 prose prose-lg">
                {serviceImage ? (
                    <img
                        className="float-left m-0 mr-4 w-1/3 rounded-lg"
                        src={serviceImage}
                        width={300}
                        height={300}
                        alt={name}
                    />
                ) : null}
                <cl-price code={stegaClean(code)}>
                    <cl-price-amount type="compare-at"></cl-price-amount>
                    <cl-price-amount type="price"></cl-price-amount>
                </cl-price>
                <cl-add-to-cart kind="sku" code={stegaClean(code)} quantity="1">
                    Add to cart
                </cl-add-to-cart>

                {title ? (
                    <h1>
                        <b>{title}</b>
                    </h1>
                ) : null}
                {image_url ? (
                    <img
                        className="m-0 mr-4 w-1/3 rounded-lg"
                        src={image_url}
                        width={300}
                        height={300}
                        alt={name}
                    />
                ) : null}
                {description ? <h3>{description}</h3> : null}
                <ul>
                    {customerNeed.relatedCustomerNeedsDetails.map(
                        (customerNeedDetail) => {
                            return (
                                <ExeclogCustomerNeedDetail
                                    customerNeedDetail={customerNeedDetail}
                                />
                            )
                        }
                    )}
                </ul>
            </main>
        </li>
    )
}
