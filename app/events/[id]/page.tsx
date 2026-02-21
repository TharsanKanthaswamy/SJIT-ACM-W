import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function EventDetail({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!event) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-[#456882] font-bold hover:underline mb-8 inline-block">
                    &larr; Back to Events
                </Link>

                {event.images && event.images.length > 0 && (
                    <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-sm mb-12">
                        <Image src={event.images[0]} alt={event.title} fill className="object-cover" />
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B3C53] mb-6">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Date</p>
                            <p className="text-[#1B3C53] font-semibold">
                                {new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        {event.registrationOpen && (
                            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                                <p className="text-xs text-green-600 uppercase tracking-wider font-bold mb-1">Status</p>
                                <p className="text-green-800 font-semibold">Registration Open</p>
                            </div>
                        )}

                        {event.registrationDate && (
                            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                <p className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-1">Deadline</p>
                                <p className="text-blue-800 font-semibold">
                                    {new Date(event.registrationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="prose prose-lg text-gray-600 max-w-none mb-12">
                        <p className="text-xl font-semibold text-[#1B3C53] leading-relaxed mb-6">
                            {event.shortDescription}
                        </p>
                        <div className="whitespace-pre-wrap">
                            {event.fullSummary || "Check back later for more details about this event."}
                        </div>
                    </div>

                    {event.images && event.images.length > 1 && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#1B3C53] mb-6">Event Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {event.images.slice(1).map((imgUrl: string, idx: number) => (
                                    <div key={idx} className="relative h-40 md:h-48 rounded-xl overflow-hidden shadow-sm">
                                        <Image src={imgUrl} alt={`${event.title} gallery image ${idx + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
