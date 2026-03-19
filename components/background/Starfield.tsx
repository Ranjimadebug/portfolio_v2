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
        let galaxyRotation = 0
        const isDark = theme === "dark"
        const stars: Star[] = Array.from({ length: 250 }).map(() => ({
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

        function animate() {
            ctx.clearRect(0, 0, width, height)

            const parallaxX = (mouseX - width / 2) * 0.02
            const parallaxY = (mouseY - height / 2) * 0.02

            galaxyRotation += 0.0004

            ctx.save()
            ctx.translate(width / 2, height / 2)
            ctx.rotate(galaxyRotation)

            const galaxyGradient = ctx.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                width * 0.4
            )

            if (isDark) {
                galaxyGradient.addColorStop(0, "rgba(120,140,255,0.12)")
                galaxyGradient.addColorStop(0.4, "rgba(160,120,255,0.08)")
                galaxyGradient.addColorStop(1, "rgba(0,0,0,0)")
            } else {
                galaxyGradient.addColorStop(0, "rgba(99,102,241,0.05)")
                galaxyGradient.addColorStop(0.5, "rgba(59,130,246,0.04)")
                galaxyGradient.addColorStop(1, "rgba(0,0,0,0)")
            }

            ctx.fillStyle = galaxyGradient
            ctx.beginPath()
            ctx.arc(0, 0, width * 0.4, 0, Math.PI * 2)
            ctx.fill()

            ctx.restore()

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

                ctx.beginPath()

                if (isDark) {
                    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`
                    ctx.shadowBlur = 6
                    ctx.shadowColor = "white"
                } else {
                    ctx.fillStyle = `rgba(99,102,241,${star.opacity * 0.9})`
                    ctx.shadowBlur = 4
                    ctx.shadowColor = "rgba(79,70,229,0.9)"
                }

                ctx.arc(
                    star.x + parallaxX * star.size,
                    star.y + parallaxY * star.size,
                    star.size,
                    0,
                    Math.PI * 2
                )

                ctx.fill()
            })

            shootingStars.forEach((star, index) => {
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
                    gradient.addColorStop(0, "rgba(99,102,241,0.8)")
                    gradient.addColorStop(1, "rgba(99,102,241,0)")
                }

                ctx.beginPath()
                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.shadowBlur = isDark ? 10 : 4
                ctx.shadowColor = isDark ? "white" : "rgba(99,102,241,0.7)"

                ctx.moveTo(star.x, star.y)
                ctx.lineTo(star.x - star.length, star.y - star.length)
                ctx.stroke()

                ctx.beginPath()
                ctx.fillStyle = isDark ? "white" : "rgb(99,102,241)"
                ctx.arc(star.x, star.y, 2.2, 0, Math.PI * 2)
                ctx.fill()

                star.x -= star.speed
                star.y -= star.speed
                star.opacity -= 0.02

                if (star.opacity <= 0) {
                    shootingStars.splice(index, 1)
                }
            })

            const now = Date.now()

            if (now - lastSpawn > 3000) {
                spawnShootingStar()
                lastSpawn = now
            }

            requestAnimationFrame(animate)
        }

        animate()

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

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", resize)
        }
    }, [theme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-1 pointer-events-none"
        />
    )
}
