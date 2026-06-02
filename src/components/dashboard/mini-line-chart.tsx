"use client";

import { Line, LineChart, Tooltip, YAxis } from "recharts";
import type { TimeSeriesPoint } from "@/types/dashboard";

type MiniLineChartProps = {
  data: TimeSeriesPoint[];
  tone: "positive" | "neutral" | "negative";
};

const strokeByTone = {
  positive: "#059669",
  neutral: "#ca8a04",
  negative: "#e11d48"
};

export function MiniLineChart({ data, tone }: MiniLineChartProps) {
  if (data.length === 0) {
    return <div className="h-8 w-24 rounded-sm bg-muted" aria-label="데이터 없음" />;
  }

  return (
    <div className="h-8 w-24" aria-label="최근 흐름 차트">
      <LineChart width={96} height={32} data={data} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid hsl(220 16% 86%)",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
            fontSize: 12
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeByTone[tone]}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}
