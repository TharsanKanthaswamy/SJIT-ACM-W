'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EventCardProps {
    event: {
        id: string;
        title: string;
        event_date: string;
        short_description: string;
        images?: string[];
    };
    index: number;
}

export function EventCard({ event, index }: EventCardProps) {
    const isUpcoming = new Date(event.event_date) > new Date();
    const [imgError, setImgError] = useState(false);

    const hasImage = event.images && event.images[0] && !imgError;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/events/${event.id}`} className="block h-full bg-white rounded-2xl shadow-soft hover:shadow-soft-xl transition-all duration-300 border border-transparent hover:border-blue-100 overflow-hidden flex flex-col cursor-pointer">
                {hasImage ? (
                    <div className="relative h-48 w-full overflow-hidden bg-[#E2E8F0]">
                        <Image
                            src={event.images![0]}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImgError(true)}
                        />
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className={cn(
                                "px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm tracking-wide",
                                isUpcoming
                                    ? "bg-[#1B3C53] text-white"
                                    : "bg-[#64748B] text-white"
                            )}>
                                {isUpcoming ? 'Upcoming' : 'Past'}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 pt-6 pb-0">
                        <span className={cn(
                            "px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm tracking-wide inline-block",
                            isUpcoming
                                ? "bg-[#1B3C53] text-white"
                                : "bg-[#64748B] text-white"
                        )}>
                            {isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                    </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <p className="text-sm font-medium text-gray-500">
                            {new Date(event.event_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <h3 className="text-2xl font-bold font-serif text-[#1B3C53] mb-3 group-hover:text-[#234C6A] transition-colors line-clamp-2">
                        {event.title}
                    </h3>

                    <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3 leading-relaxed">
                        {event.short_description}
                    </p>

                    <div className="mt-auto">
                        <span
                            className="inline-flex items-center text-sm font-bold text-[#1B3C53] hover:text-[#234C6A] transition-colors group/link"
                        >
                            Read details
                            <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
