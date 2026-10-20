"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, ArrowUpRight, Menu, X, MessageSquare } from "lucide-react";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { getWhatsAppBookingUrl, getDirectCallUrl } from "@/shared/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 rounded-full bg-[#12181F]/95 backdrop-blur-md text-white border border-white/10 shadow-xl transition-all">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-heading font-black text-lg sm:text-xl tracking-wider uppercase text-white group-hover:text-emerald-400 transition-colors">
              THE EVEREST
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/courts" className="hover:text-white transition-colors">
              Pitches
            </Link>
            <Link href="/my-bookings" className="hover:text-white transition-colors">
              My Bookings
            </Link>
            <Link href="/admin/scheduler" className="hover:text-white transition-colors">
              Daily Grid
            </Link>
          </nav>

          {/* Right Actions: Direct Call & WhatsApp Booking */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Call Button */}
            <a
              href={getDirectCallUrl()}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
              title="Call The Everest Futsal Arena"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{FUTSAL_CONFIG.location.phone}</span>
            </a>

            {/* Primary Action: WhatsApp Booking */}
            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-extrabold transition-all shadow-md group"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Booking</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-[#12181F]/98 backdrop-blur-lg border border-white/10 text-white shadow-2xl space-y-3 animate-fade-in">
            <nav className="flex flex-col space-y-2 text-sm font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/courts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                Pitches & Courts
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                My Bookings
              </Link>
              <Link
                href="/admin/scheduler"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                Daily Match Grid
              </Link>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Slot via WhatsApp</span>
              </a>
              <a
                href={getDirectCallUrl()}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Directly: {FUTSAL_CONFIG.location.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
