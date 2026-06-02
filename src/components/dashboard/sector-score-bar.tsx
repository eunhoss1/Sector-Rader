import { Progress } from "@/components/ui/progress";

type SectorScoreBarProps = {
  label: string;
  value: number;
};

export function SectorScoreBar({ label, value }: SectorScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <Progress value={value} indicatorClassName={value >= 80 ? "bg-emerald-600" : value >= 65 ? "bg-sky-600" : "bg-amber-500"} />
    </div>
  );
}
