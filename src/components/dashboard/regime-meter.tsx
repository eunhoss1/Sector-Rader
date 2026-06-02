import { cn } from "@/lib/utils";

type RegimeMeterProps = {
  score: number;
};

export function RegimeMeter({ score }: RegimeMeterProps) {
  const safeScore = Math.max(-100, Math.min(100, score));
  const markerPosition = (safeScore + 100) / 2;

  return (
    <div className="space-y-2">
      <div className="relative h-3 rounded-sm bg-muted">
        <div className="absolute inset-y-0 left-0 w-1/3 rounded-l-sm bg-rose-400" />
        <div className="absolute inset-y-0 left-1/3 w-1/3 bg-amber-300" />
        <div className="absolute inset-y-0 right-0 w-1/3 rounded-r-sm bg-emerald-500" />
        <div
          className="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-foreground shadow"
          style={{ left: `${markerPosition}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="grid grid-cols-3 text-xs text-muted-foreground">
        <span>Risk-off</span>
        <span className="text-center">Neutral</span>
        <span className="text-right">Risk-on</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Risk score</span>
        <span className={cn("font-semibold", safeScore >= 25 && "text-emerald-700", safeScore <= -25 && "text-rose-700")}>
          {safeScore}
        </span>
      </div>
    </div>
  );
}
