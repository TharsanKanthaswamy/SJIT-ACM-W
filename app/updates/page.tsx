import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function UpdatesPage() {
    const supabase = await createClient()

    const { data: updates } = await supabase
        .from('updates')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-[#456882] font-bold hover:underline mb-8 inline-block">
                    &larr; Back to Home
                </Link>
                <h1 className="text-5xl font-extrabold text-[#1B3C53] mb-12 text-center">Latest Updates</h1>

                <div className="space-y-12">
                    {updates?.map((update) => (
                        <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {update.imageUrl && (
                                <div className="relative h-64 md:h-96 w-full">
                                    <Image src={update.imageUrl} alt={update.title} fill className="object-cover" />
                                </div>
                            )}
                            <div className="p-8 md:p-12">
                                <p className="text-[#456882] font-bold mb-4 uppercase tracking-wider text-sm">
                                    {new Date(update.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <h2 className="text-3xl font-bold text-[#1B3C53] mb-6">{update.title}</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p className="font-semibold text-xl mb-4 text-[#1B3C53]">{update.description}</p>
                                    <p className="whitespace-pre-wrap">{update.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!updates || updates.length === 0) && (
                        <p className="text-center text-gray-500 py-12">No updates available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
