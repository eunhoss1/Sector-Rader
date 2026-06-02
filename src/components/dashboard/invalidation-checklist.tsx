import { CircleAlert, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RuleSeverityBadge } from "@/components/dashboard/rule-severity-badge";
import type { Indicator, InvalidationRule } from "@/types/dashboard";

type InvalidationChecklistProps = {
  rules: InvalidationRule[];
  indicatorMap: Map<string, Indicator>;
};

export function InvalidationChecklist({ rules, indicatorMap }: InvalidationChecklistProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invalidation Rules</CardTitle>
        <CardDescription>어떤 조건이 깨지면 투자 관점을 바꿔야 하는가?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 lg:grid-cols-2">
          {rules.map((rule) => {
            const indicator = indicatorMap.get(rule.linkedIndicatorId);

            return (
              <div key={rule.id} className="rounded-md border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold leading-6">{rule.condition}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{rule.suggestedAction}</p>
                    </div>
                  </div>
                  <RuleSeverityBadge severity={rule.severity} />
                </div>
                {indicator ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{indicator.label}</span>
                    <span>현재 {indicator.value === null ? "N/A" : `${indicator.value}${indicator.unit}`}</span>
                    <span>임계값 {rule.threshold}</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
