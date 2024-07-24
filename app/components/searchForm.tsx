/**
 * v0 by Vercel.
 * @see https://v0.dev/t/x1wIyPsLuF7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Fuse from 'fuse.js'
import { stegaClean } from '@sanity/client/stega'
import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

export default function Component(props) {
  const i18n = useTranslation()
  const language = i18n.i18n.resolvedLanguage
  const fuseOptions = {
    isCaseSensitive: false,
    shouldSort: true,
    minMatchCharLength: 2,
    includeScore: true,
    includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    //keys: ['title', 'author.firstName'],
    keys: [
      'title',
      'description',
      'relatedCustomerNeeds.title',
      'relatedCustomerNeeds.description',
      'relatedCustomerNeeds.relatedCustomerNeedsDetails.title',
      'relatedCustomerNeeds.relatedCustomerNeedsDetails.description',
    ],
  }
  const fuse = new Fuse(props.services, fuseOptions)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([
    stegaClean(props.services),
  ])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  let filteredResults = fuse.search(searchTerm)
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {filteredResults.length > 0 && (
        // filter unique
        //todo if match reference, write downthe refrence text, ex: customerneed or customerNeedDetail name or title or description
        <div className="absolute z-10 mt-2 w-full rounded-md border border-input bg-background shadow-lg">
          <ul className="max-h-[300px] overflow-y-auto">
            {filteredResults.map((result) => (
              <li
                key={result.item.code}
                className="cursor-pointer px-4 py-2 hover:bg-muted"
              >
                <div className="font-medium">
                  <Link to={`${language}/${result.item.title}`}>
                    {result.item.title}
                  </Link>
                </div>

                {result.matches.map((match) => (
                  <div className="truncate-to-2-lines text-sm text-muted-foreground">
                    {match.value}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
