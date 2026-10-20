"use client";

import { useState } from "react";
import { User, Phone, MessageSquare, PhoneCall, Zap, Lock, Calendar, Clock, Check } from "lucide-react";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { formatCurrency, getWhatsAppBookingUrl, getDirectCallUrl } from "@/shared/lib/utils";

interface SlotItem {
  hour: number;
  label: string;
  isoString: string;
  price: number;
  strategy: string;
  isBooked: boolean;
}

interface BookingClientFormProps {
  courtId: string;
  courtName: string;
  slots: SlotItem[];
}

export function BookingClientForm({ courtName, slots }: BookingClientFormProps) {
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);
  const [customerName, setCustomerName] = useState("");
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const whatsAppUrl = selectedSlot
    ? getWhatsAppBookingUrl({
        courtName,
        slotLabel: selectedSlot.label,
        dateStr: todayStr,
        playerName: customerName || "Team Captain",
        price: selectedSlot.price,
      })
    : getWhatsAppBookingUrl({ courtName, dateStr: todayStr });

  return (
    <div className="space-y-8">
      {/* Notice Banner: Call or WhatsApp Only */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-emerald-950">
              Direct Call & WhatsApp Reservations
            </h3>
            <p className="text-[11px] text-emerald-800">
              Select your preferred slot below and confirm with arena staff instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={getDirectCallUrl()}
            className="px-3.5 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-900 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>077 714 2330</span>
          </a>
        </div>
      </div>

      {/* 1. Slot Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-700">
            1. Select Your Hourly Slot
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Peak
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Booked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {slots.map((s) => {
            const isSelected = selectedSlot?.hour === s.hour;
            const isPeak = s.strategy.includes("Peak");

            return (
              <button
                type="button"
                key={s.hour}
                disabled={s.isBooked}
                onClick={() => setSelectedSlot(s)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                  s.isBooked
                    ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                    : isSelected
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg ring-2 ring-emerald-500 ring-offset-2"
                    : "bg-white border-slate-200 hover:border-emerald-600 hover:shadow-sm text-slate-900"
                }`}
              >
                {/* Time header */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">{s.label}</span>
                  {s.isBooked ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : isPeak ? (
                    <Zap className={`w-3 h-3 ${isSelected ? "text-amber-400" : "text-amber-500"}`} />
                  ) : null}
                </div>

                {/* Price footer */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-xs font-black ${
                      isSelected
                        ? "text-emerald-400"
                        : s.isBooked
                        ? "text-slate-400 line-through"
                        : "text-emerald-700"
                    }`}
                  >
                    {s.isBooked ? "Booked" : formatCurrency(s.price)}
                  </span>

                  {!s.isBooked && isPeak && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isSelected
                          ? "bg-emerald-950 text-emerald-300"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      Peak
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Team Name & Live WhatsApp / Call Buttons */}
      <div className="border-t border-slate-100 pt-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
            2. Team Information (Optional)
          </span>

          {selectedSlot && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Selected: <strong>{selectedSlot.label}</strong></span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>{formatCurrency(selectedSlot.price)}</span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Team / Captain Name
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Thunder FC / Captain Rizwan"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            This will be included in your WhatsApp booking message for fast reservation.
          </p>
        </div>

        {/* Action Triggers: WhatsApp & Call */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* WhatsApp Action */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
          >
            <MessageSquare className="w-4 h-4" />
            <span>
              {selectedSlot
                ? `Book ${selectedSlot.label} via WhatsApp`
                : "Reserve via WhatsApp ↗"}
            </span>
          </a>

          {/* Direct Phone Call Action */}
          <a
            href={getDirectCallUrl()}
            className="py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call to Book: {FUTSAL_CONFIG.location.phone}</span>
          </a>
        </div>

        <p className="text-center text-xs text-slate-400">
          Arena desk is open daily {FUTSAL_CONFIG.businessHours.openingHour}:00 AM - {FUTSAL_CONFIG.businessHours.closingHour}:00 PM. Instant slot confirmation via WhatsApp.
        </p>
      </div>
    </div>
  );
}
