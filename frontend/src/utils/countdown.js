/**
 * Countdown Target Calculation Utility for Sharma Group Realty
 *
 * Requirements:
 * - Launch target: Next Monday at 10:00 AM IST (Indian Standard Time, Asia/Kolkata).
 * - If current time in IST is Monday before 10:00 AM IST, target is today (that Monday) at 10:00 AM IST.
 * - If current time in IST is Monday at or after 10:00 AM IST, target is the following Monday at 10:00 AM IST.
 * - Handles Asia/Kolkata timezone (UTC+5:30) reliably across any visitor client locale/timezone.
 * - Fully testable with an optional `now` parameter.
 */

// ============================================================================
// CONFIGURATION: HOW TO CHANGE THE LAUNCH TIME
// ============================================================================
// To change the launch time, update LAUNCH_HOUR (24-hour format) and LAUNCH_MINUTE.
// Example: For 11:30 AM IST, set LAUNCH_HOUR = 11 and LAUNCH_MINUTE = 30.
export const LAUNCH_HOUR = 10;
export const LAUNCH_MINUTE = 0;
export const LAUNCH_TIMEZONE = 'Asia/Kolkata';

// IST is fixed UTC + 05:30 with no daylight saving time (5 hours 30 minutes in ms)
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * Calculates the next Monday 10:00 AM IST launch target date.
 * 
 * @param {Date} [now=new Date()] Current reference date
 * @returns {Date} Target Date object in absolute UTC epoch time
 */
export function getNextLaunchTarget(now = new Date()) {
  // Use Intl.DateTimeFormat to break down "now" into Asia/Kolkata calendar components
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(now);
  const partMap = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const year = parseInt(partMap.year, 10);
  const month = parseInt(partMap.month, 10); // 1 - 12
  const day = parseInt(partMap.day, 10);
  const hour = parseInt(partMap.hour === '24' ? '0' : partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const second = parseInt(partMap.second, 10);

  // Map weekday to 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = weekdayNames.indexOf(partMap.weekday);

  // Monday is day index 1
  let daysUntilMonday = (1 - dayOfWeek + 7) % 7;

  // If today is Monday in IST (daysUntilMonday === 0)
  if (daysUntilMonday === 0) {
    const currentSeconds = hour * 3600 + minute * 60 + second;
    const launchSeconds = LAUNCH_HOUR * 3600 + LAUNCH_MINUTE * 60;

    // If it is Monday at or after 10:00 AM IST, use the following Monday (7 days later)
    if (currentSeconds >= launchSeconds) {
      daysUntilMonday = 7;
    }
  }

  // Construct target date: Target year, month (0-based in Date.UTC), day + daysUntilMonday, at LAUNCH_HOUR:LAUNCH_MINUTE:00
  // In UTC milliseconds before offset adjustment:
  const targetUtcMs = Date.UTC(year, month - 1, day + daysUntilMonday, LAUNCH_HOUR, LAUNCH_MINUTE, 0);

  // Adjust for IST offset (+5:30) so that the epoch represents 10:00 AM in Asia/Kolkata
  const targetEpoch = targetUtcMs - IST_OFFSET_MS;

  return new Date(targetEpoch);
}

/**
 * Calculates remaining time until target date.
 * 
 * @param {Date} targetDate Target launch Date
 * @param {Date} [now=new Date()] Current reference Date
 * @returns {{ isLive: boolean, days: number, hours: number, minutes: number, seconds: number, totalSeconds: number }}
 */
export function calculateTimeRemaining(targetDate, now = new Date()) {
  const diffMs = targetDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      isLive: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);

  return {
    isLive: false,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}

/**
 * Formats a Date object into the exact required IST representation:
 * e.g., "MONDAY, 2 NOVEMBER 2026 · 10:00 AM IST"
 * 
 * @param {Date} date Date to format
 * @returns {string} Formatted date string in Asia/Kolkata timezone
 */
export function formatTargetDateIST(date) {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    weekday: 'long',
  }).format(date);

  const day = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    day: 'numeric',
  }).format(date);

  const month = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    month: 'long',
  }).format(date);

  const year = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    year: 'numeric',
  }).format(date);

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: LAUNCH_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return `${weekday.toUpperCase()}, ${day} ${month.toUpperCase()} ${year} · ${time.toUpperCase()} IST`;
}

