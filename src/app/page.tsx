import { Application } from "@/components/sections/Application";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Insights } from "@/components/sections/Insights";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";

/**
 * Single-page experience: every section is a self-contained unit, composed
 * here in reading order.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Application />
      <Insights />
      <Contact />
    </>
  );
}
