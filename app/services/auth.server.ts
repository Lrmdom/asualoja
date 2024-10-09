import {Authenticator} from 'remix-auth'
import {sessionStorage} from '~/services/session.server'
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
import {GoogleStrategy} from 'remix-auth-google'
import {FacebookStrategy} from 'remix-auth-facebook'
import {MicrosoftStrategy} from 'remix-auth-microsoft'

import {LinkedinStrategy} from 'remix-auth-linkedin'

import {authenticate} from "@commercelayer/js-auth";
import {CommerceLayer} from '@commercelayer/sdk'
import * as process from "node:process"
import SibApiV3Sdk from "sib-api-v3-typescript"


const clAuth = await authenticate('client_credentials', {
    clientId: 'vuuLuWnTGhUayS4-7LY8AR2mzbak5IxSf2Ts_VgQDTI',
    clientSecret: '8O9ft8XbknVZZcAqbd0BrxeUjlW7_ixb8pLhcR5f9SY'
    //scope: 'market:id:vlkaZhkGNj'
})
const cl = CommerceLayer({
    organization: 'Execlog',
    accessToken: clAuth.accessToken
})


async function createUser(attributes) {
    //todo if not exists , create

    /*const response = await fetch("https://execlog.commercelayer.io/api/customers",
        {
            method: 'GET',
            headers: {
                'accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${clAuth.accessToken}`
            }
        })*/
    const response = await fetch(`https://api.brevo.com/v3/contacts/${attributes.email}`,
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY
            }
        })
    const brevoCustomer = await response.json();

   const customer = await cl.customers.list({filters: {email_eq: attributes.email}})

    customer.length > 0 ? null: await cl.customers.create(attributes)



    if (brevoCustomer) {
        null

    } else {

        let apiInstance = new SibApiV3Sdk.ContactsApi()

        let apiKey = apiInstance.authentications['apiKey'];

        apiKey.apiKey = process.env.BREVO_API_KEY;

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



             let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

             let apiKey = apiInstance.authentications['apiKey'];
             apiKey.apiKey = process.env.BREVO_API_KEY;
             
             let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
             
             sendSmtpEmail.subject = "My {{params.subject}}";
             sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
             sendSmtpEmail.sender = {"name":"John Doe","email":"example@example.com"};
             sendSmtpEmail.to = [{"email":attributes.email,"name":"Jane Doe"}];
             sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
             sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
             sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
             sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
             sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
             
             apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
               console.log('API called successfully. Returned data: ' + JSON.stringify(data));
             }, function(error) {
               console.error(error);
             });


}

export let authenticator = new Authenticator(sessionStorage)

authenticator.use(
    new LinkedinStrategy(
        {
            clientID: '77sukk301f74bf',
            clientSecret: 'liwPtmOReOVePGKd',
            // LinkedIn is expecting a full URL here, not a relative path
            // see: https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1#step-1-configure-your-application
            callbackURL: 'http://localhost:5173/auth/linkedin/callback',
        },
        async ({accessToken, refreshToken, extraParams, profile, context}) => {
            const email = profile._json.email
            const attributes = {
                email: email
            }
            createUser(attributes)

            return profile
        }
    ),
    'linkedin'
)

authenticator.use(
    new MicrosoftStrategy(
        {
            clientId: 'db21c78b-1f73-4c45-a8f0-982a2f49f287',
            clientSecret: 'RPv8Q~i7ViKaN8qbQsoCE2650ELw83U4.XSz6dBD',
            redirectUri: 'http://localhost:5173/auth/microsoft/callback',
            tenantId: '9b986352-978e-4025-97a5-2af66c8022de', // optional - necessary for organization without multitenant (see below)
            scope: 'openid profile email', // optional
            prompt: 'login', // optional
        },
        async ({accessToken, extraParams, profile}) => {
            // Here you can fetch the user from database or return a user object based on profile
            // return {profile}
            // The returned object is stored in the session storage you are using by the authenticator

            // If you're using cookieSessionStorage, be aware that cookies have a size limit of 4kb
            // For example this won't work
            // return {accessToken, extraParams, profile}

            // Retrieve or create user using id received from userinfo endpoint
            // https://graph.microsoft.com/oidc/userinfo

            // DO NOT USE EMAIL ADDRESS TO IDENTIFY USERS
            // The email address received from Microsoft Entra ID is not validated and can be changed to anything from Azure Portal.
            // If you use the email address to identify users and allow signing in from any tenant (`tenantId` is not set)
            // it opens up a possibility of spoofing users!

            //return User.findOrCreate({ id: profile.id });
            return profile
        }
    )
)


authenticator.use(
    new GoogleStrategy(
        {
            clientID:
                '1091535953121-mb4b5ap4uij06s5nqmcbpia3mpdo4437.apps.googleusercontent.com',
            clientSecret: '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',
            //callbackURL: "http://localhost:5173/auth/google/callback"
            callbackURL: 'http://localhost:5173/auth/google/callback',
        },
        async ({accessToken, refreshToken, extraParams, profile}) => {
            // here you would find or create a user in your database
            //return User.findOrCreate({ email: profile.emails[0].value })

            const email = profile._json.email
            const attributes = {
                email: email
            }


            createUser(attributes)


            return profile

        }
    ),
    'google'
)

authenticator.use(
    new FacebookStrategy(
        {
            clientID: '1031654645049512',
            clientSecret: 'a47b82c7a365970bca801ebde865adaa',
            callbackURL: 'http://localhost:5173/auth/facebook/callback',
        },
        async ({profile}) => {
            const email = profile._json.email
            const attributes = {
                email: email
            }
            createUser(attributes)

            return profile
        }
    ),
    'facebook'
)

//it is an EXECLOG acount


// Tell the Authenticator to use the form strategy
/*authenticator.use(
    new FormStrategy(async ({form}) => {
        let email = form.get('email')
        let password = form.get('password')
        let user = await login(email, password)
        // the type of this user must match the type you pass to the Authenticator
        // the strategy will automatically inherit the type if you instantiate
        // directly inside the `use` method
        return user
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    'user-pass'
)*/
