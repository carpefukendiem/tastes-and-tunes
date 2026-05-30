"use client";

import { useEffect, useState } from "react";
import { Button, Container } from "@/components/primitives";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "LINEUP", href: "#lineup" },
  { label: "VENDORS", href: "#vendors" },
  { label: "SPONSOR", href: "#sponsor" },
  { label: "IMPACT", href: "#impact" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        isScrolled || isOpen
          ? "bg-navy/95 shadow-[0_12px_35px_rgba(0,0,0,0.25)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <a
          href="#home"
          className="group inline-flex items-center gap-3 rounded-pill focus-visible:outline-gold"
          aria-label="Tastes and Tunes Santa Barbara home"
        >
          <span className="grid h-14 w-24 place-items-center rounded-[50%] border-2 border-paper bg-cream px-3 text-center shadow-card transition group-hover:-translate-y-0.5">
            <span className="font-heading text-[0.62rem] font-bold uppercase leading-none tracking-[0.12em] text-coral">
              1st Annual
            </span>
            <span className="font-poster text-[0.72rem] leading-none text-ink">
              T&T
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-sm py-2 font-body text-[0.78rem] font-bold uppercase tracking-[0.16em] text-paper/90 transition hover:text-paper focus-visible:outline-gold"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-teal-light transition group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#waitlist" variant="waitlist" className="px-5">
            Join the Waitlist →
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-paper/60 text-paper lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>
          <span className="relative h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 bg-current transition ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-20 z-40 origin-top bg-navy px-5 pb-8 pt-4 shadow-card transition lg:hidden ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-card px-4 py-3 font-heading text-lg uppercase tracking-[0.12em] text-paper transition hover:bg-paper/10 focus-visible:outline-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          href="#waitlist"
          variant="waitlist"
          className="mt-5 w-full"
          onClick={() => setIsOpen(false)}
        >
          Join the Waitlist →
        </Button>
      </div>
    </header>
  );
}
