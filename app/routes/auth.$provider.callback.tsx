// app/routes/auth/$provider.callback.tsx
import {LoaderFunctionArgs} from '@remix-run/node'
import {authenticator} from '~/services/auth.server'
import i18next from "~/i18next.server";

export let loader =async ({request, params}: LoaderFunctionArgs) => {
    const locale = await i18next.getLocale(request)
    return authenticator.authenticate(params.provider, request, {
        successRedirect: `/${locale}/protected`,
        failureRedirect: `/${locale}/login`,
    })
}
