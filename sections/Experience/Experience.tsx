"use client"

import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Static data — module scope so it isn't recreated as a brand-new array
// (and re-mapped into brand-new child props) on every render of Experience.
const EXPERIENCE = [
    {
        id: "01",
        role: "Software Engineer",
        company: "Indo-Sakura Software Pvt Ltd",
        period: "Jun 2025 — Present",
        desc: "Developing scalable web applications using Next.js and React. Implementing efficient state management with Redux, integrating REST APIs, and handling real-time data using Socket.io. Improving application performance, responsiveness, and user experience.",
        stack: ["Next.js", "React.js", "Redux Toolkit", "TypeScript", "REST APIs", "Socket.io", "HTML", "CSS"]
    },
    {
        id: "02",
        role: "Frontend Developer",
        company: "Ijona Technologies Pvt Ltd.",
        period: "Mar 2023 — Jun 2025",
        desc: "Built and maintained responsive user interfaces for a ride-hailing platform using React.js. Integrated Google Maps APIs for location tracking and route visualization, implemented dynamic pricing features, and collaborated with backend teams for API integration.",
        stack: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Google Maps API", "REST APIs", "Git"]
    }
]

type ExperienceItem = (typeof EXPERIENCE)[number]

function ExperienceCard({
    exp,
    index,
    scrollYProgress
}: {
    exp: ExperienceItem
    index: number
    scrollYProgress: MotionValue<number>
}) {
    // Hooks called at the top level of their own component instance — one
    // instance per card — instead of inside a .map() callback in the
    // parent. That was a Rules-of-Hooks violation (React hooks can't be
    // called conditionally/in a loop), and it's fixed the same way React
    // recommends: give each list item its own component.
    //
    // The x/opacity/scale ranges are also now aligned to the same half of
    // the scroll ([0, 0.5] for the first card, [0.5, 1] for the second)
    // instead of x spanning the full [0, 1] while opacity/scale only
    // covered half of it. Previously that mismatch produced a stretch of
    // scroll — roughly 25%–45% progress — where the first card had already
    // slid mostly off-screen and faded out, but the second card hadn't
    // started fading in yet: a "dead zone" where the section appeared to
    // freeze on empty background.
    const range = index === 0 ? [0, 0.5] : [0.5, 1]

    const x = useTransform(
        scrollYProgress,
        range,
        index === 0 ? ["0%", "-150%"] : ["150%", "0%"]
    )

    const opacity = useTransform(
        scrollYProgress,
        range,
        index === 0 ? [1, 0] : [0, 1]
    )

    const scale = useTransform(
        scrollYProgress,
        range,
        index === 0 ? [1, 0.8] : [0.8, 1]
    )

    return (
        <motion.div
            style={{
                x,
                opacity,
                scale,
                position: index === 0 ? "relative" : "absolute",
                perspective: "1200px"
            }}
            className="group w-[90vw] md:w-[50vw] shrink-0"
        >
            {/* Hover Glow */}
            <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)] blur-3xl" />

            <motion.div
                whileHover={{ rotateY: -5, rotateX: 2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className="relative p-6 md:p-12 rounded-2xl md:rounded-3xl border border-(--border) bg-(--card)/40 backdrop-blur-md shadow-2xl overflow-hidden"
            >
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6 md:mb-10">
                    <span className="font-mono text-[8px] md:text-[10px] text-purple-400 tracking-[0.4em] uppercase">
                        EXE_LOG_{exp.id}
                    </span>
                    <div className="relative flex-1 h-px bg-(--border) overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500 to-transparent w-1/2"
                        />
                    </div>
                </div>

                <h3 className="text-2xl md:text-[60px] leading-[1.2] md:leading-[1.1] font-bold text-(--foreground) mb-2 md:mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-500 tracking-tighter">
                    {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                    <p className="text-lg md:text-xl text-blue-500 dark:text-blue-400 font-light italic">@{exp.company}</p>
                    <span className="hidden md:block text-(--foreground)/20">/</span>
                    <p className="font-mono text-[10px] md:text-xs text-(--foreground)/60 tracking-widest w-full md:w-auto uppercase">
                        {exp.period}
                    </p>
                </div>

                <p className="text-(--muted) text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl border-l-2 border-(--border-soft) pl-4 md:pl-6 group-hover:border-purple-500/40 transition-colors">
                    {exp.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[10px] font-mono border border-(--border) bg-(--foreground)/5 text-(--foreground)/60 rounded-full hover:border-blue-500/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-4 text-[60px] md:text-[120px] font-black text-(--foreground)/8 group-hover:text-purple-500/20 transition-colors pointer-events-none italic">
                    0{index + 1}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Experience() {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    })
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative h-[180vh] md:h-[250vh] bg-(--background)"
        >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 md:w-200 md:h-100 bg-purple-900/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ x: bgX }}
                    className="absolute whitespace-nowrap opacity-[0.06] pointer-events-none select-none font-black italic text-(--foreground) text-[8vh] md:text-[15vh] uppercase tracking-[0.2em]"
                >
                    Mission_Timeline Mission_Timeline Mission_Timeline
                </motion.div>

                <div className="relative w-full flex items-center justify-center px-4">
                    {EXPERIENCE.map((exp, i) => (
                        <ExperienceCard
                            key={exp.id}
                            exp={exp}
                            index={i}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
