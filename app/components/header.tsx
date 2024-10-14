import MylaguageSwitcher from "~/components/myLanguageSwitcher";
import * as React from "react";
import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import IdentityLinks from "~/components/identyLinks";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SearchForm from "~/components/searchForm";
import {
    CartLink,
    CommerceLayer,
    LineItemsContainer,
    LineItemsCount,
    OrderContainer,
    OrderStorage
} from "@commercelayer/react-components";
import Cookies from "js-cookie";
import {authenticate} from "@commercelayer/js-auth";




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

    const MyCartIcon = () => (
        <div className='relative inline-block cursor-pointer text-xs font-bold'>
            <LineItemsContainer>

                {/* static icon */}
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='36'
                    height='36'
                    fill='currentColor'
                    viewBox='0 0 256 256'
                >
                    <path
                        d='M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z'/>
                </svg>

                {/* total number of cart items */}
                <LineItemsCount className='absolute bottom-2 left-1/2 transform -translate-x-1/2'/>

            </LineItemsContainer>
        </div>
    )

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
                    <CommerceLayer
                        accessToken="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoicFJ2RGlyYU9ZcCIsImNsaWVudF9pZCI6IjlCckQ0RlVNelJEVEh4NU1MQklPQ09yczdUVVdsNklJMGw4UTVCTkU2dzgiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJhb1hPQmhlbmVsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJna1dvbXVWUGJrIiwiQm5EUWd1d2pRRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDphb1hPQmhlbmVsIiwiZXhwIjoxNzI4OTAwNTA1LCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjEwOTc4NDY0MzcxOTAyNzA4LCJpYXQiOjE3Mjg4ODYxMDUsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.FBYjAJ-RubffFHdbLZZ4k4YUvwSqCfRWgKBhH7xhDJG77aoYp_pIgFix8Z7CDYzVMxLmPVwNoN1vvf-BzYhN_CPcs4I3OYBYlPsQjAmvZ5Z3dalRZkBxeWzOaAvv86N1AkJvt9y9qpnAD5SDdKIrYXZou6W1LAdrqwOx_UDlgGdQLAv7lIwKSi-5XdzwaezaYK6hSmx_1yjDu0g03sSWFhJBMFXeHve4EE3h4_aeKdTQzPTIYro4-Cbfyc2q-r1ggSa9S6tlgOaWdtFBKbbL_nNBTQUr-jrjEAH6Y60ymUxME0p3FxnaORA9sbDzHq834S1E3dYUtqubZ4Im1lOt8iWtUoTF-Dcwj0Ej0GaGW0_MSTNlgannLl0-ZgmwyhCktFMZc6bEesSC1lojzKL94BMR4pq3zKcqNXR7y-xkOI3C_vWDvTegAxysoKxC25VUYuw3WIdNrqex7v47LcdmKNZYm3v5hcEFl5DpfljInmYtsigo7IcbKKX84u4e8ttVbjaP9JRHorP41HF31adWWTISVhncLH1XlF9-rcwRC4KQEJyQODzfacicxfwETzmk_5htetZGQfyPBZ3Tj-3ygGnpHOEDQAG8YI9q8OxwLf8lmsQl5k--aaL3pQpuRY09dA8ugfwDQRMpgjd367i-0P4RoOjg4EXeVhuNiwIIrl8"
                        endpoint="https://execlog.commercelayer.io">
                        {/*<PricesContainer>
                    <ClientOnly fallback={null}>
                        {() => <Price
                            className="font-bold text-primary"
                            compareClassName="line-through ml-2 text-xl"
                            skuCode={stegaClean(selectedSku)}
                        />}

                    </ClientOnly>
                </PricesContainer>*/}
                        {/*
                <AvailabilityContainer skuCode={stegaClean(selectedSku)}>

                    <AvailabilityTemplate
                        showShippingMethodName
                        showShippingMethodPrice
                        timeFormat="days"
                    />
                </AvailabilityContainer>*/}

                        <OrderStorage persistKey="cl-examples-addToCart">
                            <OrderContainer>

                                <CartLink
                                    className="text-blue-500 hover:underline"
                                    label={MyCartIcon()}
                                    onClick={function Fa() {
                                    }}
                                    target="_blank"
                                    customDomain="brilliant-custard-06fc9a.netlify.app"
                                />


                            </OrderContainer>
                        </OrderStorage>
                    </CommerceLayer>
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
