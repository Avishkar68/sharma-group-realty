import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  getNextLaunchTarget,
  calculateTimeRemaining,
  formatTargetDateIST,
} from '../utils/countdown'

/**
 * Countdown Component for Sharma Group Realty
 *
 * Technical Features:
 * - Dynamic target date calculated in Asia/Kolkata timezone (UTC+5:30).
 * - Defaults to next Monday at 10:00 AM IST (or following Monday if already past 10:00 AM on Monday).
 * - Note: To change the launch hour, modify `LAUNCH_HOUR` in `src/utils/countdown.js`
 *   (e.g., set `LAUNCH_HOUR = 14` for 2:00 PM IST).
 * - Updates every second via `setInterval` with immediate cleanup on unmount.
 * - Displays "WE ARE LIVE" when target is reached (prevents negative values).
 * - Avoids card-heavy styling, using clean architectural lines and tabular serif numerals.
 */
export default function Countdown() {
  // Compute initial target date dynamically once
  const targetDate = useMemo(() => getNextLaunchTarget(), [])

  // Formatted date string in Asia/Kolkata (e.g. "MONDAY, 2 NOVEMBER 2026 · 10:00 AM IST")
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
    <section className="w-full pt-10 pb-12 sm:pt-14 sm:pb-16 px-6 sm:px-8 border-b border-[#e7e2da]/70 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] to-[#f6f2ea]/60">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#9b7a3e] uppercase">
            Our Official Website Goes Live In
          </span>
        </motion.div>

        {/* Live Countdown Display */}
        {timeLeft.isLive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="py-10 px-8 rounded-xl border border-[#b89758]/40 bg-white/70 shadow-sm"
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
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="w-full max-w-3xl mx-auto"
          >
            {/* Countdown Grid - Clean architectural column aesthetic without chunky cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-[#e7e2da] py-6 sm:py-8 border-y border-[#e7e2da]/80">
              {timeUnits.map((unit, index) => (
                <div
                  key={unit.label}
                  className={`flex flex-col items-center justify-center py-3 px-2 sm:px-4 ${
                    index === 0 ? 'sm:pl-0' : ''
                  } ${index === timeUnits.length - 1 ? 'sm:pr-0' : ''}`}
                >
                  {/* Digits with tabular layout to prevent jitter */}
                  <span className="tabular-nums font-serif text-5xl sm:text-6xl md:text-7xl font-light text-[#1a1a1a] leading-none tracking-tight">
                    {unit.value}
                  </span>
                  {/* Subtle, uppercase label */}
                  <span className="text-[10px] sm:text-xs font-medium tracking-[0.24em] text-[#78716c] uppercase mt-3">
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
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-[13px] text-[#78716c] tracking-wider"
            >
              <span className="inline-flex items-center gap-1.5 font-medium text-[#44403c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89758]" />
                Target Launch
              </span>
              <span className="hidden sm:inline text-[#a8a29e]">&bull;</span>
              <span className="font-semibold text-[#1a1a1a] tracking-[0.08em]">
                {targetDateString}
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
