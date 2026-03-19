"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function MagneticButton({ children }: any) {
    const ref = useRef<HTMLButtonElement>(null)

    function handleMouseMove(e: React.MouseEvent) {
        const rect = ref.current?.getBoundingClientRect()

        if (!rect) return

        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        ref.current!.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    }

    function reset() {
        if (ref.current) {
            ref.current!.style.transition = "transform 0.3s ease"
            ref.current!.style.transform = "translate(0px,0px)"
        }
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="bg-blue-600 px-6 py-3 rounded-lg text-white"
        >
            {children}
        </motion.button>
    )
}