import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Zap, Info } from "lucide-react";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";
import { bookingRepository } from "@/modules/bookings/infrastructure/repositories/mock-booking.repository";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatCurrency, formatTimeSlot } from "@/shared/lib/utils";
import { pricingCalculator } from "@/modules/pricing/domain/services/pricing-calculator.service";
import { BookingClientForm } from "./booking-client-form";

interface PageProps {
  params: {
    courtId: string;
  };
}

export default async function CourtDetailPage({ params }: PageProps) {
  const court = await courtRepository.findById(params.courtId);
  if (!court) {
    notFound();
  }

  // Generate today's time slots
  const today = new Date();
  const existingBookings = await bookingRepository.findByCourtAndDate(court.id, today);

  const slots = [];
  for (
    let h = FUTSAL_CONFIG.businessHours.openingHour;
    h < FUTSAL_CONFIG.businessHours.closingHour;
    h++
  ) {
    const slotStart = new Date(today);
    slotStart.setHours(h, 0, 0, 0);

    const slotEnd = new Date(today);
    slotEnd.setHours(h + 1, 0, 0, 0);

    const isBooked = existingBookings.some(
      (b) => b.status !== "CANCELLED" && slotStart < b.endTime && slotEnd > b.startTime
    );

    const pricing = pricingCalculator.calculateSlotPrice({
      baseHourlyRate: court.baseHourlyRate,
      startTime: slotStart,
      durationMinutes: 60,
    });

    slots.push({
      hour: h,
      label: formatTimeSlot(h, 60),
      isoString: slotStart.toISOString(),
      price: pricing.totalPrice,
      strategy: pricing.appliedStrategy,
      isBooked,
    });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Back Button & Header Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/courts"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pitches</span>
        </Link>
        <span className="text-xs text-slate-500 font-medium">
          Date: <strong className="text-slate-900">{today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Court Overview & Specifications (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-card">
            <div className="h-52 bg-slate-100 relative">
              <img
                src={court.imageUrl || "/images/card-futsal.jpg"}
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-black/75 backdrop-blur text-white text-xs font-bold rounded-full">
                {court.size.replace("_", " ")}
              </span>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                  {court.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1 capitalize font-medium">
                  {court.surface.replace(/_/g, " ").toLowerCase()} surface • {court.features.isIndoor ? "Indoor Covered" : "Outdoor"}
                </p>
              </div>

              {/* Rate & Surcharge Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Base Hourly Rate</span>
                  <span className="font-bold text-slate-900 text-sm">{formatCurrency(court.baseHourlyRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Peak Evening (5-10 PM)</span>
                  </span>
                  <span className="font-semibold text-amber-700">+25% Rate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Floodlights & Ball</span>
                  <span className="font-semibold text-emerald-700">Included</span>
                </div>
              </div>

              {/* Pitch Guidelines */}
              <div className="space-y-2 text-[11px] text-slate-500">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Flat turf rubber shoes recommended. No metal studs allowed.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Please arrive 10 minutes prior to your allocated slot for team warmup.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free cancellation up to 12 hours before kickoff.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Time Slot Selector & Reservation Form (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="font-heading font-black text-2xl text-slate-900 uppercase tracking-tight">
                SELECT HOURLY MATCH SLOT
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tap an available slot below, fill in your team details, and lock your pitch reservation instantly.
              </p>
            </div>

            <BookingClientForm courtId={court.id} courtName={court.name} slots={slots} />
          </div>
        </div>
      </div>
    </div>
  );
}
