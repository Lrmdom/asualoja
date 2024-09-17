// 'use client'

import {Link, Params, useLocation, useParams} from '@remix-run/react'
import {useTranslation} from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '../../@/components/ui/dropdown-menu'
import { Button } from '../../@/components/ui/button'
import {useChangeLanguage} from 'remix-i18next/react'
export default function Component() {
  const location = useLocation()
  //const pathname = location.pathname.replace(/\/$/, '')
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage

/*   const params = useParams()
  const lang = getLang(params)

   function getLang(params: Params<string>) {

                   const lang = params.lng ?? 'en'
                   if (lang !== 'ja' && lang !== 'en') {
                     throw new Response(null, {
                       status: 404,
                       statusText: `Not Found: Invalid language ${lang}`,
                     })
                   }
                   return lang
                 }*/

  const handleLanguageChange = (data) => {
    window.location.href = `/${data.language}/?lng=${data.language}`
    i18n.changeLanguage(data.language, (error) => {
      let re = new RegExp('/' + language, 'g')
      const pthn = location.pathname.replace(re, data.language)
      //todo use current url and just change the language parameters path and querystring

      setTimeout(function() {
        window.location.href = `/${data.language}/?lng=${data.language}`

      }, 500);

    })

  }
  const { pathname } = useLocation();
  const {t} = useTranslation('')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex items-center gap-2">
          <FlagIcon className="h-5 w-5" />
          <span>{i18n.language}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] bg-white">
        <DropdownMenuLabel>{t('Select Language')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem
            onSelect={() =>
              handleLanguageChange({
                pathname: location.pathname,
                language: 'en',
              })
            }
          >
            <Link to={pathname.replace(`/${language}/`, `/en${pathname}`)}>🇺🇸</Link>
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              handleLanguageChange({
                pathname: location.pathname,
                language: 'es',
              })
            }
          >

{/*
            <Link to={`/en${pathname}`}>🇯🇵</Link>
*/}
            <Link to={pathname.replace(`/${language}/`, `/es${pathname}`)}>🇺🇸</Link>

            Español
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              handleLanguageChange({
                pathname: location.pathname,
                language: 'pt',
              })
            }
          >
            Português
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}
