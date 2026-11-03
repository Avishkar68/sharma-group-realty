import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/logo.png'
import {
  getNextLaunchTarget,
  calculateTimeRemaining,
  formatTargetDateIST,
} from '../utils/countdown'

/**
 * Countdown Component for Sharma Group Realty
 *
 * Technical Features:
 * - Centered official company logo prominently displayed above the countdown.
 * - Single-line horizontal layout for all 4 countdown blocks across mobile and desktop.
 * - Dynamic target date calculated in Asia/Kolkata timezone (UTC+5:30).
 * - Defaults to next Monday at 10:00 AM IST (or following Monday if already past 10:00 AM on Monday).
 * - Updates every second via `setInterval` with immediate cleanup on unmount.
 * - Displays "WE ARE LIVE" when target is reached (prevents negative values).
 * - Clean architectural column aesthetic without chunky cards.
 */
export default function Countdown() {
  // Compute initial target date dynamically once
  const targetDate = useMemo(() => getNextLaunchTarget(), [])

  // Formatted date string in Asia/Kolkata (e.g. "MONDAY, 9 NOVEMBER 2026 · 10:00 AM IST")
  const targetDateString = useMemo(() => formatTargetDateIST(targetDate), [targetDate])

  // Current countdown state initialized directly
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(targetDate))

  useEffect(() => {
    // Ticks every second
    const timer = setInterval(() => {
      const updated = calculateTimeRemaining(targetDate)
      setTimeLeft(updated)

      if (updated.isLive) {
        clearInterval(timer)
      }
    }, 1000)

    // Clean up interval on unmount to prevent memory leaks
    return () => clearInterval(timer)
  }, [targetDate])

  // Helper to format two-digit numbers cleanly
  const formatNumber = (num) => String(num).padStart(2, '0')

  const timeUnits = [
    { label: 'Days', value: formatNumber(timeLeft.days) },
    { label: 'Hours', value: formatNumber(timeLeft.hours) },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
  ]

  return (
    <section className="w-full pt-12 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 px-4 sm:px-8 border-b border-[#e7e2da]/70 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] to-[#f6f2ea]/60">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Centered Company Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mb-6 sm:mb-8"
        >
          <img
            src={logoImg}
            alt="Sharma Group Realty"
            className="h-14 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-4 sm:mb-5"
          />

          {/* Launching Soon Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e7e2da] bg-white/70 text-[#78716c] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89758] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b89758]"></span>
            </span>
            <span>Official Website Launching Soon</span>
          </div>
        </motion.div>

        {/* Section Heading Sentence */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#9b7a3e] uppercase m-0">
            Our Official Website Goes Live In
          </h2>
        </motion.div>

        {/* Live Countdown Display */}
        {timeLeft.isLive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="py-10 px-8 rounded-xl border border-[#b89758]/40 bg-white/70 shadow-sm w-full max-w-xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#f5f2eb] border border-[#b89758]/30 text-[#9b7a3e] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Now Live
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1a1a1a] font-normal tracking-tight">
              We Are Live
            </h2>
            <p className="mt-3 text-sm text-[#78716c]">
              Welcome to the new official home of Sharma Group Realty.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="w-full max-w-3xl mx-auto"
          >
            {/* Single Horizontal Row Clock on All Screens including Mobile */}
            <div className="grid grid-cols-4 divide-x divide-[#e7e2da] py-5 sm:py-8 border-y border-[#e7e2da]/80">
              {timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center justify-center py-2 px-1 sm:py-3 sm:px-4"
                >
                  {/* Digits with tabular layout to prevent jitter */}
                  <span className="tabular-nums font-serif text-3xl sm:text-5xl md:text-7xl font-light text-[#1a1a1a] leading-none tracking-tight">
                    {unit.value}
                  </span>
                  {/* Subtle, uppercase label */}
                  <span className="text-[9px] sm:text-xs font-medium tracking-[0.14em] sm:tracking-[0.24em] text-[#78716c] uppercase mt-2 sm:mt-3">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Target Date Specification Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-[13px] text-[#78716c] tracking-wider"
            >
              <span className="inline-flex items-center gap-1.5 font-medium text-[#44403c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89758]" />
                Target Launch
              </span>
              <span className="hidden sm:inline text-[#a8a29e]">&bull;</span>
              <span className="font-semibold text-[#1a1a1a] tracking-[0.06em] sm:tracking-[0.08em]">
                {targetDateString}
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
