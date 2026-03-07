'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Member {
    id: string
    name: string
    position: string
    image_url?: string | null
}

interface TeamHeroSlideshowProps {
    members: Member[]
}

const HOD_SLIDE = {
    id: 'hod-priscilla',
    name: 'Dr. R. Priscilla',
    position: 'Head of Department — AI & Data Science',
    image_url: 'https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/HOD.webp?v=1',
}

export function TeamHeroSlideshow({ members }: TeamHeroSlideshowProps) {
    const [currentPage, setCurrentPage] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Only show members with images
    const membersWithImages = members.filter(m => m.image_url)

    // Build slides: first slide is HOD solo, then groups of 3
    type Slide = { members: Member[]; isHOD: boolean }
    const slides: Slide[] = []

    // First slide: HOD alone
    slides.push({ members: [HOD_SLIDE], isHOD: true })

    // Remaining slides: groups of 3
    for (let i = 0; i < membersWithImages.length; i += 3) {
        slides.push({ members: membersWithImages.slice(i, i + 3), isHOD: false })
    }

    const totalPages = slides.length

    const goNext = useCallback(() => {
        setCurrentPage(prev => (prev + 1) % totalPages)
    }, [totalPages])

    const goPrev = useCallback(() => {
        setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
    }, [totalPages])

    useEffect(() => {
        if (totalPages <= 1 || isPaused) return
        const interval = setInterval(goNext, 5000)
        return () => clearInterval(interval)
    }, [totalPages, isPaused, goNext])

    if (slides.length === 0) return null

    return (
        <div
            className="relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden mt-24"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-[5] flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] px-6 pt-24 pb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-white tracking-tight mb-4 drop-shadow-lg">
                    Our Team
                </h1>
                <p className="text-lg text-blue-100 font-light max-w-2xl mx-auto mb-10">
                    Meet the dedicated faculty and students driving the ACM-W mission forward.
                </p>

                {/* Slides area */}
                <div className="relative w-full max-w-4xl mx-auto h-56 md:h-72">
                    {slides.map((slide, pageIndex) => (
                        <div
                            key={pageIndex}
                            className="absolute inset-0 flex items-stretch justify-center gap-4 md:gap-6 transition-all duration-700 ease-in-out px-4"
                            style={{
                                opacity: pageIndex === currentPage ? 1 : 0,
                                transform: pageIndex === currentPage
                                    ? 'translateX(0)'
                                    : pageIndex < currentPage
                                        ? 'translateX(-80px)'
                                        : 'translateX(80px)',
                                pointerEvents: pageIndex === currentPage ? 'auto' : 'none',
                            }}
                        >
                            {slide.isHOD ? (
                                /* HOD special solo slide — centered, larger card */
                                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={slide.members[0].image_url!}
                                        alt={slide.members[0].name}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                                        <p className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-md">
                                            {slide.members[0].name}
                                        </p>
                                        <p className="text-blue-200 text-sm md:text-base font-light mt-1">
                                            {slide.members[0].position}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* Regular 3-member slide */
                                slide.members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="relative flex-1 max-w-[280px] rounded-2xl overflow-hidden shadow-xl group"
                                    >
                                        <Image
                                            src={member.image_url!}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                            <p className="text-white font-bold text-base md:text-lg leading-tight drop-shadow-md">
                                                {member.name}
                                            </p>
                                            <p className="text-blue-200 text-xs md:text-sm font-light mt-1">
                                                {member.position}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Left/Right navigation buttons */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[10] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 group"
                        aria-label="Previous group"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 group"
                        aria-label="Next group"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {totalPages > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10]">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentPage
                                ? 'bg-white w-8'
                                : 'bg-white/40 w-2 hover:bg-white/60'
                                }`}
                            aria-label={`Go to group ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
