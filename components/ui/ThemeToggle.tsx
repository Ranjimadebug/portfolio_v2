"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group relative p-2.5 rounded-full transition-all duration-300 active:scale-95"
            aria-label="Toggle Theme"
        >
            {/* Hover Background Layer */}
            <div className="absolute inset-0 rounded-full 
        /* Start fully transparent */
        opacity-0 group-hover:opacity-100 
        /* Light Mode: Solid Grayish tint */
        bg-neutral-500/10 
        /* Dark Mode: Glassy white tint */
        dark:bg-white/10 
        /* Blurred glass effect */
        backdrop-blur-md 
        /* Border that only appears on hover */
        border border-transparent group-hover:border-neutral-900/5 dark:group-hover:border-white/10 
        transition-all duration-300"
            />

            <div className="relative z-10 flex items-center justify-center text-(--foreground)">
                <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                        <motion.div
                            key="sun"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun size={18} strokeWidth={2.5} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon size={18} strokeWidth={2.5} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </button>
    )
}