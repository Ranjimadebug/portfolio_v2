"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"

export default function Contact() {
    const socials = [
        { name: "LinkedIn", link: "#", id: "01" },
        { name: "GitHub", link: "#", id: "02" },
        { name: "Twitter / X", link: "#", id: "03" },
        { name: "Instagram", link: "#", id: "04" },
    ]
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 })
    const titleY = useTransform(scrollYProgress, [0, 1], [100, 0])
    const emailWidth = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"])

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            id="contact"
            className="relative min-h-screen bg-[#030712] py-40 px-6 overflow-hidden flex flex-col justify-between"
        >
            <motion.div
                style={{
                    left: smoothX,
                    top: smoothY,
                }}
                className="pointer-events-none absolute w-200 h-200 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[100px] z-0"
            />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[60px_60px]" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    style={{ y: titleY }}
                    className="mb-24"
                >

                    <div className="flex items-center gap-2 pb-2">
                        <div className="h-px w-12 bg-purple-500" />
                        <span className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase">
                            System.Connect (Contact)
                        </span>
                    </div>


                    <h2 className="text-5xl md:text-[60px] leading-[0.95] font-black text-white uppercase tracking-tighter">
                        <motion.span className="block">Let's</motion.span>
                        <motion.span
                            initial={{ letterSpacing: "-0.05em" }}
                            whileInView={{ letterSpacing: "0.15em" }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500 italic inline-block w-full"
                        >
                            Build
                        </motion.span>
                    </h2>
                </motion.div>
                <div className="relative group">
                    <motion.div
                        style={{ width: emailWidth }}
                        className="absolute top-0 left-0 h-px bg-purple-500/50 z-20"
                    />

                    <motion.a
                        href="mailto:ranjimaghosh16@gmail.com"
                        className="relative border-b border-white/10 py-16 flex items-center justify-between overflow-hidden group/link"
                    >
                        <span className="text-xl md:text-[48px] font-bold text-white group-hover/link:text-purple-400 transition-colors duration-700 z-10 group-hover/link:translate-x-4">
                            ranjimaghosh16@gmail.com
                        </span>

                        <div className="text-purple-500 text-4xl group-hover/link:translate-x-6 transition-transform duration-500 pr-4">
                            →
                        </div>

                        {/* Smoother background transition to prevent flashing */}
                        <div className="absolute inset-0 bg-white/2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-700" />
                    </motion.a>

                    <motion.div
                        style={{ width: emailWidth }}
                        className="absolute bottom-0 right-0 h-px bg-purple-500/50 z-20"
                    />
                </div>

                {/* Social Grid - Fixed flashing with smoother transitions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mt-20 border border-white/10 overflow-hidden rounded-xl">
                    {socials.map((social, i) => (
                        <motion.a
                            key={social.id}
                            href={social.link}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                            className="group relative bg-black p-10 flex flex-col justify-between h-55 overflow-hidden transition-all duration-500"
                        >
                            {/* 1. Sophisticated Hover Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)]" />

                            {/* 2. Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* 3. Top Section: ID & Icon */}
                            <div className="flex justify-between items-start z-10">
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
                                        Connection
                                    </span>
                                    <span className="font-mono text-[10px] text-purple-500/60 group-hover:text-purple-400 transition-colors">
                                        {social.id}
                                    </span>
                                </div>

                                {/* Magnetic Arrow Effect */}
                                <div className="relative overflow-hidden w-6 h-6">
                                    <motion.span
                                        className="absolute inset-0 text-white/10 group-hover:text-purple-500 transition-all duration-500 group-hover:-translate-y-full group-hover:translate-x-full"
                                    >
                                        ↗
                                    </motion.span>
                                    <motion.span
                                        className="absolute inset-0 text-purple-500 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
                                    >
                                        ↗
                                    </motion.span>
                                </div>
                            </div>

                            {/* 4. Bottom Section: Social Name & Animated Line */}
                            <div className="z-10 flex flex-col gap-4">
                                <span className="text-xl md:text-2xl text-white/70 group-hover:text-white font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-1">
                                    {social.name}
                                </span>

                                {/* Decorative Progress/Interaction Line */}
                                <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-purple-500 to-transparent transition-all duration-700 ease-in-out" />
                            </div>

                            {/* 5. Subtle Border Glow (Bottom) */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Footer telemetry */}
            <footer className="max-w-7xl mx-auto w-full mt-24 flex justify-between items-center text-[10px] font-mono text-white/20 border-t border-white/5 pt-12">
                <div className="flex gap-10">
                    <div>
                        <p className="tracking-widest mb-1 text-white/40">LOCATION</p>
                        <p className="text-white/60">BENGALURU, IN</p>
                    </div>
                    <div>
                        <p className="tracking-widest mb-1 text-white/40">STATUS</p>
                        <p className="text-emerald-500 animate-pulse">● ONLINE</p>
                    </div>
                </div>

                <div className="flex-1 text-center text-white/30 tracking-widest">
                    © {new Date().getFullYear()} RANJIMA GHOSH
                </div>

                <div className="text-right">
                    <p className="tracking-[0.4em] mb-1 text-white/50">SYSTEM_VERSION</p>
                    <p className="italic text-white/30 underline decoration-purple-500/30">
                        TERMINAL_V2.0
                    </p>
                </div>
            </footer>
        </section>
    )
}