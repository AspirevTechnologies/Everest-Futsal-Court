"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

interface FacilityItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const facilities: FacilityItem[] = [
  {
    id: "futsal-arena",
    title: "Indoor 5v5 Futsal Arena",
    description:
      "All-weather synthetic shock-absorbing turf, fully enclosed safety netting, and match-grade LED floodlights for seamless 24/7 games.",
    tag: "Primary Arena",
    image: "/images/facility-1.jpg",
    ctaText: "Book Pitch",
    ctaLink: "/courts",
  },
  {
    id: "cricket-nets",
    title: "Indoor Cricket Practice Nets",
    description:
      "Dedicated batting and bowling lanes with true-bounce rubber turf, ideal for tape-ball and soft-ball cricket training in any weather.",
    tag: "Cricket Zone",
    image: "/images/card-cricket.jpg",
    ctaText: "Check Availability",
    ctaLink: "/courts",
  },
  {
    id: "training-zone",
    title: "Strength & Conditioning Warmup Dugout",
    description:
      "Spacious sideline warmup areas, agility ladders, and stretching mats to prepare teams and players before kickoff.",
    tag: "Athletic Zone",
    image: "/images/facility-3.jpg",
    ctaText: "Explore More",
    ctaLink: "/courts",
  },
  {
    id: "tournament-hosting",
    title: "Tournament & League Staging",
    description:
      "Full facility rental for weekend corporate cups, school derbies, and evening floodlit leagues with live score tracking.",
    tag: "Events & Cups",
    image: "/images/card-cup.jpg",
    ctaText: "Host Tournament",
    ctaLink: "/courts",
  },
];

export function FacilitiesAccordion() {
  const [activeId, setActiveId] = useState<string>("futsal-arena");

  return (
    <div className="space-y-3">
      {facilities.map((facility) => {
        const isOpen = activeId === facility.id;
        return (
          <div
            key={facility.id}
            onClick={() => setActiveId(isOpen ? "" : facility.id)}
            className={`border rounded-2xl transition-all cursor-pointer overflow-hidden ${
              isOpen
                ? "border-slate-900 bg-white shadow-md ring-1 ring-slate-900/5"
                : "border-slate-200 bg-slate-50/80 hover:bg-white hover:border-slate-400"
            }`}
          >
            <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
              <span className="font-heading font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide text-slate-900">
                {facility.title}
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                  isOpen
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </div>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-t border-slate-100">
                <div className="sm:col-span-8 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                  <div>
                    <Link
                      href={facility.ctaLink}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-full transition-colors group shadow-sm"
                    >
                      <span>{facility.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="sm:col-span-4 h-24 sm:h-28 rounded-xl overflow-hidden relative shadow-inner">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur text-[9px] text-white font-semibold rounded">
                    {facility.tag}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
