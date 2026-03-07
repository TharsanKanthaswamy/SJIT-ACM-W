'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface EventsHeroSlideshowProps {
    images: string[]
}

export function EventsHeroSlideshow({ images }: EventsHeroSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % images.length)
    }, [images.length])

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
    }, [images.length])

    useEffect(() => {
        if (images.length <= 1 || isPaused) return
        const interval = setInterval(goNext, 5000)
        return () => clearInterval(interval)
    }, [images.length, isPaused, goNext])

    if (images.length === 0) return null

    return (
        <div
            className="relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden mt-24"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background slides */}
            {images.map((src, i) => (
                <div
                    key={src + i}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === currentIndex ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt={`Event cover ${i + 1}`}
                        fill
                        className="object-cover object-center"
                        priority={i === 0}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B3C53]/70 via-black/40 to-[#1B3C53]/70 z-[1]" />

            {/* Content overlay */}
            <div className="relative z-[5] flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] px-6 pt-28 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-white tracking-tight mb-6 drop-shadow-lg">
                    Events
                </h1>
                <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto drop-shadow-md">
                    Workshops, tech talks, hackathons, and networking sessions — discover what&apos;s happening.
                </p>
            </div>

            {/* Left/Right navigation buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[10] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 group"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 group"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10]">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/40 w-2 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
