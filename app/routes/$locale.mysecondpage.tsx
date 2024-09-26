import type {MetaFunction} from '@remix-run/node'
import {useState} from 'react'
import {useRouteLoaderData} from '@remix-run/react'
import {loader} from '~/root'
import {stegaClean} from '@sanity/client/stega'

export const meta: MetaFunction = () => {
    return [
        {title: 'is preview working?'},
        {
            name: 'description',
            content: 'Welcome to Remix! and to presentation plugin',
        },
    ]
}

function Counter() {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)

    return (
        <div className="text-9xl">
            <span>{count}</span>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

function Dropinjs() {
    const {data, locale, ENV} = useRouteLoaderData<typeof loader>('root')
    return (
        <>
            {data.map((service) => {
                let cleanCode = stegaClean(service.code)
                return (
                    <>
                        <h1>{service.name}</h1>
                        <h1>{service.title}</h1>
                        <cl-price code={cleanCode}>
                            <cl-price-amount type="compare-at"></cl-price-amount>
                            <cl-price-amount type="price"></cl-price-amount>
                        </cl-price>
                        <cl-add-to-cart kind="sku" code={cleanCode} quantity="1">
                            Add to cart
                        </cl-add-to-cart>
                        <cl-availability code={cleanCode}>
                            <cl-availability-status type="available">
                                <span className="accent-green-700">• available</span>
                                ready to be shipped in
                                <cl-availability-info type="min-days"></cl-availability-info>-
                                <cl-availability-info type="max-days"></cl-availability-info>
                                days
                            </cl-availability-status>
                            <cl-availability-status type="unavailable">
                                <span className="accent-red-700">• out of stock</span>
                            </cl-availability-status>
                        </cl-availability>
                    </>
                )
            })}
        </>
    )
}

export default function Index() {
    return (
        <>
            <h1>ITS WORKING the Preview</h1>
            {/* <div className="max-sm:hidden bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="190828_07_MarinaBayatNightDrone_UHD_09.mp4" type="video/mp4" />
        </video>
      </div> */}
            <Counter></Counter>
            <Dropinjs></Dropinjs>
        </>
    )
}
