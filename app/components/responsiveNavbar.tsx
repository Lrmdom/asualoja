
import * as React from "react"
import {Link} from "@remix-run/react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {t} from "i18next";
import {Suspense} from "react";
import Avatar from "~/components/avatar-dropdown"
export default function Component() {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuItems = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        {
            title: "Services",
            items: [
                { title: "Web Development", href: "/services/web-development" },
                { title: "Mobile Development", href: "/services/mobile-development" },
                { title: "UI/UX Design", href: "/services/ui-ux-design" },
            ],
        },
        { title: "Contact", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">Execlog Demo</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menuItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.items ? (
                                        <>
                                            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    {item.items.map((subItem) => (
                                                        <li key={subItem.title}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                    href={subItem.href}
                                                                >
                                                                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                                href={item.href}
                                            >
                                                {item.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="mr-2 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col space-y-4">
                            {menuItems.map((item) => (
                                <React.Fragment key={item.title}>
                                    {item.items ? (
                                        <div className="space-y-2">
                                            <h4 className="font-medium">{item.title}</h4>
                                            <ul className="ml-4 space-y-2">
                                                {item.items.map((subItem) => (
                                                    <li key={subItem.title}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="text-sm hover:underline"
                                                            onClick={toggleMenu}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-sm font-medium hover:underline"
                                            onClick={toggleMenu}
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Link className="mr-6 flex items-center space-x-2 md:hidden" href="/">
                            <span className="font-bold">Execlog Demo</span>
                        </Link>
                    </div>
                    <nav className="flex items-center">
                        <Link to="#">
                       <Avatar />
                        </Link>
                        {/*<Suspense>
                        <cl-identity-link type="login" target="_self">
                            <Button variant="outline" className="mr-2">
                                {t("Login")}
                            </Button>
                        </cl-identity-link>
                        </Suspense>
                        <Suspense>
                        <cl-identity-link type="signup" target="_self">
                            <Button>
                                {t("Sign Up")}
                            </Button>
                        </cl-identity-link>
                        </Suspense>
                         <cl-my-account-link type="signup" target="_self">
                    <button
                        className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 flex items-center gap-2">

                        {t("Go to my account")}

                    </button>
                </cl-my-account-link>
                        */}
                        <Link to="#">
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
                        </Link>

                    </nav>
                </div>
            </div>
        </header>
    )
}