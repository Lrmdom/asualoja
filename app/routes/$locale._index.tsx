import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import {Link, useRouteLoaderData} from "@remix-run/react";
import {loader} from "~/root";
import {Tab} from "@commercelayer/app-elements";
import Prods from "~/components/Prods";
import {stegaClean} from "@sanity/client/stega";


export const handle = {
    breadcrumb: () => <Link to="/parent">Some Route</Link>,
};

export const meta: MetaFunction = () => {
    return [
        {title: 'Execlog E-commerce'},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}



export default function Index() {
    const {t} = useTranslation('')
    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')
    const { i18n } = useTranslation()
    const language = i18n.resolvedLanguage
    return (
        <>
            {/*todo add taxonomies images and link to taxons/produts  ex:shop by categorie*/}
            <div className="container p-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">

                {data.map((tx) => {
                //console.log(tx)
                return (
                    <div
                        className="container p-4 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-48 m-2">

                        <div className="container hover:opacity-70 m-1 rounded-2xl m-2">
                            <div >
                            <Link className="text-primary flex flex-row justify-center items-center m-2" to={`/${language}/${stegaClean(tx.title)}`}>
                                {tx.title}
                            </Link>
                                <Link className="" to={`/${language}/${stegaClean(tx.title)}`}>
                            <img src={tx.imageUrl} width={250} height={175} alt={tx.title}
                                 className="container rounded p-1 border"
                            />
                         </Link>
                            </div>
                        </div>
                    </div>
                )

            })}
            </div>
                </div>
            <Hero/>
        </>
    )
}

https://execlog.commercelayer.app/microstore/list/nDrAIADdLy?accessToken=eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTmp2ZGllYlhZTiIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbInZsa2FaaGtHTmoiXSwic3RvY2tfbG9jYXRpb25faWRzIjpbImdrV29tdVZQYmsiLCJCbkRRZ3V3alFHIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOnZsa2FaaGtHTmoiLCJleHAiOjE3MjM1NDY0MTYsInRlc3QiOnRydWUsInJhbmQiOjAuOTYxMjE0MDQxMTk3NDkyMiwiaWF0IjoxNzIzNTMyMDE2LCJpc3MiOiJodHRwczovL2NvbW1lcmNlbGF5ZXIuaW8ifQ.Qz0RQ3CT4IGoBbdgFWSHRRW8s1UGN0tynCLv-H_NUOqEKqLJSZQwhovSguDNmFPp18-LIlOGC4tczEzAVy-Wd-E17D8x_n3NGIHtinSRF_s8Chb74WAoV8mhNSvqzWd4Rjnbp9KRSyQYok8mJHG-eMnRqYcOOdNb3umuC9ZLIhrJxj-ySR9BHXeCZvqWe1FMLWQaG3mp40jmKwPqRb0YRcLtJjwYBjk8B9yZKfZgT4CZuxJBOfnlqBHwiuvOwSs4pIsVLnbI_EEyR6DadUsRdaV9A9QyQLdOXBMssjFc2RpEPLviW8r4UHryoJhw9fPipC5JcKPaoblYiISjnFx2bmteqbAWlvH6BlkhjtEB4AUcwK3VkQvkqR1mawhv32cg3hw8z_eR7217yF0qHzM2I6C9aPTlA85rjVGIEJqJaLQWhY4tk-qrUF4B-stzjP_kpfw2FOQZAM-BOqESy8hyXmhtwWyR4ZWRAzlI5I6RwdLqDiw9xc3QKcJPNK3jzx78IbQEaXfvDpdN5zC_wK2XXlHH8ZjmwAJ16EZhxBcRE2GUden2aq9iHBH8dJnQakd1XNCDhPvM2IPJ-Uo0GpnfZ7-uagvtJdSSpQrtPp-Yz_2NzDW7cLaUzQjBEQ0pk22caUpU_cSI2zCfl1MxU6lmCC2zCp-61U2aIDmv7B_h2O4
