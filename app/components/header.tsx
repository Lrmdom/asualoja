
import { Link } from '@remix-run/react'
import SearchForm from "~/components/searchForm";
import MylaguageSwitcher from "~/components/myLanguageSwitcher";
import * as React from "react";

import logo from '/logo_transparente_execlog_blue._monday.png'
import SearchForm from '~/components/searchForm'
import SocialLogins from '~/routes/login'

import MylaguageSwitcher from '~/components/myLanguageSwitcher'
import {Avatar, AvatarFallback, AvatarImage} from "../../@/components/ui/avatar";
export default function Header(props) {

    let avatar
    if (props.user) {
        avatar = <Avatar>
            { !props.user.photos
                ? <AvatarImage src="https://github.com/shadcn.png"/>
                : <AvatarImage src={props.user.photos[0].value}/>
            }
            <AvatarFallback>{props.user.name.given_name}</AvatarFallback>
        </Avatar>
    } else {
        avatar = null
    }

    return (
        <section className="w-full bg-muted bg-green-500">
            <div className="container px-4 md:px-6">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Link
                        href="#"
                        className="group flex items-center gap-3 rounded-md bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-green-500"
                        prefetch={false}
                    >
                        <div
                            className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-colors group-hover:bg-accent-foreground group-hover:text-accent bg-green-500">
                            <HomeIcon className="h-5 w-5"/>
                        </div>
                        <div>
                            <div className="font-medium transition-colors group-hover:text-accent-foreground">Home</div>
                            <div className="text-sm text-muted-foreground">Go to the homepage</div>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="group flex items-center gap-3 rounded-md bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-green-500"
                        prefetch={false}
                    >
                        <div
                            className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-colors group-hover:bg-accent-foreground group-hover:text-accent bg-green-500">
                            <InfoIcon className="h-5 w-5"/>
                        </div>
                        <div>
                            <div className="font-medium transition-colors group-hover:text-accent-foreground">About
                            </div>
                            <div className="text-sm text-muted-foreground">Learn more about us</div>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="group flex items-center gap-3 rounded-md bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-green-500"
                        prefetch={false}
                    >
                        <div
                            className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-colors group-hover:bg-accent-foreground group-hover:text-accent bg-green-500">
                            <BriefcaseIcon className="h-5 w-5"/>
                        </div>
                        <div>
                            <div className="font-medium transition-colors group-hover:text-accent-foreground">Services
                            </div>
                            <div className="text-sm text-muted-foreground">Check out our services</div>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="group flex items-center gap-3 rounded-md bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-green-500"
                        prefetch={false}
                    >
                        <div
                            className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-colors group-hover:bg-accent-foreground group-hover:text-accent bg-green-500">
                            <MailIcon className="h-5 w-5"/>
                        </div>
                        <div>
                            <div className="font-medium transition-colors group-hover:text-accent-foreground">Contact
                            </div>
                            <div className="text-sm text-muted-foreground">Get in touch with us</div>
                        </div>
                    </Link>
                    <SearchForm taxonomies={props.taxonomies}></SearchForm>
                    <MylaguageSwitcher
                        onClick={() => handleLanguageChange()}
                    ></MylaguageSwitcher>
                    <SocialLogins></SocialLogins>
                    {avatar}
                </div>
                <cl-cart-link>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M4 10H28"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <cl-cart-count></cl-cart-count>
                    <cl-cart></cl-cart>
                </cl-cart-link>
            </div>

        </section>
    )
}

function BriefcaseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            <rect width="20" height="14" x="2" y="6" rx="2"/>
        </svg>
    )
}


function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    )
}


function InfoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
        </svg>
    )
}


function MailIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}