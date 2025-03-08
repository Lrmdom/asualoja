import {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export async function loader({
                                 request,
                                 params,
                             }: LoaderFunctionArgs) {
    //const locale = await i18next.getLocale(params.locale)
    let {searchParams} = new URL(request.url);
    let token = searchParams.get("reset_password_token")
    let email = searchParams.get("customer_email")
    params.token = token
    params.email = email

    return params

}

export default function Index() {


    const data = useLoaderData()
    console.log(data)
    return (
        <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>

            <form className="w-full max-w-sm">
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                               htmlFor="inline-full-name">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                            id="inline-full-name" type="text" value="Jane Doe"/>
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                               htmlFor="inline-full-name">
                            token
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                            id="inline-full-name" type="text" value="Jane Doe"/>
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                               htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                            id="inline-password" type="password" placeholder="******************"/>
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                               htmlFor="inline-password">
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                            id="inline-password" type="password" placeholder="******************"/>
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <label className="block font-bold text-gray-500 md:w-2/3">
                        <input className="mr-2 leading-tight" type="checkbox"/>
                        <span className="text-sm">
        Send me your newsletter!
      </span>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
                            type="button">
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>

            <div>{JSON.stringify(data)}</div>
        </div>
    )
}