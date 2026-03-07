import { createClient } from '@/lib/supabase/server'
import { ScrollReveal } from '@/components/ScrollReveal'
import { TeamMemberCard } from '@/components/TeamMemberCard'
import { TeamHeroSlideshow } from '@/components/TeamHeroSlideshow'
import { SectionHeading } from '@/components/SectionHeading'
import Link from 'next/link'

export const revalidate = 60

export default async function TeamPage() {
    const supabase = await createClient()

    const { data: teamMembers } = await supabase
        .from('team_members')
        .select('*')
        .order('order_position', { ascending: true })

    const faculty = teamMembers?.filter(m => m.category === 'faculty') || []
    const students = teamMembers?.filter(m => m.category !== 'faculty') || []

    return (
        <div className="min-h-screen bg-[#F8F7F6]">
            {/* Hero Banner with Team Slideshow */}
            <TeamHeroSlideshow members={teamMembers || []} />

            {/* Faculty Leadership */}
            {faculty.length > 0 && (
                <ScrollReveal className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionHeading
                            title="Faculty Leadership"
                            subtitle="Our esteemed faculty advisors guiding the chapter."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
                            {faculty.map((member, index) => (
                                <TeamMemberCard key={member.id} member={member} index={index} />
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {/* Student Office Bearers */}
            <ScrollReveal className="py-16 md:py-24 bg-[#F8F7F6]">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeading
                        title="Student Office Bearers"
                        subtitle="The talented students leading initiatives, events, and projects."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
                        {students.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                    {students.length === 0 && (
                        <p className="text-center text-gray-500 py-12">No student office bearers listed yet.</p>
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
