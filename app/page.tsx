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
export default function Home() {
  // const [loading, setLoading] = useState(true)
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
        <Experience />
        <TechStack />
        <Contact />
      </main>
    </>
  )
}
