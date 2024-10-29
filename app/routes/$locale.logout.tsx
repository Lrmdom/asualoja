// app/routes/logout.tsx
import {ActionFunctionArgs, redirect} from "@remix-run/node"
import {authenticator} from "~/services/auth.server";
import i18next from "~/i18next.server";

export let loader = () => redirect('/');

export let action = async ({request, params}: ActionFunctionArgs) => {
    const locale = await i18next.getLocale(request)

    await authenticator.logout(request, {redirectTo: `/${locale}`});
};
