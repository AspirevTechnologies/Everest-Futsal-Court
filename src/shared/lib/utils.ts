import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FUTSAL_CONFIG } from "@/config/futsal.config";

/**
 * Utility for combining Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Currency formatter
 */
export function formatCurrency(amount: number, currency: string = "LKR"): string {
  if (currency === "LKR") {
    return `Rs. ${amount.toLocaleString("en-LK")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Date / Time formatting helpers for pitch slots
 */
export function formatTimeSlot(startHour: number, durationMinutes: number = 60): string {
  const start = new Date();
  start.setHours(startHour, 0, 0, 0);

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  return `${start.toLocaleTimeString([], options)} - ${end.toLocaleTimeString([], options)}`;
}

/**
 * Generate pre-filled WhatsApp booking link
 */
export function getWhatsAppBookingUrl(details?: {
  courtName?: string;
  slotLabel?: string;
  dateStr?: string;
  playerName?: string;
  price?: number;
}): string {
  const cleanPhone = FUTSAL_CONFIG.location.whatsapp.replace(/\D/g, "");
  let message = `Hello ${FUTSAL_CONFIG.arenaName}! I would like to book an appointment for a pitch slot.`;

  if (details?.courtName) {
    message += `\n\n⚽ Pitch: ${details.courtName}`;
  }
  if (details?.dateStr) {
    message += `\n📅 Date: ${details.dateStr}`;
  }
  if (details?.slotLabel) {
    message += `\n⏰ Time Slot: ${details.slotLabel}`;
  }
  if (details?.price) {
    message += `\n💰 Estimated Rate: ${formatCurrency(details.price)}`;
  }
  if (details?.playerName) {
    message += `\n👤 Team / Player Name: ${details.playerName}`;
  }
  message += `\n\nPlease let me know if this slot is available. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct phone call link
 */
export function getDirectCallUrl(): string {
  return `tel:${FUTSAL_CONFIG.location.phone.replace(/\s+/g, "")}`;
}
