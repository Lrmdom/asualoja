// app/routes/auth/$provider.callback.tsx
import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export let loader = ({ request, params }: LoaderFunctionArgs) => {
  return authenticator.authenticate(params.provider, request, {
    successRedirect: '/protected',
    failureRedirect: '/login',
  })
}
