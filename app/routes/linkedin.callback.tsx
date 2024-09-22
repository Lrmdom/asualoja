import {authenticator} from "~/services/auth.server";

export async function loader({request}) {
    return authenticator.authenticate("linkedin", request, {
        successRedirect: "/protected",
        failureRedirect: "/login",
    });
}
