"use client"

import Link from "next/link"
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValueEvent,
    AnimatePresence
} from "framer-motion"
import { useState, useEffect } from "react"

export default function Navbar() {
    const links = ["About", "Projects", "Experience", "Skills", "Contact"]

    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY, scrollYProgress } = useScroll()

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(
                        entry.target.id === "hero" ? "" : entry.target.id
                    )
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, observerOptions)

        const targets = ["hero", ...links.map((l) => l.toLowerCase())]

        targets.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [links])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"])
    const progressOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    return (
        <header className="fixed top-0 left-0 w-full flex justify-center z-50 pt-4 md:pt-6 px-3 md:px-4 pointer-events-none">

            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 w-full h-screen bg-black/40 pointer-events-auto flex flex-col items-center justify-center z-40"
                    >
                        <ul className="flex flex-col items-center gap-6">
                            {links.map((item, idx) => {
                                const active = activeSection === item.toLowerCase()

                                return (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <button
                                            onClick={() => {
                                                scrollToSection(item.toLowerCase())
                                                setIsOpen(false)
                                            }}
                                            className={`text-2xl font-black uppercase tracking-[0.4em] px-8 py-4 rounded-2xl transition-all ${active
                                                ? "bg-white text-black scale-110"
                                                : "text-white/50 hover:text-white"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.nav
                initial={false}
                animate={{
                    maxWidth: scrolled
                        ? "min(800px, calc(100vw - 24px))"
                        : "min(1100px, calc(100vw - 24px))",
                    backgroundColor: scrolled
                        ? "rgba(3,7,18,0.8)"
                        : "transparent",
                    borderColor: scrolled
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    backdropFilter: isOpen
                        ? "blur(0px)"
                        : scrolled
                            ? "blur(12px)"
                            : "blur(0px)"
                }}
                className="pointer-events-auto relative w-full flex flex-col items-center rounded-full border transition-all duration-500 overflow-hidden"
            >
                <div className="w-full flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 md:py-3">

                    {/* LOGO */}
                    <motion.button
                        onClick={() => scrollToSection("hero")}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="z-20 flex items-center gap-2 pl-2 group"
                    >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-black text-[10px] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                            RG
                        </div>
                    </motion.button>

                    {/* DESKTOP LINKS */}
                    <ul className="hidden md:flex items-center gap-2 z-20">
                        {links.map((item) => {
                            const active = activeSection === item.toLowerCase()

                            return (
                                <li key={item}>
                                    <button
                                        onClick={() =>
                                            scrollToSection(item.toLowerCase())
                                        }
                                        className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active
                                            ? "text-white"
                                            : "text-white/40 hover:text-white"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {/* ACTION + MENU */}
                    <div className="flex items-center gap-3 z-20">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:block bg-white text-black px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest"
                        >
                            Resume
                        </motion.button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-white/5 rounded-full border border-white/10"
                        >
                            <motion.span
                                animate={
                                    isOpen
                                        ? { rotate: 45, y: 6 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-5 h-0.5 bg-white rounded-full"
                            />

                            <motion.span
                                animate={
                                    isOpen ? { opacity: 0 } : { opacity: 1 }
                                }
                                className="w-5 h-0.5 bg-white rounded-full"
                            />

                            <motion.span
                                animate={
                                    isOpen
                                        ? { rotate: -45, y: -6 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-5 h-0.5 bg-white rounded-full"
                            />
                        </button>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <motion.div
                    style={{ opacity: progressOpacity }}
                    className="absolute bottom-0 left-0 w-full h-px pointer-events-none bg-white/10"
                >
                    <motion.div
                        style={{ width: progressWidth }}
                        className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    />
                </motion.div>
            </motion.nav>
        </header>
    )
}