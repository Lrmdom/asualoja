import groq from 'groq'

export const SERVICES_QUERY = groq`*[_type == "execlogService"] | order(title asc)
 
{
'serviceImage':image.asset->url,
code,
  name,
  description,
  image_url,
   "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  "relatedCustomerNeeds": *[_type=='execlogCustomerNeed' && references(^._id)] | order(title asc)
  { 'serviceImage':image.asset->url,code,description, image_url, name,
    "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
    "relatedCustomerNeedsDetails": *[_type=='execlogCustomerNeedDetail' && references(^._id)] | order(title asc)
    { 'serviceImage':image.asset->url,code,name,
      "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )
    }
  }
}`

export const SERVICES_QUERY_LOCALIZED = groq`*[_type == "execlogService"] | order(title asc)
{
  execlogServicePrice[]->{name,price,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ), 
  "description": coalesce(
    description[_key == $locale][0].value,
    description[_key == 'pt'][0].value,
    "Missing translation"
  ),
                         },
'serviceImage':image.asset->url,
  code,
  name,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  description,
  image_url,
  
  "relatedCustomerNeeds": *[_type=='execlogCustomerNeed' && references(^._id)] | order(title asc)
  { 'serviceImage':image.asset->url,code,description, image_url, name,
    "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
    "relatedCustomerNeedsDetails": *[_type=='execlogCustomerNeedDetail' && references(^._id)] | order(title asc)
    { 
    'serviceImage':image.asset->url,
    code,
    name,
      "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )
    }
  }
}`
export const SERVICE_QUERY = groq`*[_type == "execlogService" 
&& title[_key == $locale][0].value == $slug][0] | order(title asc)
 
{
'serviceImage':image.asset->url,
code,
  name,
  description,
  image_url,
   "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  "relatedCustomerNeeds": *[_type=='execlogCustomerNeed' && references(^._id)] | order(title asc)
  { 'serviceImage':image.asset->url,code,description, image_url, name,
    "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
    "relatedCustomerNeedsDetails": *[_type=='execlogCustomerNeedDetail' && references(^._id)] | order(title asc)
    { 
    'serviceImage':image.asset->url,
    code,
    name,
      "title": coalesce(
    title[_key == 'pt'][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )
    }
  }
}`
export const SERVICE_QUERY_LOCALIZED = groq`*[_type == "execlogService"
  && title[_key == $locale][0].value == $slug] | order(title asc) [0] 
{
 execlogServicePrice[]->{ name,price,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ), 
  "description": coalesce(
    description[_key == $locale][0].value,
    description[_key == 'pt'][0].value,
    "Missing translation"
  ),
execlogServicePriceModel{priceModel->{
     name,
   "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ), 
  "description": coalesce(
    description[_key == $locale][0].value,
    description[_key == 'pt'][0].value,
    "Missing translation"
  ),
 
 }}                         
},
'serviceImage':image.asset->url,
code,
  name,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  description,
  image_url,
  "relatedCustomerNeeds": *[_type=='execlogCustomerNeed' && references(^._id)] | order(title asc)
  { 'serviceImage':image.asset->url, code,description, image_url, name,
    "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
    "relatedCustomerNeedsDetails": *[_type=='execlogCustomerNeedDetail' && references(^._id)] | order(title asc)
    { 'serviceImage':image.asset->url,code,name,description,
      "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )
    }
  }
}`

export const TAXONOMIES_QUERY_LOCALIZED = groq`*[_type == "taxonomy"]

 {   
    "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == 'pt'][0].value,
        "Missing translation"
    ),
    taxons[]->{
        "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == 'pt'][0].value,
        "Missing translation"
        ),
        taxons[]->{
            "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == 'pt'][0].value,
            "Missing translation"
            ),
            products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
            ),
                "attributes": coalesce(
                    attribute[_key == $locale][0].value,
                    attribute[_key == 'pt'][0].value,
                    "Missing translation"
                ),
                variants[]->{ 
                sku,
                "images": images[]{
                          'url': asset->url,
                          },
                    "title": coalesce(
                    title[_key == $locale][0].value,
                    title[_key == 'pt'][0].value,
                    "Missing translation"
                ),
                    "attributes": coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                    )         
                }   
            } 
        },
        products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == 'pt'][0].value,
            "Missing translation"
            ),
            "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        ) ,
            variants[]->{ sku,
            "images": images[]{
                    'url': asset->url,
                    },
                    "title": coalesce(
                    title[_key == $locale][0].value,
                    title[_key == 'pt'][0].value,
                    "Missing translation"
                ) ,
                "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        )
                                                          
            }
         }
    } 
 }`

export const TAXONOMY_QUERY_LOCALIZED = groq`*[_type == "taxonomy" && title[_key == $locale][0].value == $slug][0] 
{
"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  taxons[]->{"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
  taxons[]->{"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  ),
    products[]->{"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )}         
},
    products[]->{"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )}
            
  }
}`

export const TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED = groq`
  *[_type == "taxonomy" && title[_key == $locale][0].value == $slug][0]
 {   
    "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == 'pt'][0].value,
        "Missing translation"
    ),
    taxons[]->{
        "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == 'pt'][0].value,
        "Missing translation"
        ),
        taxons[]->{
            "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == 'pt'][0].value,
            "Missing translation"
            ),
            products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
            ),
              "taxonomy":coalesce(
            ^.^.title[_key == $locale][0].value,
            ^.^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),           
            "taxons":coalesce(
            ^.title[_key == $locale][0].value,
            ^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),
                "attributes": coalesce(
                    attribute[_key == $locale][0].value,
                    attribute[_key == 'pt'][0].value,
                    "Missing translation"
                ),
                variants[]->{ 
                sku,
                "images": images[]{
                          'url': asset->url,
                          },
                    "title": coalesce(
                    title[_key == $locale][0].value,
                    title[_key == 'pt'][0].value,
                    "Missing translation"
                ),
                    "attributes": coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                    )         
                }   
            } 
        },
        products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == 'pt'][0].value,
            "Missing translation"
            ),
            "taxonomy":coalesce(
            ^.^.title[_key == $locale][0].value,
            ^.^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),           
            "taxons":coalesce(
            ^.title[_key == $locale][0].value,
            ^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),
           
            "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        ) ,
            variants[]->{ sku,
            "images": images[]{
                    'url': asset->url,
                    },
                    "title": coalesce(
                    title[_key == $locale][0].value,
                    title[_key == 'pt'][0].value,
                    "Missing translation"
                ) ,
                "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        )
                                                          
            }
         }
    } 
 }`

export const PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE = groq`
*[_type == "taxon"
  && title[_key == $locale][0].value == $taxons][0]
{
    "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
                    ),

    "taxonomies": *[_type == "taxonomy"
                  && title[_key == $locale][0].value == $taxonomy
                  && references(^._id)].title[_key == $locale].value,
  
        "product": *[_type == "product" && title[_key == $locale].value match $slug][0]
            { "imageUrl": image.asset->url,
                "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
                ),
                "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        ) ,           
                variants[]->{ sku,
                    "images": images[]{
                        'url': asset->url,
                    },
                    "title": coalesce(
                        title[_key == $locale][0].value,
                        title[_key == 'pt'][0].value,
                        "Missing translation"
                    ) ,
                    "attributes": 
                        coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        )
                                                          
                    }
            }
 }
`

export const PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED = groq`
*[_type == "taxon"
  && title[_key == $locale][0].value == $taxon][0]
{
  
    "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
                    ),
  
         products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == 'pt'][0].value,
            "Missing translation"
            ),
                      
            "taxons":coalesce(
            ^.title[_key == $locale][0].value,
            ^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),
           "taxonomies": *[_type == "taxonomy"
                  && title[_key == $locale][0].value == $taxonomy
                  && references(^.^._id)].title[_key == $locale].value,
      
            
            "attributes": 
                    coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        ) ,
            variants[]->{ sku,
                    "images": images[]{
                    'url': asset->url,
                    },
                    "title": coalesce(
                    title[_key == $locale][0].value,
                    title[_key == 'pt'][0].value,
                    "Missing translation"
                    ) ,
                    "attributes": 
                      coalesce(
                        attributes[_key == $locale][0].value,
                        attributes[_key == 'pt'][0].value,
                        "Missing translation"
                        )                                                       
            }
         }
 }
`


   /* *[_type == "taxon" &&
  products[taxonomy].title[_key == $locale][0].value match $taxonomy
  &&   products[title[_key == $locale]][0].value match $slug
 ][0]
{
  "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
            ),
  products[]->{"imageUrl": image.asset->url,
            "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
            ),
              "taxonomy":coalesce(
            ^.title[_key == $locale][0].value,
            ^.title[_key == 'pt'][0].value,
            "Missing translation"
            ),
    }
}


*[_type == "taxon"
  && title[_key == $locale][0].value == $taxons]
{
  "title": coalesce(
                title[_key == $locale][0].value,
                title[_key == 'pt'][0].value,
                "Missing translation"
            ),

  "taxonomies": *[_type == "taxonomy"
                  && title[_key == $locale][0].value == $taxonomy
                  && references(^._id)].title[_key == $locale][0].value
  ,
   "product": *[_type == "product" && title[_key == $locale].value match $slug][0]
  }
*/
