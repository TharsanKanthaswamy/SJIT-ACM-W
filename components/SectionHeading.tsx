'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    light?: boolean;
    className?: string;
}

export function SectionHeading({ title, subtitle, light = false, className }: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("text-center mb-16", className)}
        >
            <h2 className={cn(
                "text-4xl md:text-5xl font-extrabold font-serif mb-4",
                light ? "text-white" : "text-[#1B3C53]"
            )}>
                {title}
            </h2>

            {/* Signature Underline */}
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className={cn("h-1 w-12 rounded-full", light ? "bg-white/50" : "bg-[#D2C1B6]")} />
                <div className={cn("h-1.5 w-16 rounded-full", light ? "bg-white" : "bg-[#1B3C53]")} />
                <div className={cn("h-1 w-12 rounded-full", light ? "bg-white/50" : "bg-[#D2C1B6]")} />
            </div>

            {subtitle && (
                <p className={cn(
                    "text-lg md:text-xl max-w-2xl mx-auto font-light",
                    light ? "text-blue-100" : "text-gray-600"
                )}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}
