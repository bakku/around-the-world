"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", average: 5.2 },
  { month: "February", average: 4.8 },
  { month: "March", average: 5.4 },
  { month: "April", average: 4.6 },
  { month: "May", average: 4.2 },
  { month: "June", average: 3.2 },
];

const chartConfig = {
  average: {
    label: "Average throws per number",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ExampleChart() {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 3) : value
          }
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              formatter={(value) => (
                <span>
                  Average Throws: <strong>{value}</strong>
                </span>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="average"
          type="natural"
          stroke="var(--color-average)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
