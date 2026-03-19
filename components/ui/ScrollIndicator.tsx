"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollIndicator() {

    const { scrollYProgress } = useScroll()

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        mass: 0.3
    })
    const topPosition = useTransform(
        smoothProgress,
        (v) => `calc(${v * 100}% - 7px)`
    )
    const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])
    const x = useTransform(scrollYProgress, [0, 0.02], [-20, 0])

    return (
        <motion.div
            style={{ opacity, x }}
            className="fixed left-12 top-1/2 -translate-y-1/2 h-80 w-8 flex justify-center z-40"
        >

            <div className="relative h-full flex justify-center">
                <div
                    className="
          absolute w-0.5 h-full rounded-full
          bg-white/10 backdrop-blur-sm
        "
                />
                <div
                    className="
          absolute w-1.5 h-full rounded-full
          bg-linear-to-b from-blue-500/10 via-indigo-500/10 to-purple-500/10
          blur-md
        "
                />
                <motion.div
                    style={{ scaleY: smoothProgress }}
                    className="
            origin-top absolute w-0.5 h-full rounded-full
            bg-linear-to-b from-blue-500 via-indigo-500 to-purple-500
            shadow-[0_0_12px_rgba(99,102,241,0.7)]
          "
                />
                <motion.div
                    style={{ top: topPosition }}
                    className="
            absolute w-6 h-6 rounded-full
            bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500
            blur-md opacity-70
          "
                />
                <motion.div
                    style={{ top: topPosition }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="
            absolute w-3 h-3 rounded-full
            bg-white
            shadow-[0_0_14px_rgba(255,255,255,0.9)]
            border border-white/30
          "
                />
            </div>
        </motion.div>
    )
}


