'use client'

import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

interface OverviewChartProps {
  data: Array<{
    name: string
    total: number
  }>
}

export function OverviewChart({ data }: OverviewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  // ResponsiveContainer re-rendered the whole tree on every animation frame
  // while the sidebar was transitioning, so measure the box ourselves and
  // hand recharts a concrete width instead.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <BarChart width={width} height={350} data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </div>
  )
}
