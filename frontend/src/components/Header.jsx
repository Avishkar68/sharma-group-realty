import { motion } from 'framer-motion'
import logoImg from '../assets/logo.png'

export default function Header() {
  return (
    <header className="w-full border-b border-[#e7e2da]/80 bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center cursor-default"
        >
          <img
            src={logoImg}
            alt="Sharma Group Realty"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.04)]"
          />
        </motion.div>

        {/* Status Label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e7e2da] bg-white/60 text-[#78716c] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
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
