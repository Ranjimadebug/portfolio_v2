"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

type Meteor = {
    id: number
    startX: number
    startY: number
    angle: number
    duration: number
    size: number
}

export default function ShootingStars() {
    const [meteors, setMeteors] = useState<Meteor[]>([])

    useEffect(() => {
        const spawnMeteor = () => {
            const isLeft = Math.random() > 0.5;
            const newMeteor: Meteor = {
                id: Date.now(),
                startX: isLeft ? Math.random() * 25 : 75 + Math.random() * 25,
                startY: 100,
                angle: isLeft ? 25 : -25,
                duration: 2.5 + Math.random() * 2,
                size: 1.2 + Math.random() * 0.8,
            }
            setMeteors((prev) => [...prev.slice(-1), newMeteor])
        }

        // RARITY: Spawns every 7 to 14 seconds
        const timeout = setTimeout(spawnMeteor, Math.random() * 14000 + 7000)
        return () => clearTimeout(timeout)
    }, [meteors])

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatePresence>
                {meteors.map((meteor) => (
                    <motion.div
                        key={meteor.id}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
                        animate={{
                            x: meteor.angle > 0 ? 350 : -350,
                            y: -900,
                            opacity: [0, 1, 1, 0],
                            scale: [0.8, 1, 0.6]
                        }}
                        transition={{
                            duration: meteor.duration,
                            ease: "linear",
                        }}
                        style={{
                            left: `${meteor.startX}%`,
                            top: `${meteor.startY}%`,
                            rotate: `${meteor.angle}deg`,
                        }}
                        className="absolute flex flex-col items-center"
                    >
                        <div
                            style={{ width: `${meteor.size}px` }}
                            className="relative h-62.5 flex flex-col items-center"
                        >
                            {/* THE HEAD */}
                            <div className="relative z-10 flex flex-col rounded-full items-center">
                                <div
                                    className="w-[1.5px] h-12 bg-linear-to-t from-white/10 via-white to-white shadow-[0_0_10px_1px_rgba(255,255,255,0.7)]"
                                    style={{
                                        borderRadius: '100% 100% 40% 40%'
                                    }}
                                />
                                <div
                                    className="
  absolute top-0 w-1 h-1.5 rounded-md
  bg-white
  blur-[0.3px]
  shadow-[0_0_14px_3px_rgba(255,255,255,0.9),0_0_20px_6px_rgba(96,165,250,0.25)]
"
                                />
                            </div>

                            <div
                                className="w-px h-full -mt-8 bg-linear-to-b from-white via-blue-500/20 to-transparent opacity-50"
                                style={{ filter: 'blur(0.5px)' }}
                            />
                            <div className="absolute top-0 w-8 h-16 bg-blue-500/10 blur-[30px] rounded-full mix-blend-screen" />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}