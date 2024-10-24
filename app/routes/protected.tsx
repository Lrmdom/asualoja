import {json} from '@remix-run/node'
import {authenticator} from '~/services/auth.server'
import {Form, useLoaderData} from '@remix-run/react'
import {CommerceLayer} from "@commercelayer/sdk";
import {authenticate} from "@commercelayer/js-auth";
import SibApiV3Sdk from "sib-api-v3-typescript"

const createUser = async (attributes,ENV) => {

    const auth = await authenticate('client_credentials', {
        clientId: 'vuuLuWnTGhUayS4-7LY8AR2mzbak5IxSf2Ts_VgQDTI',
        clientSecret:'8O9ft8XbknVZZcAqbd0BrxeUjlW7_ixb8pLhcR5f9SY'
    })


    const cl = CommerceLayer({
        organization: ENV.MY_ORGANIZTION,
        accessToken: auth.accessToken
    })

    const response = await fetch(`https://api.brevo.com/v3/contacts/${attributes.email}`,
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'api-key': ENV.BREVO_API_KEY
            }
        })
    const brevoCustomer = await response.json();

    const customer = await cl.customers.list({filters: {email_eq: attributes.email}})

    customer.length > 0 ? null :
    await cl.customers.create({password:attributes.email,email:attributes.email})


    if (brevoCustomer) {
        null

    } else {

        let apiInstance = new SibApiV3Sdk.ContactsApi()

        let apiKey = apiInstance.authentications['apiKey'];

        apiKey.apiKey = ENV.BREVO_API_KEY;

        let createContact = new SibApiV3Sdk.CreateContact();
        createContact.email = attributes.email;
        //createContact.listIds = [2];

        apiInstance.createContact(createContact).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
            console.error(error);
        })
    }

    try {
        //console.log(await cl.skus.list())
        //todo Special authorization to reset a password? send email with linkpwdreset
        const linkPwdReset = await cl.customer_password_resets.create({
            customer_email: attributes.email
        })
        console.log(linkPwdReset)

    } catch (e) {
        console.log(e)
    }
//todo send link pwdreset on email...

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = ENV.BREVO_API_KEY;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {"name": "John Doe", "email": "example@example.com"};
    sendSmtpEmail.to = [{"email": attributes.email, "name": "Jane Doe"}];
    sendSmtpEmail.cc = [{"email": "example2@example2.com", "name": "Janice Doe"}];
    sendSmtpEmail.bcc = [{"name": "John Doe", "email": "example@example.com"}];
    sendSmtpEmail.replyTo = {"email": "replyto@domain.com", "name": "John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name": "unique-id-1234"};
    sendSmtpEmail.params = {"parameter": "My param value", "subject": "New Subject"};

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
        console.error(error);
    });

//todo redirect to url passwordUpdate
}


export async function loader({request}) {
    const test = request.headers.get("Cookie")

    const myArray = test.split("; ");
    const token = myArray[1].split("=")[1]


    const ENV = {
        BREVO_API_KEY: import.meta.env.VITE_BREVO_API_KEY,
        MY_ORGANIZATION: import.meta.env.VITE_MY_ORGANIZATION,
        CL_INTEGRATION_TOKEN: token,

    }
    console.log(ENV)
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
        //successRedirect: `/auth/newCustomerPwd`
    })

    createUser(user._json, ENV)

    return json(user)
}

export default function Index() {


    const data = useLoaderData()

    return (
        <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
            <h1>Welcome {data.displayName}</h1>
            <h1>your id {data.id}</h1>
            <ul>
                <li>You have {data.provider} </li>
                <li>You're email {data.email} </li>
            </ul>
            <Form action="/logout" method="post">
                <button>Logout? Click me</button>
            </Form>
            ----
            <div>
                <h1>Welcome {data.displayName}!</h1>
                <p>This is a protected page</p>
                <Form action="/logout" method="post">
                    <button>Logout</button>
                </Form>
            </div>
            -----
            <div>{JSON.stringify(data)}</div>
        </div>
    )
}
