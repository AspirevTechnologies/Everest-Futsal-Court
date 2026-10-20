import type { Metadata } from "next";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/navbar";
import { Footer } from "@/shared/components/footer";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Everest Futsal | Premier Sports Arena Gintota, Galle",
  description:
    "The Everest Futsal & Indoor Sports Arena in Gintota, Galle. All-weather 5v5 turf, indoor cricket nets, floodlight matches, and tournament bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col font-sans bg-[#F8F9FA] text-[#0F172A] antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
