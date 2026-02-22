'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function ScrollReveal({ children, className, id }: ScrollRevealProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={className}
        >
            {children}
        </motion.section>
    )
}
