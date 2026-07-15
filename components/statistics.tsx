"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import type { Statistic } from "@/lib/types"

function AnimatedCounter({
  value,
  prefix,
  isInView,
}: {
  value: number
  prefix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(increment * currentStep))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span className="tabular-nums">
      {prefix}
      {count.toLocaleString("en-US")}
    </span>
  )
}

interface StatisticsProps {
  statistics: Statistic[]
}

export function Statistics({ statistics }: StatisticsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (statistics.length === 0) return null

  return (
    <section className="py-20 bg-[#0B0C10]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            Números que hablan
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#F4A261] to-[#E63946] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#E63946] font-[family-name:var(--font-heading)]"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                }}
              >
                <AnimatedCounter
                  value={Number(stat.value)}
                  prefix={stat.suffix || ""}
                  isInView={isInView}
                />
              </motion.div>
              <p className="text-white/60 text-lg mt-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
