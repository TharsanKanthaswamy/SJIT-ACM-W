'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const nextImage = useCallback(() => {
        if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % images.length);
    }, [selectedIndex, images.length]);

    const prevImage = useCallback(() => {
        if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }, [selectedIndex, images.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, nextImage, prevImage]);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((imgUrl, idx) => (
                    <div
                        key={idx}
                        className="relative h-40 md:h-48 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={imgUrl}
                            alt={`${title} gallery image ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 font-medium tracking-wide">View</span>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            aria-label="Close lightbox"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative w-full max-w-6xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>

                            {/* Previous Button */}
                            {images.length > 1 && (
                                <button
                                    className="absolute left-2 md:-left-12 z-50 text-white/50 hover:text-white transition-all p-3 bg-black/50 hover:bg-black/80 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                            )}

                            {/* Main Image */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.div
                                    key={selectedIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="relative w-full h-[80vh]"
                                >
                                    <Image
                                        src={images[selectedIndex]}
                                        alt={`${title} enlarged image ${selectedIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Next Button */}
                            {images.length > 1 && (
                                <button
                                    className="absolute right-2 md:-right-12 z-50 text-white/50 hover:text-white transition-all p-3 bg-black/50 hover:bg-black/80 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            )}
                        </div>

                        {/* Slide Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-medium tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
