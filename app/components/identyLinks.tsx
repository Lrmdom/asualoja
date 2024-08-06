import {NavigationMenuItem} from "../../@/components/ui/navigation-menu";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "../../@/components/ui/avatar";

export default function IdentityLinks(props) {



    return (
        <>
        <NavigationMenuItem>
            <cl-identity-link type="login" target="_self">
                <button
                    className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                    Identity link
                </button>
            </cl-identity-link>
        </NavigationMenuItem>
    <NavigationMenuItem>
        <cl-my-account-link  type="signup" target="_self">
            <button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                Go to my account
            </button>
        </cl-my-account-link>
    </NavigationMenuItem>

    <NavigationMenuItem>
        <cl-identity-status type="guest">
            <button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                Register now!
            </button>
        </cl-identity-status>
        <cl-identity-status type="customer">
            <button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">
                Welcome back!
            </button>
        </cl-identity-status>
    </NavigationMenuItem>

        </>
    )
}