'use client'

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import NavigationMenu from "@/components/ui/NavigationMenu";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuItemClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-full max-w-7xl px-4">
                <div className="flex items-center justify-between py-4">
                    <Link className="text-3xl font-bold" href="/">
                        碧藍航線 AzurLane
                    </Link>
                    <div className="md:hidden h-8 flex justify-between">
                        <DarkModeToggle/>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <HiX size={32}/> : <HiMenu size={32}/>}
                        </button>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex gap-4">
                            <NavigationMenu href="/" text="首頁" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/ships" text="艦船" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/equipments" text="裝備" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/maps" text="地圖" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/others" text="其他" onClick={handleMenuItemClick}/>
                            <DarkModeToggle/>
                        </ul>
                    </div>
                </div>
                <Transition
                    show={isOpen}
                    enter="transition duration-200 transform"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-150 transform"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-2"
                >
                    <div className="md:hidden pb-4">
                        <ul className="flex flex-col gap-2">
                            <NavigationMenu href="/" text="首頁" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/ships" text="艦船" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/equipments" text="裝備" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/maps" text="地圖" onClick={handleMenuItemClick}/>
                            <NavigationMenu href="/others" text="其他" onClick={handleMenuItemClick}/>
                        </ul>

                    </div>
                </Transition>
            </div>
        </div>
    );
}
