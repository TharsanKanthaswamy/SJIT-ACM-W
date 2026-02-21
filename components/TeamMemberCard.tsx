'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMemberCardProps {
    member: {
        id: string;
        name: string;
        position: string;
        imageUrl?: string | null;
    };
    index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group text-center"
        >
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-[#D2C1B6]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative w-full h-full rounded-full overflow-hidden shadow-soft-lg border-4 border-white z-10">
                    {member.imageUrl ? (
                        <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#D2C1B6] flex items-center justify-center text-3xl font-bold font-serif text-[#1B3C53]">
                            {member.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-bold font-serif text-[#1B3C53] mb-1">{member.name}</h3>
            <p className="text-gray-500 font-light text-sm md:text-base">{member.position}</p>

            {/* Interactive Expandable Underline */}
            <div className="w-0 h-0.5 bg-[#D2C1B6] mx-auto mt-4 group-hover:w-12 transition-all duration-300" />
        </motion.div>
    )
}
