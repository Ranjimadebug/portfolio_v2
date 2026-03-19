"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Scroll Effects
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
    const textLeft = useTransform(scrollYProgress, [0, 0.5], [0, -100])
    const textRight = useTransform(scrollYProgress, [0, 0.5], [0, 100])
    const hudSide = useTransform(scrollYProgress, [0, 0.5], [0, 150])

    const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen w-full bg-[#030712] flex flex-col items-center justify-center overflow-hidden px-6"
        >
            {/* 1. SIDEBAR DATA (Slide out on scroll) */}
            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 0.5], [0, -100]), opacity }}
                className="absolute left-8 bottom-12 hidden lg:flex flex-col gap-1"
            >
                <span className="text-[10px] font-mono text-blue-400/50 uppercase tracking-tighter">System.Loc_</span>
                <span className="text-[12px] font-mono text-white/70 uppercase tracking-widest">Bengaluru, IN</span>
            </motion.div>

            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 0.5], [0, 100]), opacity }}
                className="absolute right-8 bottom-12 hidden lg:flex flex-col items-end gap-1"
            >
                <span className="text-[10px] font-mono text-blue-400/50 uppercase tracking-tighter">System.Status_</span>
                <span className="text-[12px] font-mono text-white/70 uppercase tracking-widest">Active</span>
            </motion.div>

            {/* 2. MAIN COMPOSITION */}
            <motion.div style={{ scale, opacity }} className="relative z-10 flex flex-col items-center">

                {/* HUD Label */}
                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ ...transition, delay: 0.8 }}
                    className="mb-6 text-[10px] font-mono text-blue-400 uppercase border-x border-blue-500/30 px-4 py-1"
                >
                    Frontend Engineer
                </motion.div>

                {/* Single-Plane Headline */}
                <h1 className="flex flex-col md:flex-row items-center gap-x-6 gap-y-2 overflow-hidden font-[space-grotesk]">
                    <motion.span
                        style={{ x: textLeft }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ ...transition, delay: 0.2 }}
                        className="text-7xl md:text-[5.5rem] font-semibold text-white tracking-tight"
                    >
                        Ranjima
                    </motion.span>

                    <motion.span
                        style={{ x: textRight }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ ...transition, delay: 0.4 }}
                        className="text-7xl md:text-[5.5rem] font-light text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight"
                    >
                        Ghosh
                    </motion.span>
                </h1>

                {/* Sub-Headline (Simplified for Awwwards Elegance) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    // Added: w-full, justify-center, and text-center
                    className="mt-8 flex w-full items-center justify-center gap-4 text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase text-center"
                >
                    Designing Interactive Digital Architectures
                </motion.div>
            </motion.div>

            {/* 3. CENTERED INTERACTION ANCHOR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-10 flex flex-col items-center"
            >
                {/* Technical "Drawing" Line */}
                <div className="relative h-20 w-px bg-white/5 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-blue-500/60 to-transparent"
                    />
                </div>
                <span className="mt-4 text-[8px] font-mono text-white/70 uppercase tracking-[0.8em]">
                    Scroll
                </span>
            </motion.div>


            {/* 4. REFINED GLOW */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />

        </section>
    )
}





