import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { SectionHeading } from '@/components/SectionHeading'
import { EventCard } from '@/components/EventCard'
import { TeamMemberCard } from '@/components/TeamMemberCard'
import { ContactForm } from '@/components/ContactForm'
import { Users, Code2, Globe2, Lightbulb } from 'lucide-react'

export const revalidate = 60; // statically cache this page but refresh every 60s

export default async function Home() {
  const supabase = await createClient()

  // Fetch Team
  const { data: teamMembers } = await supabase
    .from('teamMembers')
    .select('*')
    .order('orderPosition', { ascending: true })

  // Fetch Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('eventDate', { ascending: true })

  return (
    <div className="bg-background">

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          {/* Dual Logos (Simulated with placeholders or icons, since actual static logos aren't provided yet) */}
          <div className="flex justify-center items-center gap-8 md:gap-16 mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-soft-xl">
              <span className="text-white font-bold font-serif text-xl">SJIT</span>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-soft-xl">
              <span className="text-[#D2C1B6] font-bold font-serif text-xl">ACM-W</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Empowering Women <br />
            <span className="text-[#D2C1B6]">in Computing</span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            St. Joseph&apos;s Institute of Technology ACM-W Student Chapter
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/updates" className="w-full sm:w-auto px-8 py-4 bg-[#D2C1B6] text-[#1B3C53] rounded-full font-bold shadow-soft-lg hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300">
              View Latest Updates
            </Link>
            <Link href="#events" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#D2C1B6] text-[#D2C1B6] rounded-full font-bold hover:bg-[#D2C1B6]/10 transition-all duration-300">
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats Grid */}
      <section className="py-20 md:py-24 bg-white relative -mt-10 rounded-t-[3rem] shadow-soft-xl z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { icon: Users, label: 'Active Members', value: '150+' },
              { icon: Code2, label: 'Hackathons', value: '12' },
              { icon: Globe2, label: 'Tech Talks', value: '25+' },
              { icon: Lightbulb, label: 'Projects', value: '40+' },
            ].map((stat, i) => (
              <div key={i} className="group p-6">
                <div className="mx-auto w-16 h-16 bg-[#1B3C53]/5 text-[#1B3C53] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1B3C53] group-hover:text-white transition-colors duration-500 shadow-soft">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-extrabold font-serif text-[#1B3C53] mb-2">{stat.value}</h3>
                <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & History */}
      <section className="py-24 bg-[#F8F7F6]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Our Mission"
            subtitle="We support, celebrate, and advocate internationally for the full engagement of women in all aspects of the computing field."
          />

          <div className="grid md:grid-cols-2 gap-16 items-center mt-20">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-soft-xl group">
              {/* Note: In a real app, use a real Image. Here we use a stylized placeholder */}
              <div className="absolute inset-0 bg-[#1B3C53] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <Globe2 size={120} className="text-[#234C6A] opacity-50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-bold font-serif mb-2">Since 2023</h3>
                <p className="font-light text-blue-50">Building a stronger community for women in technology.</p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold font-serif text-[#1B3C53]">Learn, Grow, Network.</h3>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                The ACM-W Student Chapter provides a platform for students to explore their passion for technology. We organize hands-on technical workshops, insightful guest lectures from industry leaders, and collaborative coding events.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Our goal is to bridge the gender gap in technology by providing mentorship, resources, and leadership opportunities to our members, ensuring they are well-equipped for their future careers in computing.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <Link href="/updates" className="text-[#1B3C53] font-bold hover:text-[#234C6A] flex items-center gap-2 group">
                  See our journey <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Events Section */}
      <section id="events" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Events & Workshops"
            subtitle="Join us for technical sessions, networking events, and community gatherings."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {events?.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
            {(!events || events.length === 0) && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No events published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section id="team" className="py-24 bg-[#F8F7F6]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Meet Our Leaders"
            subtitle="The dedicated students driving the ACM-W mission forward."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 mt-16">
            {teamMembers?.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="py-24 bg-[#1B3C53] relative overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D2C1B6]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

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
      </section>

      {/* Footer */}
      <footer className="bg-[#151D23] text-gray-400 py-12 text-center">
        <p>© {new Date().getFullYear()} St. Joseph&apos;s Institute of Technology ACM-W Student Chapter. All rights reserved.</p>
      </footer>
    </div>
  )
}
