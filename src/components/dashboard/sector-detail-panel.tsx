import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CatalystList } from "@/components/dashboard/catalyst-list";
import { SectorScoreBar } from "@/components/dashboard/sector-score-bar";
import type { Catalyst, Indicator, Sector } from "@/types/dashboard";

type SectorDetailPanelProps = {
  sector: Sector;
  catalysts: Catalyst[];
  indicatorMap: Map<string, Indicator>;
};

export function SectorDetailPanel({ sector, catalysts, indicatorMap }: SectorDetailPanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{sector.name}</CardTitle>
            <CardDescription>{sector.summary}</CardDescription>
          </div>
          <Badge variant="success" className="gap-1.5">
            <Target className="h-3.5 w-3.5" aria-hidden="true" />
            {sector.totalScore}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <SectorScoreBar label="모멘텀" value={sector.momentumScore} />
          <SectorScoreBar label="자금 흐름" value={sector.flowScore} />
          <SectorScoreBar label="매크로 적합도" value={sector.macroFitScore} />
          <SectorScoreBar label="지속성" value={sector.durabilityScore} />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">수혜 촉매</p>
          <CatalystList catalysts={catalysts} indicatorMap={indicatorMap} />
        </div>
      </CardContent>
    </Card>
  );
}
