// app/routes/logout.tsx
import {ActionFunctionArgs, redirect} from "@remix-run/node"
import {authenticator} from "~/services/auth.server";

export let loader = () => redirect('/');

export let action = async ({request, params}: ActionFunctionArgs) => {
    await authenticator.logout(request, {redirectTo: "/"});
};
