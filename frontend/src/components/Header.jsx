import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="w-full border-b border-[#e7e2da]/80 bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Monogram */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3.5 group cursor-default"
        >
          {/* Subtle architectural-inspired monogram */}
          <div className="w-9 h-9 rounded-sm border border-[#b89758]/40 bg-[#f5f2eb] flex items-center justify-center text-[#b89758] shadow-[0_1px_3px_rgba(0,0,0,0.03)] shrink-0">
            <svg
              className="w-5 h-5 stroke-[#b89758]"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Architectural pavilion arch / colonnade lines */}
              <path d="M4 21V9a8 8 0 0 1 16 0v12" />
              <line x1="2" y1="21" x2="22" y2="21" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="12" y1="5" x2="12" y2="21" />
              <circle cx="12" cy="5" r="0.75" fill="#b89758" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#1a1a1a] uppercase">
              Sharma Group Realty
            </span>
          </div>
        </motion.div>

        {/* Status Label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e7e2da] bg-white/60 text-[#78716c] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89758] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b89758]"></span>
          </span>
          <span>Official Website Launching Soon</span>
        </motion.div>
      </div>
    </header>
  )
}

