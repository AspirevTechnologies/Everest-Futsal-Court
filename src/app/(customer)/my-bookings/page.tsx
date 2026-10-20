import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Phone, Ticket, ShieldCheck } from "lucide-react";
import { bookingRepository } from "@/modules/bookings/infrastructure/repositories/mock-booking.repository";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatCurrency } from "@/shared/lib/utils";

export default async function MyBookingsPage() {
  const bookings = await bookingRepository.findAll();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Player History & Passes
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight">
            MY PITCH RESERVATIONS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Track confirmed time slots, match reference codes, and venue rules for your team games in Gintota.
          </p>
        </div>

        <Link
          href="/courts"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0"
        >
          <span>Book New Slot</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4 shadow-card">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Ticket className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900">No Reservations Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't booked any pitch slots yet. Pick an arena to schedule your match.
              </p>
            </div>
            <Link
              href="/courts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <span>Explore Available Pitches</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          bookings.map((booking) => {
            const startDate = new Date(booking.startTime);
            const isConfirmed = booking.status === "CONFIRMED";

            return (
              <div
                key={booking.id}
                className="group rounded-3xl border border-slate-200 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col md:flex-row justify-between"
              >
                {/* Left Ticket Content */}
                <div className="p-6 sm:p-7 space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-black px-3 py-1 bg-slate-900 text-white rounded-lg shadow-sm">
                      {booking.referenceNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isConfirmed
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      ● {booking.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      • {booking.durationMinutes} Min Session
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-2xl text-slate-900 uppercase tracking-tight">
                      {booking.courtName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Team / Player: <strong className="text-slate-800">{booking.customerName}</strong>
                    </p>
                  </div>

                  {/* Date & Time Chips */}
                  <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{startDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>{startDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>{booking.customerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Right Receipt / Cost Section */}
                <div className="p-6 sm:p-7 bg-slate-50 md:border-l border-slate-200/80 flex flex-row md:flex-col justify-between items-center md:items-end gap-4 min-w-[200px]">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block md:text-right">
                      Total Reserved
                    </span>
                    <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800 md:text-right">
                      {formatCurrency(booking.totalAmount)}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${FUTSAL_CONFIG.location.whatsapp.replace(/\D/g, "")}?text=Hello%20The%20Everest,%20I%20have%20an%20inquiry%20regarding%20booking%20${booking.referenceNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    <span>Need Help? Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Arena Policy Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Cancellation Policy:</strong> Free rescheduling or refund is available up to 12 hours prior to slot kickoff. For urgent weather changes or team delays, please contact arena staff via WhatsApp at <strong>{FUTSAL_CONFIG.location.phone}</strong>.
        </p>
      </div>
    </div>
  );
}
