import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ImageGallery } from '@/components/ImageGallery'

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
                <Link href="/events" className="text-[#456882] font-bold hover:underline mb-8 inline-block">
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
                                {new Date(event.event_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        {event.registration_open && (
                            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                                <p className="text-xs text-green-600 uppercase tracking-wider font-bold mb-1">Status</p>
                                <p className="text-green-800 font-semibold">Registration Open</p>
                            </div>
                        )}

                        {event.registration_date && (
                            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                <p className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-1">Deadline</p>
                                <p className="text-blue-800 font-semibold">
                                    {new Date(event.registration_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="prose prose-lg prose-blue max-w-none mb-16">
                        <p className="text-xl font-semibold text-[#456882] leading-relaxed mb-8 italic border-l-4 border-[#1B3C53] pl-4">
                            {event.short_description}
                        </p>

                        <div className="mt-8">
                            {event.full_summary ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {event.full_summary}
                                </ReactMarkdown>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-gray-500">The detailed event report will be published here soon.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-[#1B3C53] mb-6 border-b pb-2">Event Gallery</h3>
                        {event.images && event.images.length > 0 ? (
                            <ImageGallery images={event.images} title={event.title} />
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-gray-500 italic">No images available for this event yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
