'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EventCardProps {
    event: {
        id: string;
        title: string;
        eventDate: string;
        shortDescription: string;
        images?: string[];
    };
    index: number;
}

export function EventCard({ event, index }: EventCardProps) {
    const isUpcoming = new Date(event.eventDate) > new Date();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {event.images && event.images[0] ? (
                    <Image
                        src={event.images[0]}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D2C1B6]">
                        {/* Fallback pattern */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={cn(
                        "px-3 py-1 text-xs font-bold rounded-full shadow-sm backdrop-blur-md",
                        isUpcoming
                            ? "bg-[#1B3C53]/90 text-white"
                            : "bg-white/90 text-[#1B3C53]"
                    )}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <p className="text-sm font-bold text-[#D2C1B6] uppercase tracking-wider mb-2">
                    {new Date(event.eventDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-xl font-bold font-serif text-[#1B3C53] mb-3 group-hover:text-[#234C6A] transition-colors line-clamp-2">
                    {event.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-3 font-light">
                    {event.shortDescription}
                </p>
                <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center text-[#1B3C53] font-bold hover:text-[#234C6A] transition-colors"
                >
                    Read details
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </motion.div>
    )
}
