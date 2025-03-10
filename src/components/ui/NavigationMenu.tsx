import Link from "next/link";

interface NavigationMenuProps {
    href: string;
    text: string;
    onClick?: () => void;
}

const NavigationMenu = ({ href, text, onClick }: NavigationMenuProps) => {
    return (
        <li onClick={onClick}>
            <Link href={href} className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-1 text-base hover:bg-gray-100 dark:hover:bg-gray-500">
                <p>{text}</p>
            </Link>
        </li>
    );
};

export default NavigationMenu;