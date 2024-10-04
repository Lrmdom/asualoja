import imageUrlBuilder from '@sanity/image-url'
import type {SanityDocument} from '@sanity/client'

import {dataset, projectId} from '~/sanity/projectDetails'
import {stegaClean} from '@sanity/client/stega'

const builder = imageUrlBuilder({projectId, dataset})

export default function ExeclogCustomerNeedDetail({
                                                      customerNeedDetail,
                                                  }: {
    customerNeedDetail: SanityDocument
}) {
    const {serviceImage, code, description, image_url, name, title} =
        customerNeedDetail
    return (
        <li key={name}>
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
                <cl-price code={stegaClean(code)}>
                    <cl-price-amount type="compare-at"></cl-price-amount>
                    <cl-price-amount type="price"></cl-price-amount>
                </cl-price>
                <cl-add-to-cart kind="sku" code={stegaClean(code)} quantity="1">
                    Add to cart
                </cl-add-to-cart>
            </main>
        </li>
    )
}
