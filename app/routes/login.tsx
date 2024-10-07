import {Form} from '@remix-run/react'
import type {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node'
import {json, redirect} from '@remix-run/node' // or cloudflare/deno
import {commitSession, getSession} from '~/services/session.server'

import * as React from "react";

/*interface SocialButtonProps {
    provider: SocialsProvider
    label: string
}*/




export async function loader({request}: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    if (session.get('user')) {
        // Redirect to the home page if they are already signed in.
        return redirect('/userdetected')
    }

    const data = {error: session.get('error')}

    return json(data, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    })
}

export async function action({request}: ActionFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'))
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    //todo cl api or identity Mfe
    const userId = await validateCredentials(username, password)

    if (userId == null) {
        session.flash('error', 'Invalid username/password')

        // Redirect back to the login page with errors.
        return redirect('/login', {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        })
    }

    session.set('userId', userId)

    // Login succeeded, send them to the home page.
    return redirect('/', {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    })
}

export default function Login() {
    return (
        <>
            <ul className="grid gap-3 p-4 w-[200px] md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                <Form
                    action={`/auth/google`}
                    method="post"
                >
                    <button className="border-primary-500">Google</button>
                </Form>
                <Form
                    action={`/auth/facebook`}
                    method="post"
                >
                    <button className="border-primary-500">Facebook</button>
                </Form>
                <Form
                    action={`/auth/microsoft`}
                    method="post"
                >
                    <button className="border-primary-500">Microsoft</button>
                </Form>
                <Form
                    action={`/auth/linkedin`}
                    method="post"
                >
                    <button className="border-primary-500">LinkedIn</button>
                </Form>
                <Form
                    action={`/auth/twitter`}
                    method="post"
                >
                    <button className="border-primary-500">Twitter</button>
                </Form>

                <li>
                    {/*<cl-identity-link type="login" target="_self">
              <button className="">Email </button>
            </cl-identity-link>*/}
                </li>
            </ul>

        </>
    )
}
