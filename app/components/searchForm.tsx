/**
 * v0 by Vercel.
 * @see https://v0.dev/t/x1wIyPsLuF7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Fuse from 'fuse.js'
import { stegaClean } from '@sanity/client/stega'
import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
//import {SearchBar} from "@commercelayer/app-elements";

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
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    //keys: ['title', 'author.firstName'],
    keys: [
      'title',
      'description',
      'attributes',
      'taxons.title',
      'taxons.taxons.title',
      'taxons.products.title',
      'taxons.products.description',
      'taxons.products.attributes',
      'taxons.products.variants.title',
      'taxons.products.variants.description',
      'taxons.products.variants.attributes',
      'taxons.taxons.products.title',
      'taxons.taxons.products.description',
      'taxons.taxons.products.attributes',
      'taxons.taxons.products.variants.title',
      'taxons.taxons.products.variants.description',
      'taxons.taxons.products.variants.attributes',
    ],
  }
  const fuse = new Fuse(props.taxonomies, fuseOptions)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([
    stegaClean(props.taxonomies),
  ])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  let filteredResults = fuse.search(searchTerm)
  console.log(filteredResults)
  return (
    <div className="relative max-w-md">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm"
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
                  <Link to={`${language}/${stegaClean(result.item.title)}`}>
                    {result.item.title}
                  </Link>
                </div>

                {result.matches.map((match) => (
                  <div className="truncate-to-2-lines text-sm text-muted-foreground">
                    <Link to={`${language}/${stegaClean(result.item.title)}/${stegaClean(match.value)}`}>
                      {match.value}
                    </Link>

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
