/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CowzfwdSDEY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Link} from "@remix-run/react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import * as React from "react";

export default function Component() {
    return (
        <div className="container flex items-center justify-between bg-white px-4 py-2 dark:bg-gray-800">
            <Link to="/">
                <img alt=""
                     src="https://cdn.sanity.io/images/ho1tf79n/production/a5ed02e35a637fd2c5c0fa686ac3f79d4c028db5-1362x870.png?fit=max&w=75&h=75"/>
            </Link>
            <div className="hidden gap-4 md:flex">
                <Link className="text-lg font-medium underline-offset-4 hover:underline">
                    Home
                </Link>
                <Link className="text-lg font-medium underline-offset-4 hover:underline">
                    About
                </Link>
                <Link className="text-lg font-medium underline-offset-4 hover:underline">
                    Services
                </Link>
                <Link className="text-lg font-medium underline-offset-4 hover:underline">
                    Portfolio
                </Link>
                <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                    Contact
                </Link>

            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid p-4 w-[200px]">
                        <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                            Home
                        </Link>
                        <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                            About
                        </Link>
                        <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                            Services
                        </Link>
                        <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                            Portfolio
                        </Link>
                        <Link href="#" className="text-lg font-medium underline-offset-4 hover:underline">
                            Contact
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    )
}


function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </svg>
    )
}