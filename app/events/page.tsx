import { createClient } from '@/lib/supabase/server'
import { ScrollReveal } from '@/components/ScrollReveal'
import { EventsFilter } from './EventsFilter'
import Link from 'next/link'

export const revalidate = 60

export default async function EventsPage() {
    const supabase = await createClient()

    const { data: events } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('event_date', { ascending: true })

    return (
        <div className="min-h-screen bg-[#F8F7F6]">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-white tracking-tight mb-6">
                        Events
                    </h1>
                    <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto">
                        Workshops, tech talks, hackathons, and networking sessions — discover what&apos;s happening.
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="h-1 w-12 rounded-full bg-white/30" />
                        <div className="h-1.5 w-16 rounded-full bg-white" />
                        <div className="h-1 w-12 rounded-full bg-white/30" />
                    </div>
                </div>
            </section>

            {/* Events Grid with Filter */}
            <ScrollReveal className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <EventsFilter events={events || []} />
                </div>
            </ScrollReveal>

            {/* Back to Home */}
            <div className="max-w-7xl mx-auto px-6 pb-16 text-center">
                <Link href="/" className="text-[#456882] font-bold hover:text-[#1B3C53] transition-colors">
                    &larr; Back to Home
                </Link>
            </div>
        </div>
    )
}
