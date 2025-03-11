'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/images/events/temp1.png',
    '/images/events/temp2.png',
    '/images/events/temp11.png',
    '/images/events/temp12.png',
    '/images/events/temp13.png',
];

export default function HomePage() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="w-full max-w-7xl px-4">
                <h2 className="text-2xl font-bold mb-4">近期活動</h2>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-col md:flex-1 items-center justify-center border-2 rounded-lg">
                        <div className="border-b-2 p-2">
                            <p className="text-lg font-bold">活動公告</p>
                        </div>
                        <div className="p-2">
                            Hi
                        </div>
                    </div>
                    <div className="flex flex-col max-w-[664px] w-full p-4 border-2 rounded-lg">
                    <div className="relative aspect-[664/240] overflow-hidden">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={current}
                                    initial={{x: 664}}
                                    animate={{x: 0}}
                                    exit={{x: -664}}
                                    transition={{duration: 0.8}}
                                    className="absolute top-0 left-0 w-full h-full"
                                >
                                    <Image
                                        src={images[current]}
                                        alt={`event-pic ${current + 1}`}
                                        width={664}
                                        height={240}
                                        className="object-cover border-0 outline-none"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="flex gap-2 mt-4 justify-center">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                                        index === current ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex-col md:flex-1 items-center justify-center border-2 rounded-lg p-2">Hi</div>
                </div>


            </div>
        </div>
    );
}
