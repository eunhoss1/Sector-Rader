import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Indicator } from "@/types/dashboard";

type DriverListProps = {
  drivers: Indicator[];
};

export function DriverList({ drivers }: DriverListProps) {
  return (
    <div className="space-y-2">
      {drivers.map((driver) => {
        const TrendIcon = driver.trend === "up" ? ArrowUpRight : driver.trend === "down" ? ArrowDownRight : ArrowRight;

        return (
          <div key={driver.id} className="flex gap-3 rounded-md border bg-background p-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
              <TrendIcon className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{driver.label}</p>
                <Badge variant={driver.status === "positive" ? "success" : driver.status === "negative" ? "danger" : "muted"}>
                  {driver.value === null ? "N/A" : `${driver.value}${driver.unit}`}
                </Badge>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{driver.rationale}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
