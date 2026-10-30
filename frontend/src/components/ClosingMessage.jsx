import { motion } from 'framer-motion'

export default function ClosingMessage() {
  return (
    <section className="w-full py-16 sm:py-20 px-6 sm:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Architectural hairline divider with subtle geometric center diamond */}
        <div className="w-full flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#b89758]/50" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#b89758] bg-[#f5f2eb]" />
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#b89758]/50" />
        </div>

        {/* Closing understated message */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#262422] font-light tracking-wide leading-relaxed">
          &ldquo;Built on vision. Grounded in trust.&rdquo;
        </p>

        <p className="mt-3 text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#9b7a3e] font-semibold">
          Sharma Group Realty
        </p>
      </motion.div>
    </section>
  )
}

