import {li} from "@/components/ui/navigation-menu";
import * as React from "react";
import {useTranslation} from 'react-i18next'

export default function IdentityLinks(props) {
    const {t} = useTranslation('')


    return (
        <ul className="ml-10 flex items-baseline space-x-4">

            <li>
                <cl-identity-link type="login" target="_self">
                    <button
                        className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium underline-offset-4 transition-colors ring-offset-background text-primary hover:underline focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        {t("Identity link")}

                    </button>
                </cl-identity-link>
            </li>
            <li>
                <cl-my-account-link type="signup" target="_self">
                    <button
                        className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium underline-offset-4 transition-colors ring-offset-background text-primary hover:underline focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">

                        {t("Go to my account")}

                    </button>
                </cl-my-account-link>
            </li>

            {/*<li>
        <cl-identity-status type="guest" target="_self">
            <button
                className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium underline-offset-4 transition-colors ring-offset-background text-primary hover:underline focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {t("Register now")}
            </button>
        </cl-identity-status>
        <cl-identity-status type="customer" target="_self">
            <button
                className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium underline-offset-4 transition-colors ring-offset-background text-primary hover:underline focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {t("Welcome back!")}
            </button>
        </cl-identity-status>
    </li>*/}

        </ul>
    )
}