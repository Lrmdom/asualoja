// app/routes/auth/$provider.tsx
import {ActionFunctionArgs, redirect} from '@remix-run/node'
import {authenticator} from '~/services/auth.server'

export async function loader() {
    return redirect('/login')
}

export async function action({request, params}: ActionFunctionArgs) {
    return authenticator.authenticate(params.provider, request, {
        successRedirect: '/protected',
    })
}
