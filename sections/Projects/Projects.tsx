"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll, Variants } from "framer-motion"
import { useRef } from "react"

const projects = [
    {
        title: "MediSlot",
        desc: "Full-stack healthcare SaaS platform for doctor appointment scheduling with dedicated dashboards for patients, doctors, and admins.",
        stack: ["Next.js", "Node.js", "MongoDB", "Express"],
        id: "01"
    },
    {
        title: "ConvoCore",
        desc: "Real-time chat application supporting instant messaging, typing indicators, and scalable socket-based communication.",
        stack: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
        id: "02"
    },
    // {
    //     title: "FlowBoard",
    //     desc: "Collaborative task management tool featuring kanban boards, drag-and-drop interactions, and real-time team updates.",
    //     stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    //     id: "03"
    // },
    {
        title: "DevPulse",
        desc: "Developer analytics dashboard visualizing GitHub activity, commit frequency, and project insights through interactive charts.",
        stack: ["Next.js", "Node.js", "GitHub API", "Recharts"],
        id: "03"
    }
]

function ProjectCard({ project, index }: { project: any, index: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

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
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-100 w-full rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-1 cursor-none"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative h-full w-full rounded-2xl bg-black/80 p-8 overflow-hidden border border-white/5"
            >
                {/* Background Glow Effect */}
                <div className="absolute -inset-px bg-linear-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Geometric Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/30 rounded-tr-2xl group-hover:border-purple-400 transition-colors" />

                <div className="relative z-10 flex flex-col h-full">
                    <span className="text-xs font-mono text-purple-400/60 mb-2">COORD_0{project.id}</span>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-auto">
                        {project.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech: string) => (
                            <span key={tech} className="text-[10px] px-2 py-1 rounded-sm border border-white/10 bg-white/5 text-blue-300 font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        Explore Mission <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Projects() {
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
        <section
            id="projects"
            className="relative min-h-screen bg-[#030712] px-6 py-32 overflow-hidden"
        >
            {/* Background Ambient Light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24">

                    {/* <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <div className="h-px w-12 bg-purple-500" />

                        <span className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase">
                            System.Archive (Projects)
                        </span>

                    </motion.div> */}

                    {/* label */}
                    <div className="flex items-center gap-4 mb-6 group cursor-default">
                        <div className="h-px w-8 bg-blue-500/50 group-hover:w-16 transition-all duration-500" />
                        <motion.h2
                            variants={textItem}
                            className="text-[10px] lg:text-xs font-mono text-blue-400 tracking-[0.3em] lg:tracking-[0.5em] uppercase"
                        >
                            System.Archive (Projects)
                        </motion.h2>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">

                        Selected <br className="hidden sm:block" />

                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-indigo-400 to-blue-500">
                            Artifacts
                        </span>

                    </h2>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}


