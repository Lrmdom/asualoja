
import { Link } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

export default function ExeclogServices({ ExeclogServices }: { ExeclogServices: SanityDocument[] }) {
    return (
        <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
            {ExeclogServices?.length > 0 ? (
                ExeclogServices.map((service) => (
                    <Link
                        key={service._id}
                        to={service.name}
                    >
                        
                        <h2 className="p-4 hover:bg-blue-50">{service.name}</h2>
                    </Link>
                ))
            ) : (
                <div className="p-4 text-red-500">No services found</div>
            )}
        </main>
    );
}