'use client'

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

import logo from '/logo_transparente_execlog_blue._monday.png'


import SearchForm from '~/components/searchForm'
import SocialLogins from '~/routes/login'
import {stegaClean} from '@sanity/client/stega'

import MylaguageSwitcher from '~/components/myLanguageSwitcher'
import {useTranslation} from 'react-i18next'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'


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
    //const {taxonomies, user} = props
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

    console.log(props.user)
    const {i18n} = useTranslation()
    return (
        <>


            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className=" ">
                            Getting started
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Icons.logo className="h-6 w-6"/>
                                            <div className="mb-2 mt-4 text-lg font-medium">
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
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="">
                            Components
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {/*
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
*/}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="">
                            Services
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {props.taxonomies.map((taxonomy) => (
                                    <ListItem
                                        className=""
                                        key={taxonomy._id}
                                        title={taxonomy.title}
                                        href={stegaClean(taxonomy.title)}

                                        /*media={
                                            service.serviceImage
                                                ? service.serviceImage
                                                : service.image_url
                                        }*/
                                    >
                                        {/*<BeakerIcon className="size-4 text-black"/>*/}
                                        {/*{taxonomy.description}*/}
                                        <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">

                                            {taxonomy.taxons?.map((taxon) => (
                                                <ListItem
                                                    className=""
                                                    key={taxon._id}
                                                    title={taxon.title}
                                                    href={stegaClean(taxon.title)}
                                                >

                                                </ListItem>
                                            ))}
                                        </ul>
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="">
                            About Us
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="">
                            Contacts
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <SearchForm taxonomies={props.taxonomies}></SearchForm>
                    <MylaguageSwitcher
                        onClick={() => handleLanguageChange()}
                    ></MylaguageSwitcher>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Log In</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <SocialLogins></SocialLogins>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {avatar}
                </NavigationMenuList>
            </NavigationMenu>


            {/*</header>*/}
        </>
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

                    <div className="text-sm font-medium leading-none   ">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
