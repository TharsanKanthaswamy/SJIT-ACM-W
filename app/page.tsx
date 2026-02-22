import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { SectionHeading } from '@/components/SectionHeading'
import { EventCard } from '@/components/EventCard'
import { TeamMemberCard } from '@/components/TeamMemberCard'
import { ContactForm } from '@/components/ContactForm'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Users, Code2, Globe2, Lightbulb } from 'lucide-react'

export const revalidate = 60; // statically cache this page but refresh every 60s

export default async function Home() {
  const supabase = await createClient()

  // Fetch Team
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('order_position', { ascending: true })

  // Fetch Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('event_date', { ascending: true })

  // Limit Team to specific roles for the homepage suspense
  const officeBearerRoles = ['faculty sponsor', 'chair', 'vice-chair', 'secretary', 'membership chair', 'treasurer'];
  const displayedTeam = teamMembers?.filter(member =>
    officeBearerRoles.some(role => member.position.toLowerCase().includes(role))
  ).slice(0, 6) || [];

  // Limit Events to 3 for the homepage suspense
  const displayedEvents = events?.slice(0, 3) || [];

  return (
    <div className="bg-background">

      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#1B3C53] via-[#2D5A7B] to-[#4A728E]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {/* Decorative circle matching the screenshot */}
        <div className="absolute top-24 right-4 md:top-32 md:right-32 w-28 h-28 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-soft-xl overflow-hidden p-3 md:p-4 hover:scale-105 transition-transform duration-500">
          <Image
            src="https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/ACM-W_logo.webp"
            alt="ACM-W Logo"
            width={120}
            height={120}
            className="object-contain w-full h-full"
            priority
          />
        </div>
        <div className="absolute top-24 left-4 md:top-32 md:left-32 w-28 h-28 md:w-40 md:h-40 bg-[#1B3C53]/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 shadow-soft-xl overflow-hidden p-3 md:p-4 hover:scale-105 transition-transform duration-500">
          <Image
            src="https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/SJIT_logo.webp"
            alt="SJIT Logo"
            width={120}
            height={120}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="relative z-30 max-w-5xl mx-auto space-y-6 pt-32 pb-48">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extrabold font-serif text-[#142C3D] opacity-40 tracking-tight leading-none absolute -top-12 md:-top-24 left-1/2 -translate-x-1/2 w-full select-none whitespace-nowrap -z-10">
            ACM-W
          </h1>

          <h2 className="text-5xl md:text-7xl lg:text-9xl font-extrabold font-serif text-white tracking-tight leading-none relative mt-16 md:mt-24">
            ACM-W Student Chapter
          </h2>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-12 mb-4 tracking-wide">
            Artificial Intelligence and Data Science
          </h3>

          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium pb-8 border-b border-white/20 inline-block px-12">
            St. Joseph&apos;s Institute of Technology
          </p>

          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto font-light pt-8 leading-relaxed">
            Empowering women in computing, fostering leadership, and celebrating diversity in technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16">
            <Link href="/events" className="w-full sm:w-auto px-10 py-5 bg-white text-[#1B3C53] rounded-[2rem] text-lg font-bold shadow-soft-xl hover:shadow-soft-2xl hover:scale-105 transition-all duration-300">
              View Upcoming Events
            </Link>
            <Link href="#about" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white text-white rounded-[2rem] text-lg font-bold hover:bg-white/10 transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats Grid */}
      <ScrollReveal className="py-8 bg-transparent relative -mt-24 md:-mt-32 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[2rem] shadow-soft-xl border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
              <div className="px-2">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">2025</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Founded</p>
              </div>
              <div className="px-2">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">20+</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Members</p>
              </div>
              <div className="px-2 hidden md:block">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">6+</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Events</p>
              </div>
              <div className="px-2 hidden md:block">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">13</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Office Bearers</p>
              </div>
            </div>
            {/* Mobile missing elements layout */}
            <div className="grid grid-cols-2 gap-8 text-center divide-x divide-gray-100 mt-8 pt-8 border-t border-gray-100 md:hidden">
              <div className="px-2">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">6+</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Events</p>
              </div>
              <div className="px-2">
                <h3 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] mb-3">13</h3>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Office Bearers</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Mission & core values */}
      <ScrollReveal id="about" className="py-24 bg-[#F8F7F6]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Our Mission"
            subtitle="We support, celebrate, and advocate for the full engagement of women in all aspects of the computing field."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Value 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100/50 hover:shadow-soft-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#F8F7F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1B3C53] group-hover:text-white transition-colors duration-300">
                <Users size={28} className="text-[#1B3C53] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1B3C53] mb-4">Community</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Building a supportive network of women in technology to foster collaboration and growth.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100/50 hover:shadow-soft-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#F8F7F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1B3C53] group-hover:text-white transition-colors duration-300">
                <Code2 size={28} className="text-[#1B3C53] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1B3C53] mb-4">Learning</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Providing workshops, technical sessions, and resources to enhance technical skills.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100/50 hover:shadow-soft-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#F8F7F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1B3C53] group-hover:text-white transition-colors duration-300">
                <Lightbulb size={28} className="text-[#1B3C53] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1B3C53] mb-4">Excellence</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Celebrating achievements and inspiring members to reach their full potential in computing.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Legacy Section */}
      <ScrollReveal className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-soft-xl group">
              <div className="absolute inset-0 bg-[#D2C1B6] flex items-center justify-center">
                <Globe2 size={80} className="text-white/50" />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] tracking-tight">
                A Legacy of Innovation
              </h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                The Department of Artificial Intelligence and Data Science at St. Joseph&apos;s Institute of Technology has always been at the forefront of technical education. With the establishment of the ACM-W Student Chapter, we are taking a significant step towards bridging the gender gap in technology.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Events Section */}
      <ScrollReveal id="events" className="py-24 bg-[#F8F7F6] relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold font-serif text-[#1B3C53] mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              Join us for workshops, tech talks, and networking sessions.
            </p>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {displayedEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
            {displayedEvents.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No events published yet.
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/events" className="inline-flex items-center px-8 py-4 bg-[#1B3C53] text-white rounded-full font-bold hover:bg-[#234C6A] transition-colors">
              View All Events →
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Team Section */}
      <ScrollReveal id="team" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold font-serif text-[#1B3C53] mb-6">
              Our Team
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              The dedicated students driving the ACM-W mission forward.
            </p>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
            {displayedTeam.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/team" className="inline-flex items-center px-8 py-4 bg-[#1B3C53] text-white rounded-full font-bold hover:bg-[#234C6A] transition-colors">
              View Full Team →
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 6. Contact Section */}
      <ScrollReveal id="contact" className="py-24 bg-[#1B3C53] relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold font-serif leading-tight">
              Let&apos;s build <br /> something great <br /> <span className="text-[#D2C1B6]">together.</span>
            </h2>
            <p className="text-blue-100 text-lg font-light max-w-md">
              Have questions about joining, partnering, or speaking at one of our events? Reach out to us.
            </p>
          </div>

          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="bg-[#151D23] text-gray-400 py-12 text-center">
        <p>© {new Date().getFullYear()} St. Joseph&apos;s Institute of Technology ACM-W Student Chapter. All rights reserved.</p>
      </footer>
    </div>
  )
}
