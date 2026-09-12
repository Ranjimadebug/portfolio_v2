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
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLenis } from "@/hooks/useLenis"
import ThemeToggle from "@/components/ui/ThemeToggle"

export default function Navbar() {
    const links = ["About", "Projects", "Experience", "Skills", "Contact"]

    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme()
    const isDark = theme !== "light"

    // This Navbar is shared by the homepage (where the section ids actually
    // exist on the page, so links smooth-scroll in place) and other routes
    // like a project detail page (where they don't). Off the homepage, the
    // links instead navigate to "/#section" — a real link, so the browser/
    // Next.js handles jumping to that section once the homepage has loaded.
    const pathname = usePathname()
    const isHome = pathname === "/"

    // On a project detail page there's no scroll position to derive an
    // active section from, but "Projects" should still read as active
    // since that's conceptually where you are.
    const isProjectRoute = pathname?.startsWith("/projects") ?? false
    const isLinkActive = (item: string) =>
        isProjectRoute ? item.toLowerCase() === "projects" : activeSection === item.toLowerCase()

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
        if (!element) return

        // Route through the shared Lenis instance when it's active so this
        // doesn't fight the page's smooth-scroll with a second, competing
        // native smooth-scroll animation. Falls back to the native
        // behaviour if Lenis hasn't mounted yet (e.g. this page doesn't use
        // useLenis()).
        const lenis = getLenis()

        if (lenis) {
            lenis.scrollTo(element, { offset: 0 })
        } else {
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
                        className="fixed inset-0 w-full h-screen bg-(--background)/90 pointer-events-auto flex flex-col items-center justify-center z-40"
                    >
                        <ul className="flex flex-col items-center gap-6">
                            {links.map((item, idx) => {
                                const active = isLinkActive(item)
                                const linkClassName = `text-2xl font-black uppercase tracking-[0.4em] px-8 py-4 rounded-2xl transition-all ${active
                                    ? "bg-(--foreground) text-(--background) scale-110"
                                    : "text-(--foreground)/50 hover:text-(--foreground)"
                                    }`

                                return (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        {isHome ? (
                                            <button
                                                onClick={() => {
                                                    scrollToSection(item.toLowerCase())
                                                    setIsOpen(false)
                                                }}
                                                className={linkClassName}
                                            >
                                                {item}
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/#${item.toLowerCase()}`}
                                                onClick={() => setIsOpen(false)}
                                                className={linkClassName}
                                            >
                                                {item}
                                            </Link>
                                        )}
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
                        ? (isDark ? "rgba(3,7,18,0.8)" : "rgba(255,255,255,0.8)")
                        : "transparent",
                    borderColor: scrolled
                        ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)")
                        : "transparent",
                    backdropFilter: isOpen
                        ? "blur(0px)"
                        : scrolled
                            ? "blur(8px)"
                            : "blur(0px)"
                }}
                className="pointer-events-auto relative w-full flex flex-col items-center rounded-full border transition-all duration-500 overflow-hidden"
            >
                <div className="w-full flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 md:py-3">

                    {/* LOGO */}
                    {isHome ? (
                        <motion.button
                            onClick={() => scrollToSection("hero")}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="z-20 flex items-center gap-2 pl-2 group"
                        >
                            <div className="w-8 h-8 bg-(--foreground) rounded-full flex items-center justify-center text-(--background) font-black text-[10px] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                                RG
                            </div>
                        </motion.button>
                    ) : (
                        <Link
                            href="/"
                            className="z-20 flex items-center gap-2 pl-2 group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-(--foreground) rounded-full flex items-center justify-center text-(--background) font-black text-[10px] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                            >
                                RG
                            </motion.div>
                        </Link>
                    )}

                    {/* DESKTOP LINKS */}
                    <ul className="hidden md:flex items-center gap-2 z-20">
                        {links.map((item) => {
                            const active = isLinkActive(item)
                            const linkClassName = `relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active
                                ? "text-(--foreground)"
                                : "text-(--foreground)/60 hover:text-(--foreground)"
                                }`

                            return (
                                <li key={item}>
                                    {isHome ? (
                                        <button
                                            onClick={() =>
                                                scrollToSection(item.toLowerCase())
                                            }
                                            className={linkClassName}
                                        >
                                            {item}
                                        </button>
                                    ) : (
                                        <Link href={`/#${item.toLowerCase()}`} className={linkClassName}>
                                            {item}
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    {/* ACTION + MENU */}
                    <div className="flex items-center gap-1 sm:gap-3 z-20">

                        <ThemeToggle />

                        <motion.a
                            href="/resume.pdf"
                            download="Ranjima_Ghosh_Frontend_Engineer.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:block bg-(--foreground) text-(--background) px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest cursor-pointer"
                        >
                            Resume
                        </motion.a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-(--foreground)/5 rounded-full border border-(--border)"
                        >
                            <motion.span
                                animate={
                                    isOpen
                                        ? { rotate: 45, y: 6 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-5 h-0.5 bg-(--foreground) rounded-full"
                            />

                            <motion.span
                                animate={
                                    isOpen ? { opacity: 0 } : { opacity: 1 }
                                }
                                className="w-5 h-0.5 bg-(--foreground) rounded-full"
                            />

                            <motion.span
                                animate={
                                    isOpen
                                        ? { rotate: -45, y: -6 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-5 h-0.5 bg-(--foreground) rounded-full"
                            />
                        </button>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <motion.div
                    style={{ opacity: progressOpacity }}
                    className="absolute bottom-0 left-0 w-full h-px pointer-events-none bg-(--foreground)/10"
                >
                    <motion.div
                        style={{ width: progressWidth }}
                        className="h-full bg-(--foreground) shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    />
                </motion.div>
            </motion.nav>
        </header>
    )
}
