"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type Star = {
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    twinkleSpeed: number
}

type ShootingStar = {
    x: number
    y: number
    length: number
    speed: number
    opacity: number
}

// Background decoration doesn't need to run at full display refresh rate
// (60/120/144Hz) to look good. Capping it saves real main-thread time on
// every tick, which is where "constant" perceived lag mostly comes from.
const TARGET_FPS = 30
const FRAME_BUDGET_MS = 1000 / TARGET_FPS

// Fewer stars = fewer drawImage calls per frame. 250 was overkill for a
// blurred, mostly-out-of-focus backdrop element.
const STAR_COUNT = 120

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")!

        let width = window.innerWidth
        let height = window.innerHeight

        canvas.width = width
        canvas.height = height

        let mouseX = width / 2
        let mouseY = height / 2
        const isDark = theme === "dark"
        const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8,
            speed: Math.random() * 0.15,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005
        }))

        const shootingStars: ShootingStar[] = []

        function spawnShootingStar() {
            shootingStars.push({
                x: Math.random() * width,
                y: -20,
                length: Math.random() * 120 + 80,
                speed: Math.random() * 6 + 6,
                opacity: 1
            })
        }

        let lastSpawn = Date.now()
        let lastFrame = 0
        let rafId = 0

        // Star glow used to be a per-star ctx.shadowBlur, which is one of the
        // most expensive canvas 2D operations and was being paid 250x/frame.
        // Pre-render one small glow sprite instead and drawImage() it, which
        // is orders of magnitude cheaper.
        function buildGlowSprite(color: string, blur: number, dotSize: number) {
            const size = (blur + dotSize) * 4
            const sprite = document.createElement("canvas")
            sprite.width = size
            sprite.height = size
            const sctx = sprite.getContext("2d")!
            sctx.beginPath()
            sctx.fillStyle = color
            sctx.shadowBlur = blur
            sctx.shadowColor = color
            sctx.arc(size / 2, size / 2, dotSize, 0, Math.PI * 2)
            sctx.fill()
            return sprite
        }

        const glowSprite = isDark
            ? buildGlowSprite("rgba(255,255,255,1)", 6, 1.8)
            : buildGlowSprite("rgba(191,120,34,0.85)", 4, 1.8)
        const glowSpriteHalf = glowSprite.width / 2

        function animate(time: number) {
            rafId = requestAnimationFrame(animate)

            // Skip this tick entirely if we're rendering faster than the
            // target rate. This is the main lever: it directly halves (or
            // more) the JS work this component does per second, without
            // changing how it looks.
            if (time - lastFrame < FRAME_BUDGET_MS) return
            lastFrame = time

            ctx.clearRect(0, 0, width, height)

            const parallaxX = (mouseX - width / 2) * 0.02
            const parallaxY = (mouseY - height / 2) * 0.02

            stars.forEach((star) => {
                star.opacity += star.twinkleSpeed

                if (star.opacity > 1 || star.opacity < 0) {
                    star.twinkleSpeed *= -1
                }

                star.y += star.speed

                if (star.y > height) {
                    star.y = 0
                    star.x = Math.random() * width
                }

                const sx = star.x + parallaxX * star.size
                const sy = star.y + parallaxY * star.size

                ctx.globalAlpha = star.opacity
                ctx.drawImage(
                    glowSprite,
                    sx - glowSpriteHalf,
                    sy - glowSpriteHalf,
                    glowSprite.width * (star.size / 1.8 || 1),
                    glowSprite.width * (star.size / 1.8 || 1)
                )
                ctx.globalAlpha = 1
            })

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i]
                const gradient = ctx.createLinearGradient(
                    star.x,
                    star.y,
                    star.x - star.length,
                    star.y - star.length
                )

                if (isDark) {
                    gradient.addColorStop(0, "rgba(255,255,255,1)")
                    gradient.addColorStop(1, "rgba(255,255,255,0)")
                } else {
                    gradient.addColorStop(0, "rgba(191,120,34,0.75)")
                    gradient.addColorStop(1, "rgba(191,120,34,0)")
                }

                ctx.beginPath()
                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.shadowBlur = isDark ? 10 : 4
                ctx.shadowColor = isDark ? "white" : "rgba(191,120,34,0.6)"

                ctx.moveTo(star.x, star.y)
                ctx.lineTo(star.x - star.length, star.y - star.length)
                ctx.stroke()

                ctx.beginPath()
                ctx.fillStyle = isDark ? "white" : "rgb(191,120,34)"
                ctx.arc(star.x, star.y, 2.2, 0, Math.PI * 2)
                ctx.fill()

                star.x -= star.speed
                star.y -= star.speed
                star.opacity -= 0.02

                if (star.opacity <= 0) {
                    shootingStars.splice(i, 1)
                }
            }

            const now = Date.now()

            if (now - lastSpawn > 3000) {
                spawnShootingStar()
                lastSpawn = now
            }
        }

        rafId = requestAnimationFrame(animate)

        // Mouse-driven parallax doesn't need per-pixel precision; storing
        // the latest coordinates and letting the throttled animate() loop
        // read them is enough, and keeps mousemove itself effectively free.
        function handleMouseMove(e: MouseEvent) {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        function resize() {
            const canvas = canvasRef.current
            if (!canvas) return

            width = window.innerWidth
            height = window.innerHeight

            canvas.width = width
            canvas.height = height
        }

        function handleVisibilityChange() {
            if (document.hidden) {
                cancelAnimationFrame(rafId)
            } else {
                lastSpawn = Date.now()
                lastFrame = 0
                rafId = requestAnimationFrame(animate)
            }
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        window.addEventListener("resize", resize)
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", resize)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [theme])

    return (
        <>
            {/* Rotating ambient glow, done in CSS so it's compositor/GPU
                driven instead of being redrawn on canvas every frame.
                Picked with the `dark:` variant (keyed off the .dark class
                next-themes toggles on <html>) rather than the `theme` value
                from useTheme() in an inline style — that value is undefined
                during server render, so branching on it here produced a
                server/client markup mismatch (a hydration error) on every
                load. */}
            <div
                aria-hidden
                className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
            >
                <div
                    className="w-[80vmax] h-[80vmax] rounded-full animate-spin-slow bg-[radial-gradient(circle,rgba(251,191,36,0.14)_0%,rgba(249,168,89,0.08)_45%,rgba(0,0,0,0)_70%)] dark:bg-[radial-gradient(circle,rgba(120,140,255,0.12)_0%,rgba(160,120,255,0.08)_40%,rgba(0,0,0,0)_70%)]"
                />
            </div>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full z-1 pointer-events-none"
            />
        </>
    )
}
