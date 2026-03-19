"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 800)
        const t2 = setTimeout(() => setPhase(2), 1600)
        const t3 = setTimeout(() => onFinish(), 2400)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [onFinish])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-black flex items-center justify-center z-9999"
        >
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center h-52 w-52">
                    <div className="absolute w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full" />
                    <div className="relative w-16 h-16 rounded-full border border-blue-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_25px_rgba(96,165,250,0.9)]" />
                    </div>
                    <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-[spin_12s_linear_infinite]" />
                    <div className="absolute w-56 h-56 rounded-full border border-white/5 animate-[spin_20s_linear_infinite_reverse]" />
                </div>
                <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="font-mono text-[10px] tracking-[0.5em] text-blue-400/80 uppercase flex items-center gap-2">
                        <span>Loading Interface</span>
                        <span className={`transition-all duration-700 flex gap-1 ${phase >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                            <span className="animate-[pulse_1.5s_infinite_200ms]">.</span>
                            <span className="animate-[pulse_1.5s_infinite_400ms]">.</span>
                            <span className="animate-[pulse_1.5s_infinite_600ms]">.</span>
                        </span>
                    </div>
                    <div className="h-4 overflow-hidden">
                        <p className={`text-[8px] font-mono text-blue-500/40 uppercase tracking-widest transition-transform duration-500 ${phase === 1 ? 'translate-y-0' : phase === 2 ? '-translate-y-full' : 'translate-y-full'}`}>
                            {phase === 1 ? "Initializing Systems" : "Establishing Link"}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}