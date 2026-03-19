"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function RevealSection({
    children,
}: {
    children: React.ReactNode
}) {
    const ref = useRef(null)

    const isInView = useInView(ref, {
        margin: "-100px",
        once: true,
    })

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={
                isInView
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : {}
            }
            transition={{ duration: 0.7 }}
            className="min-h-screen flex items-center justify-center"
        >
            {children}
        </motion.section>
    )
}
