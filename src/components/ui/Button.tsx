import React from 'react';
import { cva, type VariantProps} from "class-variance-authority";
import { cn } from "@/libs/utils"; // 假設你有 cn 這個工具函式

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-blue-500 text-white hover:bg-blue-600",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                outline: "border border-gray-500 text-gray-800 hover:bg-gray-100",
                ghost: "text-gray-800 hover:bg-gray-200",
            },
            size: {
                sm: "px-2 py-1 text-sm",
                md: "px-4 py-2 text-base",
                lg: "px-6 py-3 text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}


const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
    return (
        <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
            {props.children}
        </button>
    );
};

export default Button;