"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function ArtifactNode({ project, active }: { project: any, active: boolean }) {
    return (
        <motion.div
            animate={{
                scale: active ? 1.2 : 0.8,
                opacity: active ? 1 : 0.2, // Lower opacity for inactive makes active pop more
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col items-center group"
        >
            <div className="relative">
                {/* Ping Animation - Only shows when active */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute inset-0 border-2 border-purple-500 rounded-full"
                        />
                    )}
                </AnimatePresence>

                {/* Main Core */}
                <div className={`
                    w-20 h-20 md:w-28 md:h-28 rounded-full border flex items-center justify-center backdrop-blur-xl transition-colors duration-500
                    ${active ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.4)]' : 'border-white/10 bg-white/5'}
                `}>
                    <span className={`font-mono text-xs ${active ? 'text-purple-300' : 'text-white/20'}`}>
                        {project.id}
                    </span>
                </div>
            </div>

            {/* Label - Glows when active */}
            <div className="mt-6">
                <p className={`text-sm uppercase tracking-widest transition-all duration-500 ${active ? 'text-white font-bold' : 'text-white/20'}`}>
                    {project.title}
                </p>
                {active && (
                    <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-purple-400 font-mono mt-1"
                    >
                        {project.stack.join(" • ")}
                    </motion.p>
                )}
            </div>
        </motion.div>
    )
}