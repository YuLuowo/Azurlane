import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import {ThemeProvider} from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "碧藍航線",
    description: "碧藍航線",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <body>
        <ThemeProvider>
            <div className="bg-white min-h-screen dark:bg-black dark:text-white">
                <Navbar/>
                <div>
                    {children}
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>

    );
}