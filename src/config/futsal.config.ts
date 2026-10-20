/**
 * Central Futsal Configuration
 * Follows SADP (Configuration Externalization & Single Source of Truth)
 */

export const FUTSAL_CONFIG = {
  arenaName: "The Everest Futsal",
  tagline: "Premier Indoor Futsal & Cricket Arena",
  location: {
    address: "Gintota, Galle, Southern Province, Sri Lanka",
    city: "Gintota, Galle",
    country: "Sri Lanka",
    phone: "+94 77 714 2330",
    whatsapp: "+94 77 714 2330",
  },
  slotDurationMinutes: 60,
  bufferMinutesBetweenSlots: 0,
  businessHours: {
    openingHour: 6, // 06:00 AM
    closingHour: 23, // 11:00 PM
  },
  peakHours: {
    startHour: 17, // 5:00 PM
    endHour: 22, // 10:00 PM
    peakPriceMultiplier: 1.25, // 25% surcharge for night floodlight matches
  },
  weekendMultiplier: 1.15,
  currency: {
    code: "LKR",
    symbol: "Rs. ",
  },
  cancellationPolicy: {
    refundableHoursBeforeSlot: 12,
    cancellationPenaltyPercentage: 20,
  },
} as const;

export type FutsalConfig = typeof FUTSAL_CONFIG;
