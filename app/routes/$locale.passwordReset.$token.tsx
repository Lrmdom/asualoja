import { Form } from "@remix-run/react";
import {json, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {commitSession, getSession} from "~/services/session.server";
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
export default function PasswordReset() {
    return (
        <Form action="/events" method="post">
            <label htmlFor="newPassword">New Password</label>
            <input name="newPassword" type="text"/>
            <label htmlFor="repeatpassword">Repeat Password</label>
            <input name="repeatpassword" type="text"/>
        </Form>
    );
}
