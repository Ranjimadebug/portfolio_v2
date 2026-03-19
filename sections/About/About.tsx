"use client"

import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useRef } from "react"

export default function About() {

    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.4"]
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const y = useTransform(scrollYProgress, [0, 1], [60, 0])

    /* ---------------- TEXT STAGGER ---------------- */

    const textContainer: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.6,
                staggerChildren: 0.8
            }
        }
    }

    const textItem: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    /* ---------------- TAG STAGGER ---------------- */

    const tagContainer: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 1.0,
                staggerChildren: 0.7
            }
        }
    }

    const tagItem: Variants = {
        hidden: { opacity: 0, y: 25, scale: 0.96 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const headingItem: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const paragraphItem: Variants = {
        hidden: { opacity: 0, y: 25 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return (
        <section
            ref={ref}
            id="about"
            className="relative min-h-screen flex items-center justify-center px-6 py-20 md:py-32 bg-[#030712] overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-linear-to-b from-[#030712] via-[#030712]/50 to-transparent pointer-events-none z-0" />

            <motion.div
                style={{ opacity, y }}
                /* Changed: lg:grid-cols-2 for desktop, flex-col-reverse for mobile so text comes first or flex-col if visual stays on top */
                className="relative z-10 max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >

                {/* ---------------- LEFT VISUAL ---------------- */}
                {/* Changed: h-80 on mobile, h-125 on desktop. Added scale-75 for small screens */}
                <div className="relative flex items-center justify-center h-80 lg:h-125 w-full scale-75 sm:scale-90 lg:scale-100">

                    {/* core glow */}
                    <div className="absolute w-32 h-32 rounded-full bg-blue-500/20 blur-[60px] animate-pulse" />

                    <div className="relative w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center backdrop-blur-3xl">
                        <div className="w-12 h-12 rounded-full border border-blue-400/50 animate-ping opacity-20" />
                        <span className="absolute text-[10px] font-mono text-blue-400/60 tracking-widest uppercase">
                            Stable
                        </span>
                    </div>

                    {/* orbit rings - Changed: used responsive sizes so they don't bleed off screen */}
                    <div className="absolute w-60 h-60 lg:w-75 lg:h-75 rounded-full border border-white/5 animate-spin-slow" />
                    <div className="absolute w-80 h-80 lg:w-112.5 lg:h-112.5 rounded-full border border-white/5 animate-spin-slow-reverse" />

                    {/* location card - Changed: right-4 instead of 0 for mobile padding */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 lg:top-10 right-4 lg:right-0 p-3 lg:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
                    >
                        <p className="text-[10px] font-mono text-blue-400 mb-1 tracking-tighter uppercase">
                            Loc_
                        </p>
                        <p className="text-white text-xs lg:text-sm font-medium">
                            Bengaluru, IN
                        </p>
                    </motion.div>

                    {/* status card - Changed: left-4 instead of 0 for mobile padding */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-0 lg:bottom-10 left-4 lg:left-0 p-3 lg:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
                    >
                        <p className="text-[10px] font-mono text-purple-400 mb-1 tracking-tighter uppercase">
                            Status_
                        </p>
                        <p className="text-white text-xs lg:text-sm font-medium">
                            Open to Opportunities
                        </p>
                    </motion.div>

                    {/* small hud indicator - Hidden on very small screens to reduce clutter */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden sm:block absolute top-1/2 -left-10 p-3 rounded-lg border border-white/5 bg-blue-500/5 backdrop-blur-sm"
                    >
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-blue-400/40 rounded-full" />
                            <div className="w-1 h-1 bg-blue-400/20 rounded-full" />
                        </div>
                    </motion.div>

                </div>

                {/* ---------------- RIGHT CONTENT ---------------- */}

                <motion.div
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    className="w-full"
                >

                    {/* label */}
                    <div className="flex items-center gap-4 mb-6 group cursor-default">
                        <div className="h-px w-8 bg-blue-500/50 group-hover:w-16 transition-all duration-500" />
                        <motion.h2
                            variants={textItem}
                            className="text-[10px] lg:text-xs font-mono text-blue-400 tracking-[0.3em] lg:tracking-[0.5em] uppercase"
                        >
                            System.Log (About_Me)
                        </motion.h2>
                    </div>

                    {/* heading - Changed: text-4xl for mobile, text-6xl for desktop */}
                    <motion.h3
                        variants={headingItem}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8 leading-[1.2] lg:leading-[1.1]"
                    >
                        Building Modern <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Web Interfaces.
                        </span>
                    </motion.h3>

                    {/* paragraph - Changed: text-base for mobile, text-lg for desktop */}
                    <motion.p
                        variants={paragraphItem}
                        className="text-white/60 text-base lg:text-lg leading-relaxed max-w-xl mb-10 lg:mb-12"
                    >
                        I build modern web interfaces where engineering meets thoughtful design.
                        My philosophy is simple: if the interface doesn’t feel
                        <span className="text-white font-medium drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                            {" "}alive
                        </span>,
                        it’s just code. I focus on creating fast, interactive experiences for the modern web.
                    </motion.p>

                    {/* tags */}
                    <motion.div
                        variants={tagContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        /* Changed: grid-cols-2 always, but smaller padding on mobile */
                        className="grid grid-cols-2 gap-4 lg:gap-6"
                    >
                        {[
                            { label: "UI", desc: "Responsive Interfaces & Systems" },
                            { label: "Motion", desc: "Framer Motion & Interactive UX" },
                            { label: "Framework", desc: "React & Next.js Architecture" },
                            { label: "Performance", desc: "Optimized Web Vitals" }
                        ].map((tag, i) => (
                            <motion.div
                                key={i}
                                variants={tagItem}
                                className="group flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl hover:bg-white/5 transition-colors border border-white/5 lg:border-transparent hover:border-white/10"
                            >
                                <span className="text-blue-400 font-mono text-[9px] lg:text-[10px] tracking-widest uppercase">
                                    [{tag.label}]
                                </span>
                                <span className="text-white/80 text-xs lg:text-sm leading-tight">
                                    {tag.desc}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                </motion.div>

            </motion.div>

            {/* divider */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        </section>
    )
}