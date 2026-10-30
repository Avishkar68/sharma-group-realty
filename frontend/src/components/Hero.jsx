import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Curated architectural residential estate photograph (high-resolution Unsplash asset)
  const architecturalImageUrl =
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'

  return (
    <section className="w-full pt-12 pb-10 sm:pt-16 sm:pb-14 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xs sm:text-[13px] font-semibold tracking-[0.28em] text-[#9b7a3e] uppercase mb-4 sm:mb-5"
        >
          A New Digital Address
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] tracking-tight leading-[1.12] mb-6 sm:mb-7"
        >
          Something Exceptional Is&nbsp;Taking&nbsp;Shape.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-[#57534e] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          We&apos;re building a new online experience for Sharma Group Realty.
          A place to discover our vision, our properties, and the future we&apos;re creating.
        </motion.p>

        {/* Architectural Image with Graceful Architectural Fallback */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-lg sm:rounded-xl overflow-hidden border border-[#e7e2da] shadow-[0_8px_30px_rgba(0,0,0,0.04)] bg-[#f5f2eb]"
        >
          {/* Graceful Fallback Background: Architectural grid & minimal elevation artwork */}
          <div
            className={`absolute inset-0 architectural-grid-pattern bg-[#f5f2eb] flex flex-col items-center justify-center p-8 transition-opacity duration-700 ${
              imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden={imageLoaded && !imageError ? 'true' : 'false'}
          >
            {/* Elegant architectural geometry wireframe */}
            <div className="w-24 h-24 mb-4 rounded-full border border-[#b89758]/30 flex items-center justify-center bg-[#faf8f5]/80">
              <svg
                className="w-12 h-12 stroke-[#9b7a3e]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="3" width="16" height="18" rx="1" />
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="12" y1="3" x2="12" y2="21" />
              </svg>
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#262422] font-normal tracking-wide">
              Architectural Residences &bull; Premier Estates
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#78716c] mt-1 font-medium">
              Sharma Group Realty
            </p>
          </div>

          {/* High-Resolution Architectural Photograph */}
          {!imageError && (
            <img
              src={architecturalImageUrl}
              alt="Contemporary architectural residential estate showcasing modern luxury design by Sharma Group Realty"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          )}

          {/* Subtle vignette and bottom tint for atmospheric luxury */}
          {imageLoaded && !imageError && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 text-left pointer-events-none">
                <span className="text-[10px] sm:text-xs tracking-[0.24em] uppercase text-white/90 font-medium drop-shadow-sm">
                  Architectural Portfolio &bull; New Horizons
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

