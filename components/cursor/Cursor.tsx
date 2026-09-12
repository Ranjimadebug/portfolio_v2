"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Cursor() {
    // Lazy initializer instead of an effect + setState: this reads
    // matchMedia synchronously during the client render (matchMedia is a
    // browser API, and this component only ever renders on the client), so
    // there's no extra render pass just to flip isMobile.
    const [isMobile] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    )
    const [isHovering, setIsHovering] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const x = useSpring(mouseX, { stiffness: 140, damping: 22 })
    const y = useSpring(mouseY, { stiffness: 140, damping: 22 })

    const trailX = useSpring(mouseX, { stiffness: 60, damping: 20 })
    const trailY = useSpring(mouseY, { stiffness: 60, damping: 20 })

    // Latest raw pointer position, applied to the motion values at most
    // once per animation frame (see rafId below) instead of once per
    // "mousemove" event. A mouse/trackpad can fire mousemove far more often
    // than the screen actually repaints, and each of those events was
    // triggering framer-motion spring recalculation work — this is what
    // made the cursor itself a source of constant background load.
    const latest = useRef({ x: 0, y: 0 })
    const rafId = useRef(0)
    const scheduled = useRef(false)

    useEffect(() => {
        if (isMobile) return

        const flush = () => {
            scheduled.current = false
            mouseX.set(latest.current.x)
            mouseY.set(latest.current.y)
        }

        const move = (e: MouseEvent) => {
            latest.current.x = e.clientX
            latest.current.y = e.clientY

            if (!scheduled.current) {
                scheduled.current = true
                rafId.current = requestAnimationFrame(flush)
            }
        }

        // Event delegation instead of attaching a listener to every
        // interactive element up front: one pair of listeners on the
        // document, matched with closest(), so hover state works for
        // elements that mount later too (e.g. the case-study pages), which
        // the old querySelectorAll-on-mount snapshot missed.
        const handleOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement)?.closest?.("a, button, [data-cursor]")) {
                setIsHovering(true)
            }
        }

        const handleOut = (e: MouseEvent) => {
            const related = e.relatedTarget as HTMLElement | null
            if (!related?.closest?.("a, button, [data-cursor]")) {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", move, { passive: true })
        document.addEventListener("mouseover", handleOver)
        document.addEventListener("mouseout", handleOut)

        return () => {
            window.removeEventListener("mousemove", move)
            document.removeEventListener("mouseover", handleOver)
            document.removeEventListener("mouseout", handleOut)
            cancelAnimationFrame(rafId.current)
        }
    }, [isMobile, mouseX, mouseY])

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
                <div className="w-12 h-12 rounded-full bg-blue-400/50 blur-md" />
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
