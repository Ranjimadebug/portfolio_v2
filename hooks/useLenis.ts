"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { frame, cancelFrame } from "framer-motion"

// Shared instance so other components (the navbar's "scroll to section"
// buttons, for one) can drive the same smooth-scroll rather than fighting
// it with a separate native scrollIntoView() call.
let lenisInstance: Lenis | null = null

export function getLenis() {
    return lenisInstance
}

export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            autoRaf: false
        })

        lenisInstance = lenis

        // Drive Lenis from framer-motion's own frame loop instead of a
        // second, independent requestAnimationFrame loop. This site's
        // scroll-linked animations (useScroll/useTransform in the Hero,
        // About, Experience, Contact, and Navbar sections) already run on
        // that loop; without this, Lenis's own raf loop and framer-motion's
        // frame loop tick independently and drift against each other,
        // which is what made scrolling read as stuttery rather than smooth.
        function syncFrame(data: { timestamp: number }) {
            lenis.raf(data.timestamp)
        }

        frame.update(syncFrame, true)

        return () => {
            cancelFrame(syncFrame)
            lenis.destroy()
            lenisInstance = null
        }
    }, [])
}
