import { Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Catalyst, Indicator } from "@/types/dashboard";

type CatalystListProps = {
  catalysts: Catalyst[];
  indicatorMap: Map<string, Indicator>;
};

const persistenceLabel = {
  short: "단기",
  medium: "중기",
  long: "장기"
};

export function CatalystList({ catalysts, indicatorMap }: CatalystListProps) {
  return (
    <div className="space-y-3">
      {catalysts.map((catalyst) => (
        <div key={catalyst.id} className="rounded-md border bg-background p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{catalyst.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{catalyst.description}</p>
            </div>
            <Badge variant={catalyst.persistence === "long" ? "success" : catalyst.persistence === "medium" ? "secondary" : "muted"}>
              {persistenceLabel[catalyst.persistence]}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {catalyst.linkedIndicatorIds.map((id) => {
              const indicator = indicatorMap.get(id);

              return indicator ? (
                <Badge key={id} variant="outline" className="gap-1">
                  <Link2 className="h-3 w-3" aria-hidden="true" />
                  {indicator.label}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
