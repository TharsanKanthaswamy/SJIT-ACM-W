'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EventCard } from '@/components/EventCard'

type FilterType = 'all' | 'upcoming' | 'past'

interface Event {
    id: string
    title: string
    event_date: string
    short_description: string
    images?: string[]
}

export function EventsFilter({ events }: { events: Event[] }) {
    const [filter, setFilter] = useState<FilterType>('all')

    const now = new Date()

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true
        if (filter === 'upcoming') return new Date(event.event_date) > now
        return new Date(event.event_date) <= now
    })

    const tabs: { label: string; value: FilterType }[] = [
        { label: 'All Events', value: 'all' },
        { label: 'Upcoming', value: 'upcoming' },
    ]

    return (
        <div>
            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-12">
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${filter === tab.value
                            ? 'bg-[#1B3C53] text-white shadow-soft-lg'
                            : 'bg-white text-[#456882] border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                ))}
            </motion.div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-lg">No {filter !== 'all' ? filter : ''} events found.</p>
                </div>
            )}
        </div>
    )
}
