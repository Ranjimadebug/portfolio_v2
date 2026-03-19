"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ProjectItem {
    id: string
    title: string
    desc: string
    stack: string[]
    image: string
}

export default function ProjectFocus({
    project
}: {
    project: ProjectItem
}) {

    return (
        <AnimatePresence mode="wait">

            <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center max-w-4xl px-6"
            >

                {/* image */}

                <div className="relative mb-10">

                    <div className="absolute inset-0 bg-purple-500/20 blur-[100px]" />

                    <img
                        src={project.image}
                        className="relative w-162.5 rounded-xl border border-white/10"
                    />

                </div>

                {/* title */}

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {project.title}
                </h3>

                {/* description */}

                <p className="text-white/60 max-w-xl mb-8">
                    {project.desc}
                </p>

                {/* stack */}

                <div className="flex flex-wrap gap-3 justify-center">

                    {project.stack.map((tech) => (

                        <span
                            key={tech}
                            className="text-xs font-mono text-purple-300 border border-white/10 px-3 py-1"
                        >
                            {tech}
                        </span>

                    ))}

                </div>

            </motion.div>

        </AnimatePresence>
    )
}