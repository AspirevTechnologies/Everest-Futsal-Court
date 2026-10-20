"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="max-w-md">
      {submitted ? (
        <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-md animate-fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>You're on the squad! We'll notify you of upcoming derbies.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-full p-1.5 shadow-sm border border-slate-300 focus-within:border-emerald-600 transition-colors"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 px-4 text-xs bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Submit email"
            className="w-9 h-9 rounded-full bg-slate-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
