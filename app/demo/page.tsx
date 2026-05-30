import { assets } from "@/lib/assets";
import {
  Button,
  Container,
  Divider,
  IconBadge,
  Section,
  SectionHeader,
} from "@/components/primitives";

export default function DemoPage() {
  return (
    <main>
      <Section bg="sunset">
        <Container className="py-20">
          <SectionHeader
            eyebrow="Primitive Demo"
            title="TASTES & TUNES"
            accent="Santa Barbara"
            titleClassName="text-paper"
            accentClassName="text-gold"
          />
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="#waitlist" variant="waitlist">
              Join the Waitlist
            </Button>
            <Button href="#sponsor" variant="sponsor">
              Become a Sponsor
            </Button>
            <Button href="#experience" variant="explore">
              Explore the Experience
            </Button>
            <Button href="#gold" variant="gold">
              Gold Button
            </Button>
          </div>
        </Container>
        <Divider
          variant="wave"
          topColor="transparent"
          bottomColor="var(--color-cream)"
        />
      </Section>

      <Section bg="cream" grain>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div className="rounded-card bg-cream-dark p-6 shadow-card">
              <p className="font-heading text-small uppercase tracking-[0.18em] text-coral">
                Container + Section
              </p>
              <p className="mt-3 text-lead leading-8">
                Cream backgrounds use a subtle paper grain, rounded cards, and
                the ink body color from the design system.
              </p>
            </div>
            <SectionHeader
              align="left"
              title="A TWO-DAY CULINARY & MUSIC"
              accent="by the Sea"
              titleClassName="text-ink"
              accentClassName="text-coral"
              srOnlyText="A Two-Day Culinary and Music by the Sea"
            />
          </div>
        </Container>
      </Section>

      <Section
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
          <SectionHeader
            title="EXPERIENCE IT ALL"
            titleClassName="text-paper"
            srOnlyText="Experience It All"
          />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <IconBadge
              asset={assets.icons.dining}
              label="30+ Fine Dining Establishments"
            />
            <IconBadge asset={assets.icons.wineries} label="12+ Wineries" />
            <IconBadge
              asset={assets.icons.cocktails}
              label="Cocktails & Craft Beer"
            />
            <IconBadge asset={assets.icons.music} label="Live Music" />
            <IconBadge asset={assets.icons.makers} label="Local Makers" />
            <IconBadge
              asset={assets.icons.philanthropy}
              label="Philanthropic Component"
            />
          </div>
        </Container>
      </Section>

      <Section bg="navy">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-card bg-[var(--grad-presenting)] p-6 shadow-card">
              <h3 className="font-heading text-h2 uppercase">Presenting</h3>
              <p className="mt-3 text-paper/85">Sponsor gradient token</p>
            </div>
            <div className="rounded-card bg-[var(--grad-premiere)] p-6 shadow-card">
              <h3 className="font-heading text-h2 uppercase">Premiere</h3>
              <p className="mt-3 text-paper/85">Sponsor gradient token</p>
            </div>
            <div className="rounded-card bg-[var(--grad-supporting)] p-6 shadow-card">
              <h3 className="font-heading text-h2 uppercase">Supporting</h3>
              <p className="mt-3 text-paper/85">Sponsor gradient token</p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
