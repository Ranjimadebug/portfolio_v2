"use client"

import { motion, useAnimation, Variants } from "framer-motion"
import { useEffect, useState } from "react"

const skills = [
    { name: "React / Next", level: "Expert", id: "01" },
    { name: "JavaScript / TS", level: "Advanced", id: "02" },
    { name: "HTML / CSS", level: "Expert", id: "03" },
    { name: "Tailwind", level: "Advanced", id: "04" },
    { name: "Redux", level: "Advanced", id: "05" },
    { name: "REST APIs", level: "Advanced", id: "06" },
    { name: "Node / Express", level: "Intermediate", id: "07" },
    { name: "MongoDB", level: "Intermediate", id: "08" },
]

const stack = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "Redux",
    "Tailwind",
    "Docker",
    "AWS",
    "Git"
]


export default function TechStack() {
    const controls = useAnimation()

    const startSlow = () =>
        controls.start({
            x: [0, -1000],
            transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear"
            }
        })

    const startFast = () =>
        controls.start({
            x: [0, -1000],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
            }
        })

    useEffect(() => {
        startSlow()
    }, [])

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
    return (
        <section id="skills" className="relative bg-[#030712] py-10 md:py-20 lg:py-24 px-6">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-20">

                {/* LEFT SIDE */}
                <div className="lg:sticky lg:top-40 h-fit">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >

                        {/* label */}
                        <div className="flex items-center gap-4 mb-6 group cursor-default">
                            <div className="h-px w-8 bg-blue-500/50 group-hover:w-16 transition-all duration-500" />
                            <motion.h2
                                variants={textItem}
                                className="text-[10px] lg:text-xs font-mono text-blue-400 tracking-[0.3em] lg:tracking-[0.5em] uppercase"
                            >
                                System.Modules (Tech_Stack)
                            </motion.h2>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase">
                            Modern <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 italic">
                                Stack
                            </span>
                        </h2>

                        <p className="max-w-xl md:max-w-xs text-neutral-500 font-light leading-relaxed">
                            A curated selection of technologies used to build high-performance,
                            frame-perfect digital experiences.
                        </p>

                    </motion.div>

                </div>


                {/* RIGHT SIDE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-2xl">

                    {skills.map((skill, i) => (
                        <SkillTile key={skill.id} skill={skill} index={i} />
                    ))}

                </div>

            </div>


            {/* MARQUEE */}
            <div
                className="mt-24 overflow-hidden py-10 border-y border-white/5 whitespace-nowrap"
                onMouseEnter={startFast}
                onMouseLeave={startSlow}
            >
                <motion.div
                    animate={controls}
                    className="flex gap-20 text-[60px] font-black text-white/4 uppercase italic"
                >
                    {[...stack, ...stack].map((item, i) => (
                        <span key={item + i}>{item}</span>
                    ))}
                </motion.div>
            </div>

        </section>
    )
}

function SkillTile({ skill, index }: { skill: typeof skills[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative bg-black p-10 flex flex-col justify-between h-65 hover:bg-white/2 transition-colors duration-500 overflow-hidden"
        >

            {/* top hover accent */}
            <div className="absolute top-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700" />


            {/* subtle grid texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[24px_24px]" />


            {/* glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.08)_0%,transparent_70%)]" />


            {/* top row */}
            <div className="flex justify-between items-start">

                <span className="font-mono text-[10px] text-white/20 tracking-widest">
                    {skill.id}
                </span>

                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <span className="font-mono text-[9px] text-white/10 tracking-widest">
                        ACTIVE
                    </span>
                </div>

            </div>


            {/* divider */}
            <div className="h-px w-full bg-white/5 my-4 group-hover:bg-purple-500/30 transition-colors" />


            {/* skill */}
            <div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {skill.name}
                </h4>

                <span className="font-mono text-[10px] text-purple-400 tracking-[0.3em] uppercase">
                    {skill.level}
                </span>

            </div>


            {/* bottom meta */}
            <div className="flex justify-between items-end text-[9px] font-mono text-white/10 tracking-widest">

                <span>MODULE_{skill.id}</span>
                <span>READY</span>

            </div>


            {/* corner icon */}
            <div className="absolute bottom-4 right-4">

                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-0 group-hover:opacity-20 transition-all group-hover:rotate-45 duration-700"
                >

                    <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                </svg>

            </div>

        </motion.div>
    )
}