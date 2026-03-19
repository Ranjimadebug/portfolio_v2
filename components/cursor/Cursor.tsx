"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function Cursor() {
    const [isMobile, setIsMobile] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const x = useSpring(mouseX, { stiffness: 140, damping: 22 })
    const y = useSpring(mouseY, { stiffness: 140, damping: 22 })

    const trailX = useSpring(mouseX, { stiffness: 60, damping: 20 })
    const trailY = useSpring(mouseY, { stiffness: 60, damping: 20 })

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsMobile(true)
            return
        }

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        const interactive = document.querySelectorAll(
            "a, button, [data-cursor]"
        )

        interactive.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart)
            el.addEventListener("mouseleave", handleHoverEnd)
        })

        window.addEventListener("mousemove", move)

        return () => {
            window.removeEventListener("mousemove", move)

            interactive.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart)
                el.removeEventListener("mouseleave", handleHoverEnd)
            })
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* trail glow */}
            <motion.div
                style={{ x: trailX, y: trailY }}
                animate={{ scale: isHovering ? 2.2 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="fixed top-0 left-0 pointer-events-none z-9998"
            >
                <div className="w-12 h-12 rounded-full bg-blue-400/50 blur-xl" />
            </motion.div>

            {/* star head */}
            <motion.div
                style={{ x, y }}
                animate={{ scale: isHovering ? 1.8 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="fixed top-0 left-0 pointer-events-none z-9999"
            >
                <div className="w-3 h-3 rounded-full bg-(--foreground) shadow-[0_0_18px_rgba(30,58,138,0.9)] dark:shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            </motion.div>
        </>
    )
}

