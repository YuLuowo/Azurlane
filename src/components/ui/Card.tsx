import React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/libs/utils';

const cardVariants = cva(
    'rounded-lg shadow-md p-4',
    {
        variants: {
            variant: {
                default: 'bg-white text-gray-800',
                primary: 'bg-blue-500 text-white',
                secondary: 'bg-gray-100 text-gray-800',
            },
            size: {
                sm: 'text-sm',
                md: 'text-base',
                lg: 'text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {
}

const Card: React.FC<CardProps> = ({className, variant, size, ...props}) => {
    return (
        <div className={cn(cardVariants({variant, size}), className)} {...props} />
    );
};

export default Card;