import React from "react";

export default function ShipLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            { children }
        </section>
    );
}

