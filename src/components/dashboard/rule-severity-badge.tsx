import { Badge } from "@/components/ui/badge";
import type { RuleSeverity } from "@/types/dashboard";

const labels: Record<RuleSeverity, string> = {
  watch: "Watch",
  caution: "Caution",
  critical: "Critical"
};

export function RuleSeverityBadge({ severity }: { severity: RuleSeverity }) {
  return (
    <Badge variant={severity === "critical" ? "danger" : severity === "caution" ? "warning" : "muted"}>
      {labels[severity]}
    </Badge>
  );
}
