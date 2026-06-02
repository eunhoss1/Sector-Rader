import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MiniLineChart } from "@/components/dashboard/mini-line-chart";
import type { Indicator, SignalGroup } from "@/types/dashboard";

type SignalCardProps = {
  group: SignalGroup;
  indicators: Indicator[];
  score: number;
};

function getScoreVariant(score: number) {
  if (score >= 30) {
    return "success" as const;
  }

  if (score <= -30) {
    return "danger" as const;
  }

  return "warning" as const;
}

export function SignalCard({ group, indicators, score }: SignalCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{group.label}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{group.description}</p>
        </div>
        <Badge variant={getScoreVariant(score)}>{score > 0 ? `+${score}` : score}</Badge>
      </div>
      <Progress value={(score + 100) / 2} className="mt-4" indicatorClassName={score >= 0 ? "bg-emerald-600" : "bg-rose-600"} />
      <div className="mt-4 space-y-3">
        {indicators.map((indicator) => {
          const TrendIcon =
            indicator.trend === "up" ? ArrowUpRight : indicator.trend === "down" ? ArrowDownRight : ArrowRight;
          const tone =
            indicator.status === "positive" ? "positive" : indicator.status === "negative" ? "negative" : "neutral";

          return (
            <div key={indicator.id} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-1.5">
                  <TrendIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <p className="truncate text-xs font-medium">{indicator.label}</p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {indicator.value === null ? "N/A" : `${indicator.value}${indicator.unit}`} · score {indicator.score}
                </p>
              </div>
              <MiniLineChart data={indicator.timeSeries} tone={tone} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
