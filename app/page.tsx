import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import {
  ArtistsSection,
  ExperienceSection,
  FoodSceneSection,
  FooterSection,
  ImpactSection,
  IntroSection,
  SponsorSection,
} from "@/components/sections/RemainingSections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroSection />
        <ExperienceSection />
        <ArtistsSection />
        <FoodSceneSection />
        <SponsorSection />
        <ImpactSection />
      </main>
      <FooterSection />
    </>
  );
}
