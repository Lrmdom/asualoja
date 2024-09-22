// app/routes/dashboard.tsx
import {Form, useLoaderData} from '@remix-run/react'
import {LoaderFunctionArgs} from '@remix-run/node'
import {authenticator} from '~/services/auth.server'

export let loader = async ({request, params}: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: '/',
    })

    return {user}
}

export default function Dashboard() {
    const {user} = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Welcome {user.displayName}!</h1>
            <p>This is a protected page</p>
            <Form action="/logout" method="post">
                <button>Logout</button>
            </Form>
        </div>
    )
}
