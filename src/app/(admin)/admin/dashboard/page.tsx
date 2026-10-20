import Link from "next/link";
import { ArrowUpRight, TrendingUp, Calendar, ShieldCheck, DollarSign, Activity } from "lucide-react";
import { bookingRepository } from "@/modules/bookings/infrastructure/repositories/mock-booking.repository";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatCurrency } from "@/shared/lib/utils";

export default async function AdminDashboardPage() {
  const [courts, bookings] = await Promise.all([
    courtRepository.findAllActive(),
    bookingRepository.findAll(),
  ]);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === "CONFIRMED" ? b.totalAmount : 0), 0);
  const activeCourtsCount = courts.length;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Staff Management Console</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight">
            ARENA OPERATIONS & REVENUE
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Real-time occupancy tracking, slot revenue analytics, and pitch status for {FUTSAL_CONFIG.arenaName}.
          </p>
        </div>

        <Link
          href="/admin/scheduler"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0"
        >
          <span>Launch Live Pitch Grid</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI SaaS Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Bookings Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Confirmed Games
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
              {bookings.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Real-time active slots today</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Gross Slot Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-emerald-700">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Automated peak + weekend pricing
            </p>
          </div>
        </div>

        {/* Active Pitches Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Operational Pitches
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
              {activeCourtsCount} / {courts.length}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Futsal 5v5 & Cricket nets active
            </p>
          </div>
        </div>
      </div>

      {/* Pitches Live Status Table */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-black text-xl text-slate-900 uppercase tracking-tight">
            Pitches Status & Base Rates
          </h2>
          <span className="text-xs text-slate-400 font-medium">All venues online</span>
        </div>

        <div className="divide-y divide-slate-100">
          {courts.map((court) => (
            <div
              key={court.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors rounded-xl px-2"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{court.name}</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">
                    {court.size.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-500 capitalize">
                  Surface: {court.surface.toLowerCase().replace(/_/g, " ")} • {court.features.isIndoor ? "Indoor Covered" : "Outdoor"}
                </p>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Rate</span>
                  <span className="font-heading font-black text-base text-slate-900">
                    {formatCurrency(court.baseHourlyRate)}/hr
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Operational
                </span>

                <Link
                  href={`/courts/${court.id}`}
                  className="p-2 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
                  aria-label="View pitch details"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
