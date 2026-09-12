'use client'

import Loader from "@/components/loader/BootLoader"
import Navbar from "@/components/navbar/Navbar"
import Hero from "@/sections/Hero/Hero"
import About from "@/sections/About/About"
import TechStack from "@/sections/TechStack/TechStack"
import Experience from "@/sections/Experience/Experience"
import { AnimatePresence } from "framer-motion"
import ScrollIndicator from "@/components/ui/ScrollIndicator"
import { useState } from "react"
import Starfield from "@/components/background/Starfield"
import Projects from "@/sections/Projects/Projects"
import Contact from "@/sections/Contact/Contact"
import useLenis from "@/hooks/useLenis"

export default function Home() {
  // const [loading, setLoading] = useState(true)

  // Smooth scrolling for the whole page. This also keeps scroll-driven
  // motion (Navbar's progress bar, the Hero/About/Experience/Contact
  // scroll-linked animations) ticking in sync with the smoothed scroll
  // position instead of the raw, jumpier native one.
  useLenis()

  return (
    <>
      <main>
        {/* <AnimatePresence mode="wait">
          {loading && (
            <Loader onFinish={() => setLoading(false)} />
          )}
        </AnimatePresence> */}
        <Starfield />
        <Navbar />
        <Hero />
        <About />
        <Projects />

        {/* Projects and Experience each carry their own ambient purple glow,
            but those fade out well before reaching the shared edge between
            the two sections, leaving a hard, flat seam right at the
            boundary. This bridges the gap: a zero-height marker sitting
            exactly on that seam with one glow straddling it (half bleeding
            up into Projects, half down into Experience), so the wash reads
            as one continuous glow instead of two separate ones meeting at a
            hard line. z-[5] keeps it above both sections' flat backgrounds
            but below their z-10 content, matching how each section's own
            glow already layers relative to its content. */}
        <div className="relative h-0" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] max-w-[90vw] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none z-[5]" />
        </div>

        <Experience />
        <TechStack />
        <Contact />
      </main>
    </>
  )
}
