import {li} from "../../@/components/ui/navigation-menu";
import * as React from "react";
import { useTranslation } from 'react-i18next'

export default function IdentityLinks(props) {
    const {t} = useTranslation('')



    return (
        <ul className="ml-10 flex items-baseline space-x-4">
        <li>
            <cl-identity-link type="login" target="_self">
                <button
                    className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                    {t("Identity link")}

                </button>
            </cl-identity-link>
        </li>
            <li>
                <cl-my-account-link type="signup" target="_self">
                    <button
                        className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">

                        {t("Go to my account")}

                    </button>
                </cl-my-account-link>
            </li>

            {/*<li>
        <cl-identity-status type="guest" target="_self">
            <button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                {t("Register now")}
            </button>
        </cl-identity-status>
        <cl-identity-status type="customer" target="_self">
            <button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                {t("Welcome back!")}
            </button>
        </cl-identity-status>
    </li>*/}

        </ul>
    )
}