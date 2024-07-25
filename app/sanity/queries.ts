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
  taxons[]->{"title": coalesce(
    title[_key == $locale][0].value,
    title[_key == 'pt'][0].value,
    "Missing translation"
  )}
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