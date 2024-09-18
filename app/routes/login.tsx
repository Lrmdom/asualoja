import { Form } from '@remix-run/react'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node' // or cloudflare/deno
import { useLoaderData } from '@remix-run/react'
import { getSession, commitSession } from '~/services/session.server'
import { SocialsProvider } from 'remix-auth-socials'
import * as React from "react";

interface SocialButtonProps {
  provider: SocialsProvider
  label: string
}



const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form
    action={provider != 'LINKEDIN' ? `/auth/${provider}` : `/${provider}`}
    method="post"
  >
    <button className="">{label}</button>
  </Form>
)

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/userdetected')
  }

  const data = { error: session.get('error') }

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export async function action({ request }: ActionFunctionArgs) {
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
        <ul className=" grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px] ">
          {/*<SocialButton provider={SocialsProvider.GOOGLE} label=" Google"/>
          <SocialButton provider={SocialsProvider.FACEBOOK} label=" Facebook"/>
          <SocialButton provider={SocialsProvider.MICROSOFT} label=" Microsoft"/>
          <SocialButton provider="LINKEDIN" label=" LinkedIn"/>*/}
          <li>
            {/*<cl-identity-link type="login" target="_self">
              <button className="">Email </button>
            </cl-identity-link>*/}
          </li>
        </ul>

      </>
  )
}
