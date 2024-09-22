import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default function Component(navigationData) {
    /*
        console.log(navigationData)
    */
    return (
        <div className="container p-1">
            <Breadcrumb className="px-4 py-3 sm:px-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-xs" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:inline"/>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-xs" href="/products">Categoria</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:inline"/>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-xs" href="/products">Sub Categoria</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:inline"/>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-xs" href="/products">Produtos</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:inline"/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-xs">O meu produto</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}