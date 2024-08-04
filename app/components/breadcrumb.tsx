
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function Component(navigationData) {
/*
    console.log(navigationData)
*/
    return (
        <Breadcrumb className="px-4 py-3 sm:px-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline" />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Categoria</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline" />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Sub Categoria</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline" />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Produtos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline" />
                <BreadcrumbItem>
                    <BreadcrumbPage>O meu produto</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}