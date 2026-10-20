import Link from "next/link";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";
import { bookingRepository } from "@/modules/bookings/infrastructure/repositories/mock-booking.repository";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatTimeSlot } from "@/shared/lib/utils";

export default async function SchedulerGridPage() {
  const courts = await courtRepository.findAllActive();
  const today = new Date();
  const bookings = await bookingRepository.findAll();

  const hours: number[] = [];
  for (
    let h = FUTSAL_CONFIG.businessHours.openingHour;
    h < FUTSAL_CONFIG.businessHours.closingHour;
    h++
  ) {
    hours.push(h);
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Operations Dashboard</span>
          </Link>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight">
            ARENA DAILY PITCH MATRIX
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time visual schedule grid for {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold bg-white p-3 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
            <span className="text-slate-700">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300 inline-block" />
            <span className="text-slate-700">Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-700">Peak (5-10 PM)</span>
          </div>
        </div>
      </div>

      {/* Scheduler Matrix Container */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-card no-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500">
              <th className="p-4 font-bold uppercase text-slate-700 sticky left-0 bg-slate-50 z-20 w-52 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                Pitch Venue
              </th>
              {hours.map((h) => {
                const isPeak =
                  h >= FUTSAL_CONFIG.peakHours.startHour &&
                  h < FUTSAL_CONFIG.peakHours.endHour;

                return (
                  <th
                    key={h}
                    className={`p-3 font-semibold text-center whitespace-nowrap min-w-[120px] border-l border-slate-200/60 ${
                      isPeak ? "bg-amber-50/40 text-amber-900" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {isPeak && <Zap className="w-3 h-3 text-amber-500" />}
                      <span>{formatTimeSlot(h, 60)}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courts.map((court) => (
              <tr key={court.id} className="hover:bg-slate-50/40 transition-colors">
                {/* Sticky Court Column */}
                <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] border-r border-slate-200/80">
                  <div className="text-sm font-heading font-black uppercase tracking-tight">{court.name}</div>
                  <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                    {court.size.replace("_", " ")} • {court.surface.replace(/_/g, " ").toLowerCase()}
                  </div>
                </td>

                {/* Time Slots */}
                {hours.map((h) => {
                  const slotStart = new Date(today);
                  slotStart.setHours(h, 0, 0, 0);
                  const slotEnd = new Date(today);
                  slotEnd.setHours(h + 1, 0, 0, 0);

                  const match = bookings.find(
                    (b) =>
                      b.courtId === court.id &&
                      b.status !== "CANCELLED" &&
                      slotStart < b.endTime &&
                      slotEnd > b.startTime
                  );

                  return (
                    <td key={h} className="p-2.5 text-center border-l border-slate-100">
                      {match ? (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2 rounded-xl text-[11px] font-semibold space-y-0.5 shadow-sm">
                          <span className="block truncate font-bold">{match.customerName}</span>
                          <span className="text-[10px] text-rose-500 font-mono block">
                            {match.referenceNumber}
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={`/courts/${court.id}`}
                          className="block bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-emerald-800 p-2 rounded-xl text-[11px] font-semibold transition-all shadow-sm"
                        >
                          Available
                        </Link>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-400 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        <span>Grid automatically updates in real-time as reservations occur. Click any available slot to book.</span>
      </div>
    </div>
  );
}
