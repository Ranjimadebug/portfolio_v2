"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"

interface Project {
    id: string
    title: string
    desc: string
    stack: string[]
    slug?: string
}

export default function ProjectCard({
    project,
    index
}: {
    project: Project
    index: number
}) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <Link
            href={`/projects/${project.slug ?? project.title.toLowerCase()}`}
            className="block"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="group relative h-105 w-105 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-px cursor-pointer"
            >
                {/* inner card */}

                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="relative h-full w-full rounded-2xl bg-black/80 backdrop-blur-xl border border-white/5 p-8 overflow-hidden"
                >
                    {/* ambient glow */}

                    <div className="absolute -inset-px bg-linear-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* decorative corner */}

                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-purple-500/30 rounded-tr-2xl group-hover:border-purple-400 transition-colors" />

                    <div className="relative z-10 flex flex-col h-full">

                        {/* coordinate */}

                        <span className="text-[10px] font-mono text-purple-400/60 mb-3 tracking-widest">
                            COORD_{project.id}
                        </span>

                        {/* title */}

                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                            {project.title}
                        </h3>

                        {/* description */}

                        <p className="text-gray-400 text-sm leading-relaxed mb-auto">
                            {project.desc}
                        </p>

                        {/* tech stack */}

                        <div className="mt-6 flex flex-wrap gap-2">

                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[10px] px-2 py-1 rounded-sm border border-white/10 bg-white/5 text-blue-300 font-mono"
                                >
                                    {tech}
                                </span>
                            ))}

                        </div>

                        {/* CTA */}

                        <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">

                            Explore Mission

                            <span className="group-hover:translate-x-2 transition-transform">
                                →
                            </span>

                        </div>

                    </div>
                </div>
            </motion.div>
        </Link>
    )
}