import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, ShoppingBag, Plus, MessageSquare, Phone } from "lucide-react";
import { FUTSAL_CONFIG } from "@/config/futsal.config";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";
import { formatCurrency, getWhatsAppBookingUrl, getDirectCallUrl } from "@/shared/lib/utils";
import { FacilitiesAccordion } from "./components/facilities-accordion";
import { NewsletterForm } from "./components/newsletter-form";

export default async function HomePage() {
  const courts = await courtRepository.findAllActive();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          1. HERO SECTION (Calibrated Viewport Height + Zero Broken Assets)
         ========================================================================= */}
      <section className="px-3 sm:px-6 pt-2 sm:pt-3">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-slate-950 h-[74vh] min-h-[480px] max-h-[620px] flex flex-col justify-between p-5 sm:p-8 md:p-10 shadow-2xl">
            {/* Background Image: High-Def Local Green Pitch */}
            <div
              className="absolute inset-0 bg-cover bg-center brightness-[0.80] contrast-105"
              style={{
                backgroundImage: `url('/images/hero-turf.jpg')`,
              }}
            />
            {/* Deep Contrast Sports Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />

            {/* Top Bar Floating Badges */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-3">
              {/* Left Badge: Team Community Pill */}
              <div className="flex items-center gap-2.5 sm:gap-3 bg-black/55 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 pr-3 sm:pr-4 rounded-full max-w-sm sm:max-w-md shadow-lg">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                    src="/images/testimonial-author.jpg"
                    alt="Player 1"
                  />
                  <img
                    className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                    src="/images/testimonial-hero.jpg"
                    alt="Player 2"
                  />
                  <img
                    className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                    src="/images/community-athlete.jpg"
                    alt="Player 3"
                  />
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug line-clamp-2">
                  Our online booking tools, tournament updates & Galle community connect athletes to push performance.
                </p>
              </div>

              {/* Right Floating Card: "LIMITED SLOTS AVAILABLE" (Local Image - Never 404s) */}
              <div className="bg-black/60 backdrop-blur-md border border-white/20 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                <div className="w-12 h-10 sm:w-14 sm:h-11 rounded-xl overflow-hidden bg-emerald-950 shrink-0">
                  <img
                    src="/images/thumbnail-futsal.jpg"
                    alt="Futsal pitch thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                      LIMITED SLOTS AVAILABLE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    Floodlit evening slots open for reservation tonight.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Hero Typography: "SPORTS PASSION" */}
            <div className="relative z-10 space-y-2 mt-auto">
              <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight uppercase leading-[0.84] drop-shadow-lg">
                SPORTS <br />
                PASSION
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                  {FUTSAL_CONFIG.arenaName} • {FUTSAL_CONFIG.location.city}
                </span>
                <span className="text-xs text-slate-300 hidden sm:inline">
                  All-weather 5v5 turf arena and indoor cricket training nets
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MISSION & BENTO INTRO SECTION ("At The Everest, we redefine...")
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          {/* Header Row: Label + Big Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            <div className="lg:col-span-3">
              <span className="inline-block px-3.5 py-1.5 bg-slate-200 text-slate-800 text-[11px] font-bold rounded-full uppercase tracking-wider">
                About The Everest
              </span>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight">
                At The Everest, we redefine how athletes play, train, and compete. From all-weather floodlit pitches to real-time slot scheduling.
              </h2>
            </div>
          </div>

          {/* Bento Grid Composition (Clean 3-Column Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Column 1: Equipment Photo + Description + CTA */}
            <div className="md:col-span-4 space-y-4 order-2 md:order-1">
              <div className="rounded-3xl overflow-hidden bg-slate-100 h-44 sm:h-48 relative shadow-sm">
                <img
                  src="/images/bento-balls.jpg"
                  alt="Futsal balls on green turf"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you're training for your next championship, corporate league, or a friendly weekend derby with friends, The Everest keeps you at peak performance.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md group"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book on WhatsApp</span>
                </a>
                <Link
                  href="/courts"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Explore Pitches</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Column 2: Large Center Action Photo (Tall Portrait) */}
            <div className="md:col-span-5 h-[360px] sm:h-[440px] md:h-[480px] rounded-3xl sm:rounded-[2.2rem] overflow-hidden shadow-xl relative bg-slate-200 order-1 md:order-2">
              <img
                src="/images/bento-player.jpg"
                alt="Futsal player in motion on court"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Column 3: Turf Photo with Plus Button Overlay + Text */}
            <div className="md:col-span-3 space-y-3.5 order-3">
              <div className="h-[220px] sm:h-[260px] rounded-3xl overflow-hidden relative shadow-md bg-emerald-950">
                <img
                  src="/images/bento-court.jpg"
                  alt="Sports turf court lines"
                  className="w-full h-full object-cover opacity-90"
                />
                <button
                  type="button"
                  aria-label="Explore more"
                  className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                Get access to upcoming tournaments, expert coaching clinics, and community events across Gintota, Galle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXPLORE FACILITIES (Stadium-Cut Rounded Cards Carousel - All Local Images)
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-7">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 uppercase tracking-tight">
              EXPLORE FACILITIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              Whether you're training for your next league or organizing a quick 5v5 match, The Everest keeps you motivated and connected.
            </p>
          </div>

          {/* 4 Stadium-Cut Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Indoor Futsal Arena",
                desc: "Strengthen and stretch indoors with tournament-grade turf",
                img: "/images/facility-1.jpg",
                link: "/courts",
              },
              {
                title: "Indoor Cricket Lane",
                desc: "Hit the pitch and power through your batting & bowling practice",
                img: "/images/facility-2.jpg",
                link: "/courts",
                hasButton: true,
              },
              {
                title: "Warmup & Conditioning",
                desc: "Strengthen and stretch outdoors and indoors before kickoff",
                img: "/images/facility-3.jpg",
                link: "/courts",
              },
              {
                title: "Night Floodlight Matches",
                desc: "Play under high-intensity stadium lights in cool evening air",
                img: "/images/facility-4.jpg",
                link: "/courts",
              },
            ].map((facility, idx) => (
              <Link
                key={idx}
                href={facility.link}
                className="group relative h-72 sm:h-92 rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5"
              >
                <img
                  src={facility.img}
                  alt={facility.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <h3 className="font-bold text-base text-white">{facility.title}</h3>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {facility.desc}
                  </p>
                </div>

                {facility.hasButton && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. "AT THE EVEREST, PRO TURF POWERS SMARTER PLAY" (Product & Court Cards)
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Our Pitches & Equipment
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight mt-1">
                AT THE EVEREST, PRO TURF <br /> POWERS SMARTER PLAY
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              Whether you're training for your first derby or your next championship, choose your arena below.
            </p>
          </div>

          {/* 4 Cards Grid with Pastel Containers Matching Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Main 5v5 Futsal Turf",
                price: 3500,
                unit: "/hr",
                tag: "Bestseller",
                bg: "bg-[#F5F8F6]",
                img: "/images/card-futsal.jpg",
                link: `/courts/${courts[0]?.id || "court-1"}`,
              },
              {
                name: "Indoor Cricket Lane",
                price: 3000,
                unit: "/hr",
                tag: "Cricket",
                bg: "bg-[#F0F7F6]",
                img: "/images/card-cricket.jpg",
                link: `/courts/${courts[1]?.id || "court-2"}`,
              },
              {
                name: "Match Futsal Ball & Kit",
                price: 500,
                unit: "/session",
                tag: "Equipment",
                bg: "bg-[#F3F4F6]",
                img: "/images/card-kit.jpg",
                link: "/courts",
              },
              {
                name: "Weekend Tournament Slot",
                price: 15000,
                unit: "/half day",
                tag: "Tournament",
                bg: "bg-[#FAF7F0]",
                img: "/images/card-cup.jpg",
                link: "/courts",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className={`h-48 sm:h-52 rounded-2xl ${item.bg} relative overflow-hidden flex items-center justify-center p-2`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/75 backdrop-blur text-white text-[10px] font-bold rounded">
                    {item.tag}
                  </span>
                  <Link
                    href={item.link}
                    aria-label={`Reserve ${item.name}`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                  <p className="text-sm font-extrabold text-emerald-700">
                    {formatCurrency(item.price)}
                    <span className="text-[10px] font-normal text-slate-500">{item.unit}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={getWhatsAppBookingUrl({ courtName: item.name, price: item.price })}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    title={`Book ${item.name} via WhatsApp`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    href={item.link}
                    className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-sm flex items-center justify-center"
                    title={`View details for ${item.name}`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TESTIMONIAL / SOCIAL PROOF ("OVER A YEAR AT THE EVEREST...")
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-[#F1F3F5] p-6 sm:p-10 md:p-12 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <span className="font-serif font-black text-6xl text-slate-300 leading-none block">
                “
              </span>
              <blockquote className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight leading-tight">
                "OVER A YEAR AT THE EVEREST THE BEST SPORTS ARENA FOR FITNESS AND FUN!"
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden ring-2 ring-white">
                    <img
                      src="/images/testimonial-author.jpg"
                      alt="Farhan Nazir"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Farhan Nazir</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">Team Captain, Gintota Strikers</p>
                  </div>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    className="w-9 h-9 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Athlete Portrait */}
            <div className="lg:col-span-4 h-64 sm:h-76 md:h-80 rounded-3xl overflow-hidden bg-slate-300 shadow-md">
              <img
                src="/images/testimonial-hero.jpg"
                alt="Athlete testimonial hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TAKE A LOOK AT FACILITIES (Accordion & Visual Collage - All Local Images)
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-7">
          <div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight">
              TAKE A LOOK AT FACILITIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mt-1">
              Engineered for endurance, speed, and safety. Discover everything The Everest offers teams and athletes in Gintota, Galle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Photo Collage */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-slate-100 h-52 sm:h-60 shadow-sm">
                <img
                  src="/images/gear-shoes.jpg"
                  alt="Sports turf running shoes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden bg-slate-100 h-36 sm:h-40 shadow-sm">
                <img
                  src="/images/gear-ball.jpg"
                  alt="Futsal match ball on turf"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Interactive Accordion */}
            <div className="lg:col-span-7">
              <FacilitiesAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. COMMUNITY INVITE / NEWSLETTER CTA (All Local Images + Interactive Form)
         ========================================================================= */}
      <section className="px-3 sm:px-6">
        <div className="max-w-7xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-[#E9ECEF] overflow-hidden p-6 sm:p-10 md:p-12 border border-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            {/* Left Content */}
            <div className="md:col-span-8 space-y-4 sm:space-y-5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Contact Us & Community
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 uppercase tracking-tight leading-none">
                THE EVEREST INVITES YOU <br />
                JOIN COMMUNITY
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                Get notified of upcoming weekend tournaments, midnight floodlight derbies, and member rates in Gintota, Galle.
              </p>

              {/* Email Pill Input Form (Client Component) */}
              <NewsletterForm />
            </div>

            {/* Right Athlete Portrait */}
            <div className="md:col-span-4 h-64 sm:h-80 rounded-3xl overflow-hidden bg-emerald-800 shadow-lg">
              <img
                src="/images/community-athlete.jpg"
                alt="Community Athlete in sport kit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
