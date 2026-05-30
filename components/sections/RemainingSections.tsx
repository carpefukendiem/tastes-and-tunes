"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assets, type SiteAsset } from "@/lib/assets";
import {
  Button,
  Container,
  Divider,
  IconBadge,
  Section,
  SectionHeader,
} from "@/components/primitives";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AssetImage({
  asset,
  className = "",
  sizes,
  priority = false,
}: {
  asset: SiteAsset;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.w}
      height={asset.h}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

export function IntroSection() {
  return (
    <Section id="about" bg="cream" grain>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <Reveal>
            <AssetImage
              asset={assets.illustrations.vwVan}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="mx-auto w-full max-w-[38rem]"
            />
          </Reveal>
          <Reveal className="max-w-2xl">
            <p className="font-poster text-display uppercase leading-[0.95] text-coral">
              A <span className="text-coral">TWO-DAY</span>
            </p>
            <h2 className="mt-1 font-poster text-display uppercase leading-[0.95] text-ink">
              CULINARY & MUSIC
            </h2>
            <p className="mt-1 font-script text-script text-coral">
              by the Sea
            </p>
            <p className="mt-7 text-lead leading-8 text-ink">
              Tastes & Tunes Santa Barbara brings together the best of our
              coastal community—extraordinary food, world-class wines, craft
              cocktails & beer, iconic live music, and one-of-a-kind local
              makers in a stunning oceanfront setting.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function ExperienceSection() {
  const items = [
    {
      asset: assets.icons.dining,
      number: "30+",
      label: "FINE DINING ESTABLISHMENTS",
    },
    { asset: assets.icons.wineries, number: "12+", label: "WINERIES" },
    {
      asset: assets.icons.cocktails,
      number: "",
      label: "COCKTAILS & CRAFT BEER",
    },
    {
      asset: assets.icons.music,
      number: "",
      label: "LIVE MUSICAL ENTERTAINMENT",
    },
    {
      asset: assets.icons.makers,
      number: "",
      label: "LOCAL MAKERS & MERCHANDISE",
    },
    {
      asset: assets.icons.philanthropy,
      number: "",
      label: "PHILANTHROPIC COMPONENT BENEFITING THE LITERACY FOUNDATION",
    },
  ];

  return (
    <Section
      id="experience"
      bg="teal"
      topDivider={
        <Divider
          variant="torn"
          topColor="var(--color-cream)"
          bottomColor="var(--color-teal)"
        />
      }
      bottomDivider={
        <Divider
          variant="torn"
          topColor="var(--color-teal)"
          bottomColor="var(--color-navy)"
        />
      }
    >
      <Container>
        <Reveal>
          <SectionHeader
            title="EXPERIENCE IT ALL"
            titleClassName="text-paper"
            srOnlyText="Experience It All"
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => (
            <Reveal key={item.label} className="flex justify-center">
              <IconBadge
                asset={item.asset}
                label={`${item.number ? `${item.number} / ` : ""}${item.label}`}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ArtistsSection() {
  return (
    <Section id="lineup" bg="navy">
      <Container>
        <h2 className="sr-only">
          Artists Under Consideration. Final lineup to be announced!
        </h2>
        <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-card">
          <AssetImage
            asset={assets.headers.artistsHeader}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[3/1.15] w-full scale-[1.06] object-cover"
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            assets.artists.billyIdol,
            assets.artists.berlin,
            assets.artists.sugarRay,
          ].map((artist) => (
            <Reveal key={artist.src}>
              <AssetImage
                asset={artist}
                sizes="(min-width: 768px) 32vw, 100vw"
                className="w-full rounded-card shadow-card"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function FoodSceneSection() {
  return (
    <Section
      id="vendors"
      bg="cream"
      grain
      topDivider={
        <Divider
          variant="torn"
          topColor="var(--color-navy)"
          bottomColor="var(--color-cream)"
        />
      }
    >
      <Container>
        <h2 className="sr-only">Savor the Santa Barbara Food Scene</h2>
        <p className="sr-only">
          Featuring Tre Lune, Lucky&apos;s, Sama Sama Kitchen, Bettina, The
          Lark, El Rincon Bohemio, Lure Fish House, Bluewater Grill, Santo
          Mezcal, Intermezzo, Pascucci, Secret Bao, BiBi Ji, The Black Sheep,
          Santa Barbara Fish Market, Ca&apos;Dario, Jill&apos;s Place, and
          Boathouse.
        </p>
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <Reveal>
            <AssetImage
              asset={assets.headers.savorBlock}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mx-auto w-full max-w-[32rem]"
            />
          </Reveal>
          <div className="space-y-4">
            {[
              assets.restaurants.row1,
              assets.restaurants.row2,
              assets.restaurants.row3,
            ].map((row) => (
              <Reveal key={row.src}>
                <AssetImage
                  asset={row}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full rounded-card"
                />
              </Reveal>
            ))}
            <Reveal>
              <AssetImage
                asset={assets.headers.andManyMore}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="mx-auto mt-3 w-full max-w-[34rem]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const sponsorCards = [
  {
    title: "PRESENTING SPONSOR",
    price: "$50,000",
    gradient: "bg-[var(--grad-presenting)]",
    benefits:
      "Top billing on all event materials · Premier logo placement · Stage recognition · VIP experiences & hospitality · 10 complimentary VIP tickets/day",
  },
  {
    title: "PREMIERE SPONSOR",
    price: "$15,000",
    gradient: "bg-[var(--grad-premiere)]",
    benefits:
      "Prominent logo placement · Onsite signage · Social media & website recognition · 6 complimentary VIP tickets/day",
  },
  {
    title: "SUPPORTING SPONSOR",
    price: "$10,000",
    gradient: "bg-[var(--grad-supporting)]",
    benefits:
      "Logo placement on select materials · Onsite signage · Website recognition · 4 complimentary VIP tickets/day",
  },
];

export function SponsorSection() {
  return (
    <Section id="sponsor" bg="navyDeep">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <Reveal>
            <p className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-coral">
              Partner With
            </p>
            <h2 className="mt-2 font-poster text-display uppercase leading-none text-paper">
              Purpose
            </h2>
            <p className="mt-6 text-lead leading-8 text-paper/85">
              Align your brand with Santa Barbara&apos;s premier culinary &
              music experience:
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {sponsorCards.map((card) => (
              <Reveal key={card.title}>
                <article
                  className={`h-full rounded-card p-6 text-paper shadow-card transition hover:-translate-y-1 ${card.gradient}`}
                >
                  <h3 className="font-heading text-2xl font-bold uppercase leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-poster text-3xl">{card.price}</p>
                  <p className="mt-5 text-sm leading-7 text-paper/90">
                    {card.benefits}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-10 flex justify-center lg:justify-end">
          <div className="grid h-36 w-36 rotate-[-8deg] place-items-center rounded-full border-4 border-dashed border-gold p-5 text-center font-heading text-sm font-bold uppercase leading-tight tracking-[0.08em] text-gold">
            Custom Packages Available
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function ImpactSection() {
  return (
    <Section
      id="impact"
      bg="cream"
      grain
      topDivider={
        <Divider
          variant="wave"
          topColor="var(--color-navy-deep)"
          bottomColor="var(--color-cream)"
        />
      }
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="font-poster text-display uppercase leading-[0.95] text-ink">
              MAKING WAVES.
              <span className="block text-coral">MAKING A DIFFERENCE.</span>
            </h2>
          </Reveal>
          <Reveal>
            <AssetImage
              asset={assets.illustrations.bookWithHeart}
              sizes="(min-width: 1024px) 28vw, 80vw"
              className="mx-auto w-full max-w-[25rem]"
            />
          </Reveal>
          <Reveal>
            <p className="font-heading text-2xl font-bold uppercase leading-tight tracking-[0.04em] text-ink">
              A PORTION OF FESTIVAL PROCEEDS BENEFITS THE LITERACY FOUNDATION.
            </p>
            <p className="mt-5 text-lead leading-8 text-ink">
              Supporting literacy programs that empower children and adults
              through education, opportunity, and community.
            </p>
            <div className="mt-6 rounded-card bg-navy p-5 text-center font-heading text-lg font-bold uppercase tracking-[0.12em] text-paper shadow-card">
              Literacy Foundation
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function FooterSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    // TODO: Connect waitlist submission to the selected email provider.
    console.log("Waitlist signup:", form.get("email"));
    event.currentTarget.reset();
  }

  return (
    <footer id="faq" className="bg-navy-deep text-paper">
      <Divider
        variant="wave"
        topColor="var(--color-cream)"
        bottomColor="var(--color-navy-deep)"
      />
      <Container className="py-[var(--section-py)]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr_0.85fr]">
          <div>
            <h2 className="font-poster text-display uppercase leading-none">
              BE PART OF SOMETHING UNFORGETTABLE
            </h2>
          </div>
          <div id="waitlist">
            <p className="font-heading text-xl font-bold uppercase leading-tight tracking-[0.06em]">
              JOIN THE WAITLIST FOR EARLY ACCESS TO TICKETS, VIP EXPERIENCES &
              UPDATES!
            </p>
            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="waitlist-email">
                Email Address
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="min-h-12 flex-1 rounded-pill border border-paper/30 bg-paper px-5 text-ink placeholder:text-ink/60"
              />
              <Button type="submit" variant="waitlist">
                Join Now →
              </Button>
            </form>
          </div>
          <div className="space-y-7">
            <div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-[0.12em]">
                Follow the Vibes
              </h3>
              <div className="mt-4 flex gap-3" aria-label="Social links">
                {["Instagram", "Facebook", "X", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#home"
                    aria-label={social}
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/40 font-heading text-xs font-bold uppercase text-paper transition hover:bg-paper hover:text-navy"
                  >
                    {social.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
            <address className="not-italic">
              <p className="font-heading text-lg font-bold uppercase tracking-[0.12em]">
                Chase Palm Park
              </p>
              <p className="mt-2 text-paper/80">ON CABRILLO BLVD</p>
              <p className="text-paper/80">SANTA BARBARA, CA</p>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t border-paper/15 pt-6 text-center text-sm text-paper/70">
          © 2026 Tastes & Tunes Santa Barbara | All Rights Reserved |
          info@tastesandtunessb.com
        </div>
      </Container>
    </footer>
  );
}
