import * as React from 'react'


import {cn} from '@/lib/utils'
import {Icons} from '@/components/ui/icons'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {stegaClean} from '@sanity/client/stega'
import {useTranslation} from 'react-i18next'


const components: { title: string; to: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        to: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        to: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        to: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        to: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        to: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        to: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
]


export function MyNavMenu(props) {


    const {i18n, t} = useTranslation()

    const language = i18n.resolvedLanguage
    return (
        <div className="container rounded border-2 p-2">
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t('Promotions')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>

                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t('Services')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>

                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t('Products')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 bg-white p-4 w-[400px] md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                                {props.taxonomies.map((taxonomy) => (
                                    <ListItem
                                        className=""
                                        key={taxonomy._id}
                                        title={taxonomy.title}
                                        href={stegaClean(`/${language}/${taxonomy.title}/`)}
                                    >
                                        <ul className="">
                                            {taxonomy.taxons?.map((taxon) => (
                                                <ListItem
                                                    className=""
                                                    key={taxon._id}
                                                    title={taxon.title + "(" + taxon.products?.length + ")"}
                                                    href={stegaClean(`/${language}/${taxonomy.title}/${taxon.title}`)}
                                                >
                                                    <ul className="">
                                                        {taxon.taxons?.map((tx) => (

                                                            <ListItem
                                                                className=""
                                                                key={tx._id}
                                                                title={tx.title + "(" + tx.products?.length + ")"}
                                                                href={stegaClean(`/${language}/${taxonomy.title}/${tx.title}`)}
                                                            >
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t("About us")}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t("Contacts")}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-primary">
                            {t('Outlet')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none from-muted/50 to-muted focus:shadow-md"
                                            href="/"
                                        >
                                            <Icons.logo className="h-6 w-6"/>
                                            <div className="mt-4 mb-2 text-lg font-medium">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components that you can copy and
                                                paste into your apps. Accessible. Customizable. Open
                                                Source.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="Typography"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>


            {/*</header>*/}
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({className, title, media, children, ...props}, ref) => {
    return (
        <li key={title}>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <img className="" src={media} alt="" width={75}/>

                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'

/*
"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="#" className="flex items-center px-2 py-4">
                                <span className="text-lg font-semibold text-gray-500">Logo</span>
                            </a>
                        </div>
                        <div className="hidden items-center space-x-1 md:flex">
                            <a href="#" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500">Home</a>
                            <a href="#" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500">Services</a>
                            <a href="#" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500">About</a>
                            <a href="#" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500">Contact Us</a>
                        </div>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}>
                <a href="#" className="block px-4 py-2 text-sm transition duration-300 hover:bg-green-500 hover:text-white">Home</a>
                <a href="#" className="block px-4 py-2 text-sm transition duration-300 hover:bg-green-500 hover:text-white">Services</a>
                <a href="#" className="block px-4 py-2 text-sm transition duration-300 hover:bg-green-500 hover:text-white">About</a>
                <a href="#" className="block px-4 py-2 text-sm transition duration-300 hover:bg-green-500 hover:text-white">Contact Us</a>
            </div>
        </nav>
    )
}*/
