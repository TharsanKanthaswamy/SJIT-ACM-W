import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function UpdateDetail({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: update } = await supabase
        .from('updates')
        .select('*')
        .eq('id', params.id)
        .eq('published', true)
        .single()

    if (!update) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/updates" className="text-[#456882] font-bold hover:underline mb-8 inline-block">
                    &larr; Back to Updates
                </Link>

                {update.imageUrl && (
                    <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-sm mb-12">
                        <Image src={update.imageUrl} alt={update.title} fill className="object-cover" />
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <p className="text-[#456882] font-bold mb-4 uppercase tracking-wider text-sm">
                        {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B3C53] mb-6">
                        {update.title}
                    </h1>

                    <div className="prose prose-lg text-gray-600 max-w-none">
                        {update.description && (
                            <p className="font-semibold text-xl mb-6 text-[#1B3C53]">{update.description}</p>
                        )}
                        <div className="whitespace-pre-wrap">{update.content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
