"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import Starfield from "@/components/background/Starfield"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import type { Project } from "@/data/projects"

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function ProjectDetail({ project }: { project: Project }) {
    return (
        <main className="relative min-h-screen bg-(--background) overflow-hidden">
            <Starfield />

            {/* Ambient background glow, consistent with the rest of the site */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Same site-wide navbar as the homepage, instead of a
                page-local header, so every project page matches it exactly. */}
            <Navbar />

            <article className="relative z-10 max-w-5xl mx-auto px-6 pt-32 md:pt-40 pb-32">

                {/* Hero */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-16">
                    <Link
                        href="/#projects"
                        className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-(--foreground)/50 hover:text-(--foreground) transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                    <span className="block text-xs font-mono text-blue-400 tracking-[0.3em] uppercase">
                        Case Study
                    </span>
                    <h1 className="mt-4 text-5xl md:text-7xl font-black text-(--foreground) uppercase tracking-tighter leading-[0.95]">
                        {project.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-(--muted) leading-relaxed">
                        {project.tagline}
                    </p>

                    {/* Links */}
                    {(project.links.live || project.links.github || (project.links.apps && project.links.apps.length > 0)) && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {project.links.apps?.map((app) => (
                                <a
                                    key={app.url}
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--foreground) text-(--background) text-sm font-bold hover:bg-purple-400 dark:hover:bg-purple-300 transition-colors"
                                >
                                    {app.label} <ArrowUpRight className="w-4 h-4" />
                                </a>
                            ))}
                            {project.links.live && (
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--foreground) text-(--background) text-sm font-bold hover:bg-purple-400 dark:hover:bg-purple-300 transition-colors"
                                >
                                    Live Demo <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-(--border) text-(--foreground) text-sm font-bold hover:border-(--foreground)/40 transition-colors"
                                >
                                    <Github className="w-4 h-4" /> Source Code
                                </a>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Cover image */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-16 aspect-video w-full rounded-2xl border border-(--border) bg-linear-to-br from-(--foreground)/5 to-transparent overflow-hidden flex items-center justify-center"
                >
                    {project.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.coverImage} alt={`${project.title} preview`} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-mono text-(--foreground)/25 tracking-widest uppercase">
                            Cover image coming soon
                        </span>
                    )}
                </motion.div>

                {/* Meta row: role / timeline / stack */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-3 gap-6 mb-16 pb-16 border-b border-(--border)"
                >
                    <div>
                        <span className="text-[10px] font-mono text-(--foreground)/60 uppercase tracking-widest">Role</span>
                        <p className="mt-2 text-(--foreground) font-medium">{project.role}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-(--foreground)/60 uppercase tracking-widest">Timeline</span>
                        <p className="mt-2 text-(--foreground) font-medium">{project.timeline}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-(--foreground)/60 uppercase tracking-widest">Stack</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[10px] px-2 py-1 rounded-sm border border-(--border) bg-(--foreground)/5 text-blue-700 dark:text-blue-300 font-mono"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Overview */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-mono text-purple-400 tracking-[0.3em] uppercase mb-6">
                        Overview
                    </h2>
                    <div className="space-y-4">
                        {project.longDesc.map((para, i) => (
                            <p key={i} className="text-(--muted) leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </div>
                </motion.section>

                {/* Features */}
                {project.features.length > 0 && (
                    <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-mono text-purple-400 tracking-[0.3em] uppercase mb-6">
                            Key Features
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {project.features.map((feature, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 rounded-xl border border-(--border) bg-(--foreground)/[0.02] p-4 text-sm text-(--muted)"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Challenges */}
                {project.challenges.length > 0 && (
                    <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-sm font-mono text-purple-400 tracking-[0.3em] uppercase mb-6">
                            Challenges &amp; Solutions
                        </h2>
                        <div className="space-y-6">
                            {project.challenges.map((c, i) => (
                                <div key={i} className="rounded-xl border border-(--border) bg-(--foreground)/[0.02] p-6">
                                    <h3 className="text-(--foreground) font-bold mb-2">{c.title}</h3>
                                    <p className="text-(--muted) text-sm leading-relaxed">{c.detail}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </article>

            {/* Contact's own section (where this Footer normally lives) has
                generous bottom padding after it; without it here the footer
                sat flush against the very bottom of the page and looked
                clipped. */}
            <div className="relative z-10 px-6 pb-16 md:pb-24">
                <Footer />
            </div>
        </main>
    )
}
