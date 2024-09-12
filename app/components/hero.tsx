
import { Link } from '@remix-run/react'
import {useTranslation} from "react-i18next";



export default function Component() {
  const {t} = useTranslation('')
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                {t("Elevate Your Digital Presence")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-2xl">
                Unlock the power of cutting-edge technology to transform your online experience.
              </p>
            </div>
            <Link
              to="#"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
             >
              Get Started
            </Link>
          </div>
          <img
            src="https://cdn.sanity.io/images/ho1tf79n/production/73a8744dba8caefcccd161575f07eb453bf58dba-604x524.svg"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}