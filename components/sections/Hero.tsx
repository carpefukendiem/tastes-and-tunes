"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "@/lib/assets";
import { Button, Container, Divider } from "@/components/primitives";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--grad-sunset)] text-paper"
      aria-labelledby="hero-title"
    >
      <div className="relative h-[42svh] min-h-72 overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        <Image
          src={assets.hero.heroBg.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[58%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/10 via-transparent to-[#b83a24]/25 lg:bg-linear-to-r lg:from-navy/55 lg:via-navy/15 lg:to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[58svh] items-center pb-28 pt-8 lg:min-h-[100svh] lg:pb-36 lg:pt-28">
        <motion.div
          className="max-w-[44rem]"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.11,
              },
            },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="font-heading text-base font-bold uppercase tracking-[0.34em] text-gold drop-shadow"
          >
            1ST ANNUAL
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-5 font-poster text-hero uppercase leading-[0.82] tracking-[-0.06em] text-paper drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
          >
            <span className="block">TASTES</span>
            <span className="block">
              <span className="align-middle font-script text-[0.66em] normal-case tracking-normal text-gold">
                &
              </span>{" "}
              TUNES
            </span>
            <span className="mt-2 block font-script text-[0.36em] normal-case leading-none tracking-normal text-gold">
              Santa Barbara
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl font-script text-script leading-tight text-paper drop-shadow"
          >
            Oceanfront Flavors. Unforgettable Sounds.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl font-heading text-sm font-bold uppercase tracking-[0.16em] text-paper sm:text-base"
          >
            <span>• FALL 2026 •</span>
            <span className="mx-3 text-gold">/</span>
            <span>CHASE PALM PARK</span>
            <span className="mx-3 text-gold">/</span>
            <span>ON CABRILLO BLVD, SANTA BARBARA</span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid gap-3 sm:flex sm:flex-wrap"
          >
            <Button href="#waitlist" variant="waitlist" className="w-full sm:w-auto">
              Join the Waitlist
            </Button>
            <Button href="#sponsor" variant="sponsor" className="w-full sm:w-auto">
              Become a Sponsor
            </Button>
            <Button href="#experience" variant="explore" className="w-full sm:w-auto">
              Explore the Experience
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <Divider
        variant="wave"
        topColor="transparent"
        bottomColor="var(--color-cream)"
        className="absolute inset-x-0 bottom-0 z-20"
      />
    </section>
  );
}
