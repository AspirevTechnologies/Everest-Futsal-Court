import Link from "next/link";
import { ArrowUpRight, MessageSquare, Phone } from "lucide-react";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { getWhatsAppBookingUrl, getDirectCallUrl } from "@/shared/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#0D131A] text-slate-400 pt-16 pb-12 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Big CTA Banner: "Ready to host your next tournament? LET'S GO!" */}
        <div className="text-center space-y-5 py-8 border-b border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Ready to book your next match or tournament?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <h2 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
              LET'S GO!
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Booking</span>
              </a>
              <a
                href={getDirectCallUrl()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {FUTSAL_CONFIG.location.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-heading font-bold text-xl uppercase tracking-wider text-white">
              {FUTSAL_CONFIG.arenaName}
            </span>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {FUTSAL_CONFIG.location.address}. All-weather indoor 5v5 turf, indoor cricket nets, and professional night floodlight matches.
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Call / WhatsApp: {FUTSAL_CONFIG.location.phone}
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-2.5">
            <h3 className="font-bold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courts" className="hover:text-white transition-colors">
                  Pitches & Courts
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/admin/scheduler" className="hover:text-white transition-colors">
                  Daily Pitch Grid
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-bold uppercase tracking-wider text-white">Support & Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Cancellation Policy (12 hr notice)
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Arena Turf Rules & Safety
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Tournament Terms
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 space-y-2.5">
            <h3 className="font-bold uppercase tracking-wider text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${FUTSAL_CONFIG.location.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp Booking
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Facebook
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Instagram
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {FUTSAL_CONFIG.arenaName}. Gintota, Galle. All rights reserved.</p>
          <p>Built with Next.js & SADP (Clean Architecture).</p>
        </div>
      </div>
    </footer>
  );
}
