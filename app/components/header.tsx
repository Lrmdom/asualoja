import MylaguageSwitcher from "~/components/myLanguageSwitcher";
import * as React from "react";
import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import IdentityLinks from "~/components/identyLinks";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SearchForm from "~/components/searchForm";


export default function Header(props) {

    let identity
    if (props.user) {
        identity =
            <IdentityLinks></IdentityLinks>
    } else {
        identity = null
    }

    let avatar
    if (props.user) {
        avatar = <NavigationMenuItem><Avatar>
            {!props.user.photos
                ? <AvatarImage src="https://github.com/shadcn.png"/>
                : <AvatarImage src={props.user.photos[0].value}/>
            }
            <AvatarFallback>{props.user.name.given_name}</AvatarFallback>
        </Avatar></NavigationMenuItem>
    } else {
        avatar = null
    }



    return (
        <div className="container place-content-end bg-purple-50">
            <ul className="ml-10 flex place-content-end items-baseline space-x-2">
                <li>
                    <SearchForm taxonomies={props.taxonomies}></SearchForm>
                </li>
                <li>
                    <MylaguageSwitcher
                        onClick={() => handleLanguageChange()}
                    ></MylaguageSwitcher>
                </li>

                <li>
                    <IdentityLinks></IdentityLinks>
                </li>
                <li>
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
                </li>
                <li>

                </li>


            </ul>

            {/*<div className="p-4">
                    <Link to="/">
                        <img alt=""
                             src="https://cdn.sanity.io/images/ho1tf79n/production/a5ed02e35a637fd2c5c0fa686ac3f79d4c028db5-1362x870.png?fit=max&w=75&h=75"/>
                    </Link>
                </div>*/}
            {/*<span className="">
                </span>
                <span className=""><SearchForm taxonomies={props.taxonomies}></SearchForm></span>
                <span className="">
                    <span>
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
                    </span>
                    <span>
                        <IdentityLinks></IdentityLinks>
                    </span>
                    <span>
                        {avatar}
                    </span>*/}


            {/*
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <SearchForm taxonomies={props.taxonomies}></SearchForm>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <MylaguageSwitcher
                                    onClick={() => handleLanguageChange()}
                                ></MylaguageSwitcher>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Log In</NavigationMenuTrigger>
                                <NavigationMenuContent>

                                    <SocialLogins></SocialLogins>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {identity}
                            <IdentityLinks></IdentityLinks>
                            {avatar}

                            <NavigationMenuItem>
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
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
*/}
        </div>


    )
}
