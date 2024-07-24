//import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityDocument } from '@sanity/client'

import { projectId, dataset } from '~/sanity/projectDetails'

import ExeclogCustomerNeed from '~/components/ExeclogCustomerNeed'
import { stegaClean } from '@sanity/client/stega'
import { bgGreen } from 'kleur/colors'

//const builder = imageUrlBuilder({ projectId, dataset })

export default function Service({ service }: { service: SanityDocument }) {
  const {
    execlogServicePrice,
    serviceImage,
    code,
    description,
    image_url,
    name,
    title,
  } = service
  return (
    <main className="container mx-auto prose prose-lg p-4 border-4">
      {serviceImage ? (
        <img
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
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
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={image_url}
          width={300}
          height={300}
          alt={name}
        />
      ) : null}

      {description ? <h3>{description}</h3> : null}

      <cl-price code={stegaClean(service.code)}>
        <cl-price-amount type="compare-at"></cl-price-amount>
        <cl-price-amount type="price"></cl-price-amount>
      </cl-price>
      <cl-add-to-cart kind="sku" code={stegaClean(code)} quantity="1">
        Add to cart
      </cl-add-to-cart>
      {execlogServicePrice?.map((servicePrice) => {
        return (
          <div key={servicePrice._id}>
            <div key={servicePrice._id}>
              <span className="bg-black text-white">
                {servicePrice.execlogServicePriceModel.priceModel.title}
              </span>
              <div>
                {
                  servicePrice.execlogServicePriceModel.priceModel
                    .description[0].children[0].text
                }
              </div>
            </div>

            <span className="bg-primary text-white">{servicePrice.price}</span>
          </div>
        )
      })}
      <ul>
        {service.relatedCustomerNeeds.map((customerNeed) => {
          return (
            <>
              <ExeclogCustomerNeed customerNeed={customerNeed} />
            </>
          )
        })}
      </ul>
    </main>
  )
}
