import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lifted from syedsubhan.in/lib/utils - fires a haptic vibration on supported devices.
// Used everywhere a click/nav happens (5 = tap, 10 = nav, 15+ = emphasis).
export function triggerHaptic(pattern: number | number[] = 10) {
  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
    window.navigator.vibrate(pattern)
  }
}
