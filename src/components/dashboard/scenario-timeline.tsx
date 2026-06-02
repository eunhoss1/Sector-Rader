import { Badge } from "@/components/ui/badge";
import type { SectorScenario } from "@/types/dashboard";

type ScenarioTimelineProps = {
  scenarios: SectorScenario[];
};

export function ScenarioTimeline({ scenarios }: ScenarioTimelineProps) {
  return (
    <div className="space-y-3">
      {scenarios.map((scenario, index) => (
        <div key={scenario.label} className="grid grid-cols-[auto_1fr] gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background text-xs font-semibold">
              {index + 1}
            </div>
            {index < scenarios.length - 1 ? <div className="h-full w-px bg-border" /> : null}
          </div>
          <div className="pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold">{scenario.label}</p>
              <Badge variant={scenario.probability >= 50 ? "secondary" : "muted"}>{scenario.probability}%</Badge>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{scenario.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
