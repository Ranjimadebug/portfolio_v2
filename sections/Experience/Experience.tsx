"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    })
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
    const experience = [
        {
            id: "01",
            role: "Software Engineer",
            company: "Indo-Sakura Software Pvt Ltd",
            period: "2023 — Present",
            desc: "Architecting Zonexa's core interface. Orchestrating complex state synchronization for real-time logistics and driver telemetry.",
            stack: ["Next.js", "Redux", "Socket.io"]
        },
        {
            id: "02",
            role: "Frontend Developer",
            company: "Ijona Technologies Pvt Ltd.",
            period: "2023",
            desc: "Led the UI development for WeMove. Implementation of high-precision mapping and dynamic fare calculation modules.",
            stack: ["React", "Tailwind", "Google Maps"]
        },
    ]


    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative h-[180vh] md:h-[250vh] bg-[#030712]"
        >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 md:w-200 md:h-100 bg-purple-900/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ x: bgX }}
                    className="absolute whitespace-nowrap opacity-[0.02] pointer-events-none select-none font-black italic text-white text-[8vh] md:text-[15vh] uppercase tracking-[0.2em]"
                >
                    Mission_Timeline Mission_Timeline Mission_Timeline
                </motion.div>

                <div className="relative w-full flex items-center justify-center px-4">
                    {experience.map((exp, i) => {
                        const x = useTransform(
                            scrollYProgress,
                            [0, 1],
                            i === 0 ? ["0%", "-150%"] : ["150%", "0%"]
                        )

                        const opacity = useTransform(
                            scrollYProgress,
                            i === 0 ? [0, 0.5] : [0.5, 1],
                            i === 0 ? [1, 0] : [0, 1]
                        )

                        const scale = useTransform(
                            scrollYProgress,
                            i === 0 ? [0, 0.5] : [0.5, 1],
                            i === 0 ? [1, 0.8] : [0.8, 1]
                        )

                        return (
                            <motion.div
                                key={exp.id}
                                style={{
                                    x,
                                    opacity,
                                    scale,
                                    position: i === 0 ? "relative" : "absolute",
                                    perspective: "1200px"
                                }}
                                className="group w-[90vw] md:w-[50vw] shrink-0"
                            >
                                {/* Hover Glow */}
                                <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)] blur-3xl" />

                                <motion.div
                                    whileHover={{ rotateY: -5, rotateX: 2, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                                    className="relative p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-white/3 backdrop-blur-2xl shadow-2xl overflow-hidden"
                                >
                                    {/* Header Section */}
                                    <div className="flex items-center gap-4 mb-6 md:mb-10">
                                        <span className="font-mono text-[8px] md:text-[10px] text-purple-400 tracking-[0.4em] uppercase">
                                            EXE_LOG_{exp.id}
                                        </span>
                                        <div className="relative flex-1 h-px bg-white/10 overflow-hidden">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                whileInView={{ x: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500 to-transparent w-1/2"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-[60px] leading-[1.2] md:leading-[1.1] font-bold text-white mb-2 md:mb-4 group-hover:text-purple-300 transition-colors duration-500 tracking-tighter">
                                        {exp.role}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                        <p className="text-lg md:text-xl text-blue-400 font-light italic">@{exp.company}</p>
                                        <span className="hidden md:block text-white/20">/</span>
                                        <p className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest w-full md:w-auto uppercase">
                                            {exp.period}
                                        </p>
                                    </div>

                                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl border-l-2 border-white/5 pl-4 md:pl-6 group-hover:border-purple-500/40 transition-colors">
                                        {exp.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.stack.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[10px] font-mono border border-white/10 bg-white/5 text-white/60 rounded-full hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-4 text-[60px] md:text-[120px] font-black text-white/2 group-hover:text-purple-500/5 transition-colors pointer-events-none italic">
                                        0{i + 1}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}