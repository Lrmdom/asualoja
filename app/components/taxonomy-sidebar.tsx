import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { XIcon } from 'lucide-react'

// Sample taxonomy data
const taxonomies = {
    category: ['Electronics', 'Clothing', 'Books', 'Home & Garden'],
    brand: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Amazon Basics'],
    price: ['Under $50', '$50 - $100', '$100 - $500', 'Over $500'],
    rating: ['5 Star', '4 Star & Up', '3 Star & Up', '2 Star & Up'],
}

export default function TaxonomySidebar() {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
    const [searchTerm, setSearchTerm] = useState('')

    const handleFilterChange = (category: string, item: string) => {
        setSelectedFilters(prev => {
            const updatedCategory = prev[category] ? [...prev[category]] : []
            const itemIndex = updatedCategory.indexOf(item)

            if (itemIndex > -1) {
                updatedCategory.splice(itemIndex, 1)
            } else {
                updatedCategory.push(item)
            }

            return { ...prev, [category]: updatedCategory }
        })
    }

    const clearAllFilters = () => {
        setSelectedFilters({})
        setSearchTerm('')
    }

    const filteredTaxonomies = Object.entries(taxonomies).reduce((acc, [category, items]) => {
        acc[category] = items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return acc
    }, {} as Record<string, string[]>)

    return (
        <div className="container absolute top-0 left-0 w-64 bg-background border-r h-screen">
            <div className="p-4 space-y-4">
                <h2 className="text-lg font-semibold text-primary border-2 p-2 border-primary">Search Taxon attributes</h2>
                <Input
                    type="search"
                    placeholder="Search filters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        <XIcon className="h-4 w-4 mr-2" />
                        Clear all
                    </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-140px)]">
                    <Accordion type="multiple" className="w-full">
                        {Object.entries(filteredTaxonomies).map(([category, items]) => (
                            <AccordionItem value={category} key={category}>
                                <AccordionTrigger className="text-sm font-medium">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {items.map(item => (
                                            <div className="flex items-center space-x-2" key={item}>
                                                <Checkbox
                                                    id={`${category}-${item}`}
                                                    checked={selectedFilters[category]?.includes(item)}
                                                    onCheckedChange={() => handleFilterChange(category, item)}
                                                />
                                                <Label
                                                    htmlFor={`${category}-${item}`}
                                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </ScrollArea>
            </div>
        </div>
    )
}