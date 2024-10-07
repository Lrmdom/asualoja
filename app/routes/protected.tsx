import {json} from '@remix-run/node'
import {authenticator} from '~/services/auth.server'
import {Form, useLoaderData} from '@remix-run/react'
import {commitSession, getSession} from '~/services/session.server'



export async function loader({request}) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    return json(user)
}

export default function Index() {


    const data = useLoaderData()


    return (
        <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
            <h1>Welcome {data.displayName}</h1>
            <h1>your id {data.id}</h1>
            <ul>
                <li>You have {data.provider} </li>
                <li>You're email {data.email} </li>
            </ul>
            <Form action="/logout" method="post">
                <button>Logout? Click me</button>
            </Form>
            ----
            <div>
                <h1>Welcome {data.displayName}!</h1>
                <p>This is a protected page</p>
                <Form action="/logout" method="post">
                    <button>Logout</button>
                </Form>
            </div>
            -----
            <div>{JSON.stringify(data)}</div>
        </div>
    )
}
