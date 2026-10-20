import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, Clock, MapPin, MessageSquare, Phone } from "lucide-react";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatCurrency, getWhatsAppBookingUrl, getDirectCallUrl } from "@/shared/lib/utils";

export default async function CourtsPage() {
  const courts = await courtRepository.findAllActive();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{FUTSAL_CONFIG.arenaName} • {FUTSAL_CONFIG.location.city}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 uppercase tracking-tight">
              AVAILABLE ARENAS & PITCHES
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-2">
              Book all-weather indoor 5v5 turf and cricket practice nets with high-intensity LED floodlights in Gintota, Galle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/scheduler"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>View Full Daily Matrix</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust & Spec Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Shock-Absorbing Turf</h4>
            <p className="text-[11px] text-slate-500">Joint protection and true ball bounce</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Stadium Floodlights</h4>
            <p className="text-[11px] text-slate-500">Crystal clear evening and night matches</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Instant Real-Time Lock</h4>
            <p className="text-[11px] text-slate-500">No double bookings, guaranteed slot reservation</p>
          </div>
        </div>
      </div>

      {/* Courts Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courts.map((court) => (
          <div
            key={court.id}
            className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Header with Badge Overlay */}
            <div className="h-64 sm:h-72 bg-slate-100 overflow-hidden relative">
              <img
                src={court.imageUrl || "/images/card-futsal.jpg"}
                alt={court.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Status & Size Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-950 font-bold text-xs rounded-full shadow-sm">
                  {court.size.replace("_", " ")}
                </span>
                <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-sm">
                  Available Today
                </span>
              </div>

              {/* Surface type pill */}
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block">
                  Surface Specification
                </span>
                <span className="font-heading text-lg font-bold">
                  {court.surface.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Details & Action */}
            <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                  {court.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Engineered with premium synthetic fibers, perimeter rebound safety netting, and match-grade LED lighting. Ideal for 5-a-side competitive derbies and friendly matches.
                </p>

                {/* Amenity Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {court.features.isIndoor && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full">
                      🌧️ Weatherproof Covered
                    </span>
                  )}
                  {court.features.hasFloodlights && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full">
                      💡 Night LED Floodlights
                    </span>
                  )}
                  {court.features.hasScoreboard && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full">
                      ⏱️ Digital Scoreboard
                    </span>
                  )}
                </div>
              </div>

              {/* Rate & Checkout CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                    Standard Hourly Rate
                  </span>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-700">
                    {formatCurrency(court.baseHourlyRate)}
                    <span className="text-xs font-sans font-medium text-slate-500"> / 60 min</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <a
                    href={getWhatsAppBookingUrl({ courtName: court.name })}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-sm"
                    title={`Book ${court.name} via WhatsApp`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href={`/courts/${court.id}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-sm"
                  >
                    <span>View Slots</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
