"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/sections/Hero/Hero"
import Starfield from "@/components/background/Starfield"

export default function ParallaxHero() {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    /* LAYERS */

    // background moves very slow
    const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

    // hero text medium speed
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])

    // foreground fast
    const fgY = useTransform(scrollYProgress, [0, 1], [0, -350])

    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden flex items-center justify-center"
        >
            {/* background layer */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 -z-10"
            >
                <Starfield />
            </motion.div>

            {/* hero content */}
            <motion.div
                style={{ y: heroY, opacity }}
                className="relative z-10"
            >
                <Hero />
            </motion.div>

            {/* foreground floating shape */}
            <motion.div
                style={{ y: fgY }}
                className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl"
            />
        </section>
    )
}
