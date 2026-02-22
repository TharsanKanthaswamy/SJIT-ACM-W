import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'

export const revalidate = 60

export default async function UpdatesPage() {
    const supabase = await createClient()

    const { data: updates } = await supabase
        .from('updates')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false })

    return (
        <div className="min-h-screen bg-[#F8F7F6]">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-white tracking-tight mb-6">
                        Latest Updates
                    </h1>
                    <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto">
                        Stay informed about announcements, achievements, and news from the chapter.
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="h-1 w-12 rounded-full bg-white/30" />
                        <div className="h-1.5 w-16 rounded-full bg-white" />
                        <div className="h-1 w-12 rounded-full bg-white/30" />
                    </div>
                </div>
            </section>

            {/* Updates Grid */}
            <ScrollReveal className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {updates?.map((update) => (
                            <div
                                key={update.id}
                                className="group bg-white rounded-2xl shadow-soft hover:shadow-soft-xl transition-all duration-300 border border-transparent hover:border-blue-100 overflow-hidden flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative h-48 w-full overflow-hidden bg-[#E2E8F0]">
                                    {update.imageUrl ? (
                                        <Image
                                            src={update.imageUrl}
                                            alt={update.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Published Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm tracking-wide bg-[#1B3C53] text-white">
                                            Update
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-500">
                                            {new Date(update.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-bold font-serif text-[#1B3C53] mb-3 group-hover:text-[#234C6A] transition-colors line-clamp-2">
                                        {update.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3 leading-relaxed">
                                        {update.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href={`/updates/${update.id}`}
                                            className="inline-flex items-center text-sm font-bold text-[#1B3C53] hover:text-[#234C6A] transition-colors group/link"
                                        >
                                            Read More
                                            <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!updates || updates.length === 0) && (
                        <p className="text-center text-gray-500 py-16 text-lg">No updates available at the moment.</p>
                    )}
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
