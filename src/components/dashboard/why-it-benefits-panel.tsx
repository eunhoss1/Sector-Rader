import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScenarioTimeline } from "@/components/dashboard/scenario-timeline";
import type { Sector } from "@/types/dashboard";

type WhyItBenefitsPanelProps = {
  sector: Sector;
};

export function WhyItBenefitsPanel({ sector }: WhyItBenefitsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Thesis</CardTitle>
        <CardDescription>왜 이 섹터가 현재 국면에서 수혜를 받는가?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {sector.whyItBenefits.map((reason) => (
            <div key={reason} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <p className="text-sm leading-6">{reason}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">가능한 전개</p>
          <ScenarioTimeline scenarios={sector.scenarios} />
        </div>
      </CardContent>
    </Card>
  );
}
