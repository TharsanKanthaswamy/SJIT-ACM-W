import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Globe2, BookOpen, Briefcase, Mail, Users, Sparkles, ArrowRight, GraduationCap, Trophy, Lightbulb, Network, Rocket, Gift, Calendar, Mic2, Code2 } from 'lucide-react'

export const metadata = {
    title: 'ACM Benefits | ADS SJIT ACM-W',
    description: 'Discover the benefits of joining ACM as a student — global networking, learning resources, career growth, and exclusive member privileges.',
}

export default function ACMBenefitsPage() {
    return (
        <div className="min-h-screen bg-[#F8F7F6]">
            {/* ═══════════════════════════════════════════════════
                1. HERO SECTION
            ═══════════════════════════════════════════════════ */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1B3C53] to-[#0F2744]" />

                {/* Subtle grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-blue-300 text-sm font-medium mb-8">
                        <Globe2 size={16} />
                        <span>190 out of 195 countries worldwide</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-serif text-white tracking-tight leading-[1.05] mb-8">
                        Become Part of the{' '}
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                            Global ACM Community
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100/80 font-light max-w-3xl mx-auto leading-relaxed mb-6">
                        Join a worldwide network of <strong className="text-white font-semibold">100,000+ students and professionals</strong> passionate about computing, innovation, and technology.
                    </p>

                    <p className="text-lg text-blue-200/60 font-light max-w-2xl mx-auto mb-12">
                        ACM operates in <strong className="text-cyan-300 font-medium">190 out of 195 countries</strong> across the globe, making it one of the most influential computing communities in the world.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=ACMMSDEPT&pay=DD"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full sm:w-auto px-8 py-4 bg-white text-[#0A1628] rounded-2xl text-lg font-bold shadow-soft-xl hover:shadow-soft-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Join ACM Today
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#why-join"
                            className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-2xl text-lg font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            Explore Membership Benefits
                        </a>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F7F6] to-transparent" />
            </section>

            {/* ═══════════════════════════════════════════════════
                2. WHY JOIN ACM
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal id="why-join" className="py-24 bg-[#F8F7F6]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3C53]/10 text-[#1B3C53] text-sm font-bold tracking-wide mb-6">
                        <Sparkles size={16} />
                        STUDENT MEMBERSHIP
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                        Why Join ACM as a Student?
                    </h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
                        Joining ACM opens doors to <strong className="text-[#1B3C53] font-semibold">learning opportunities, professional networking, and career growth</strong> that help you stay ahead in the world of technology.
                    </p>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                3. GLOBAL COMMUNITY & NETWORKING
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide mb-6">
                                <Network size={16} />
                                GLOBAL COMMUNITY
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                                Global Community &amp; Networking
                            </h2>
                            <p className="text-xl text-gray-500 font-light leading-relaxed mb-10">
                                Connect with a powerful international community that spans across the globe.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Users,
                                        title: 'Worldwide Collaboration',
                                        desc: 'Collaborate with students, researchers, and professionals worldwide.',
                                    },
                                    {
                                        icon: Globe2,
                                        title: 'Chapters & Communities',
                                        desc: 'Participate in ACM chapters, communities, and technical groups.',
                                    },
                                    {
                                        icon: Lightbulb,
                                        title: 'Stay Updated',
                                        desc: 'Exchange ideas and stay updated with the latest developments in computing.',
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#F8F7F6] rounded-xl flex items-center justify-center group-hover:bg-[#1B3C53] transition-colors duration-300">
                                            <item.icon size={22} className="text-[#1B3C53] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#1B3C53] mb-1">{item.title}</h3>
                                            <p className="text-gray-500 font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Stats card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C53] to-[#0F2744] rounded-[2rem] rotate-2 opacity-20" />
                            <div className="relative bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#0F2744] rounded-[2rem] p-10 md:p-14 text-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <p className="text-7xl md:text-8xl font-extrabold font-serif text-white mb-3">190</p>
                                        <p className="text-blue-200 text-lg font-light">Countries worldwide</p>
                                    </div>
                                    <div className="h-px bg-white/10 w-1/2 mx-auto" />
                                    <div>
                                        <p className="text-6xl md:text-7xl font-extrabold font-serif text-white mb-3">100K+</p>
                                        <p className="text-blue-200 text-lg font-light">Students & professionals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                4. LEARNING OPPORTUNITIES
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal className="py-24 bg-[#F8F7F6]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide mb-6">
                            <BookOpen size={16} />
                            LEARNING
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                            Learning Opportunities
                        </h2>
                        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                            Gain access to world-class learning resources curated for the next generation of tech leaders.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: GraduationCap,
                                title: 'Online Learning Resources',
                                desc: 'Complimentary access to online learning resources to sharpen your skills.',
                                gradient: 'from-emerald-500 to-teal-600',
                            },
                            {
                                icon: Rocket,
                                title: 'Cutting-Edge Research',
                                desc: 'Exposure to cutting-edge research and innovations shaping the future of computing.',
                                gradient: 'from-blue-500 to-indigo-600',
                            },
                            {
                                icon: Mic2,
                                title: 'Workshops & Seminars',
                                desc: 'Opportunities to attend technical talks, workshops, and seminars led by industry experts.',
                                gradient: 'from-violet-500 to-purple-600',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-gray-100/50 hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={26} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-[#1B3C53] mb-3">{item.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                5. CAREER GROWTH
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Feature card */}
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-[2rem] rotate-1" />
                                <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-soft-xl p-8 md:p-10 space-y-6">
                                    {[
                                        { number: '170+', label: 'International ACM conferences, symposiums, and workshops annually', highlight: 'Discounted registration' },
                                        { number: '24/7', label: 'Career & Job Center', highlight: 'ACM Career Center Access' },
                                        { number: '∞', label: 'Industry insights and job opportunities', highlight: 'Career newsletters' },
                                    ].map((item, idx) => (
                                        <div key={idx} className={`flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 hover:bg-[#F8F7F6] ${idx < 2 ? 'border-b border-gray-100 pb-6' : ''}`}>
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-2xl flex items-center justify-center">
                                                <span className="text-white font-extrabold font-serif text-lg">{item.number}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1B3C53] tracking-wide uppercase mb-1">{item.highlight}</p>
                                                <p className="text-gray-500 font-light">{item.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Text */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold tracking-wide mb-6">
                                <Briefcase size={16} />
                                CAREER GROWTH
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                                Accelerate Your Professional Journey
                            </h2>
                            <p className="text-xl text-gray-500 font-light leading-relaxed">
                                ACM membership gives you a competitive edge with access to exclusive career resources, global conferences, and professional development tools that set you apart.
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                6. EXCLUSIVE MEMBER PRIVILEGES
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal className="py-24 bg-gradient-to-b from-[#F8F7F6] to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-bold tracking-wide mb-6">
                            <Trophy size={16} />
                            MEMBER PERKS
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                            Exclusive Member Privileges
                        </h2>
                        <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">
                            As an ACM member, you receive additional benefits designed to support your academic and professional growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Mail,
                                title: 'ACM Email Forwarding',
                                desc: 'Free acm.org email forwarding address with high-quality spam filtering — a professional identity for your career.',
                                color: 'bg-blue-500',
                            },
                            {
                                icon: Users,
                                title: 'MentorNet Programs',
                                desc: 'Access to MentorNet mentoring programs connecting students with professionals in engineering and science.',
                                color: 'bg-emerald-500',
                            },
                            {
                                icon: Gift,
                                title: 'Exclusive Discounts',
                                desc: 'Exclusive discounts on software, products, and services through ACM partnerships with leading tech companies.',
                                color: 'bg-violet-500',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-gray-100/50 hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Decorative accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={26} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-[#1B3C53] mb-3">{item.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                7. STAY CONNECTED
            ═══════════════════════════════════════════════════ */}
            <ScrollReveal className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-bold tracking-wide mb-6">
                            <Calendar size={16} />
                            STAY CONNECTED
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#1B3C53] tracking-tight mb-6">
                            Never Miss an Update
                        </h2>
                        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                            Follow us to stay updated about everything happening in the ACM community.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: Calendar, title: 'Events & Workshops', desc: 'Upcoming events, workshops, and competitions' },
                            { icon: Code2, title: 'Tech Talks & Hackathons', desc: 'Technical talks, coding challenges, and hackathons' },
                            { icon: Mic2, title: 'Chapter Activities', desc: 'ACM chapter activities and announcements' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-[#1B3C53]/20 hover:bg-[#F8F7F6] transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-[#F8F7F6] group-hover:bg-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                    <item.icon size={22} className="text-[#1B3C53] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-[#1B3C53] mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* ═══════════════════════════════════════════════════
                8. FINAL CTA BANNER
            ═══════════════════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1B3C53] to-[#0F2744]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold font-serif text-white tracking-tight mb-6">
                        Ready to Begin Your{' '}
                        <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            ACM Journey?
                        </span>
                    </h2>
                    <p className="text-xl text-blue-100/80 font-light max-w-2xl mx-auto mb-10">
                        Join the global ACM community and unlock a world of opportunities in computing, research, and professional development.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=ACMMSDEPT&pay=DD"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full sm:w-auto px-10 py-5 bg-white text-[#0A1628] rounded-2xl text-lg font-bold shadow-soft-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Become an ACM Member
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white rounded-2xl text-lg font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
