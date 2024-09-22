import {redirect} from "@remix-run/node";
import {authenticator} from "~/services/auth.server";

export async function loader() {
    return redirect("/login");
}

export async function action({request}) {
    return authenticator.authenticate("linkedin", request, {
        successRedirect: "/protected",
    });
}
