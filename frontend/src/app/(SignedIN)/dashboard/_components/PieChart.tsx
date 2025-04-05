"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const desktopData = [
  { Difficulty: "Hard", desktop: 186, fill: "#B82929" },
  { Difficulty: "Medium", desktop: 305, fill: "#128993" },
  { Difficulty: "Easy", desktop: 237, fill: "#C4CFD5" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  Easy: {
    label: "Easy",
    color: "#C4CFD5",
  },
  Medium: {
    label: "Medium",
    color: "#128993",
  },
  Hard: {
    label: "Hard",
    color: "#B82929",
  }
} satisfies ChartConfig

export function ProblemChart() {
  const id = "pie-interactive"
  const [activeDifficulty, setActiveDifficulty] = React.useState(desktopData[0].Difficulty)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.Difficulty === activeDifficulty),
    [activeDifficulty]
  )
  const Difficultys = React.useMemo(() => desktopData.map((item) => item.Difficulty), [])
  console.log(Difficultys)

  return (
    <Card data-chart={id} className="flex flex-col h-full w-full bg-background border border-none shadow-sm">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0 relative bottom-5 left-6 le</CardHeader>ft-8 ">
        <Select value={activeDifficulty} onValueChange={setActiveDifficulty}>
          <SelectTrigger
            className="ml-auto h-2 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {Difficultys.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]
              if (!config) {
                return null
              }
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square h-[80%] w-[100%] max-w-[300px]"
        >
          <PieChart className="relative bottom-18 right-5">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="Difficulty"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white"
                        >
                          Solved
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
