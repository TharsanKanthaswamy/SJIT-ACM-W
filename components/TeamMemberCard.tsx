'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMemberCardProps {
    member: {
        id: string;
        name: string;
        position: string;
        image_url?: string | null;
        imageUrl?: string | null;
        linkedin_url?: string | null;
    };
    index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    const linkedinUrl = member.linkedin_url

    const CardContent = (
        <>
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-[#D2C1B6]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative w-full h-full rounded-full overflow-hidden shadow-soft-lg border-4 border-white z-10">
                    {member.image_url || member.imageUrl ? (
                        <Image
                            src={(member.image_url || member.imageUrl)!}
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

                {/* LinkedIn badge */}
                {linkedinUrl && (
                    <div className="absolute -bottom-1 -right-1 z-20 w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold font-serif text-[#1B3C53] mb-1">{member.name}</h3>
            <p className="text-gray-500 font-light text-sm md:text-base">{member.position}</p>

            {/* Interactive Expandable Underline */}
            <div className="w-0 h-0.5 bg-[#D2C1B6] mx-auto mt-4 group-hover:w-12 transition-all duration-300" />
        </>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group text-center"
        >
            {linkedinUrl ? (
                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                >
                    {CardContent}
                </a>
            ) : (
                CardContent
            )}
        </motion.div>
    )
}
