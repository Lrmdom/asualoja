// app/routes/logout.tsx
import {ActionFunctionArgs} from "@remix-run/node"
import {authenticator} from "~/services/auth.server";

export let action = async ({request, params}: ActionFunctionArgs) => {
    await authenticator.logout(request, {redirectTo: "/login"});
};
