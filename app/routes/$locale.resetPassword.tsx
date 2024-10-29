import {LoaderFunctionArgs} from "@remix-run/node";
import i18next from "~/i18next.server";
import {Form, useLoaderData} from "@remix-run/react";

export async function loader({request,
                                 params,
                             }: LoaderFunctionArgs) {
    //const locale = await i18next.getLocale(params.locale)
    let { searchParams } = new URL(request.url);
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

            <Form action="/logout" method="post">

                <input></input>
                <input></input>
                <button>Submit</button>
            </Form>

            <div>{JSON.stringify(data)}</div>
        </div>
    )
}