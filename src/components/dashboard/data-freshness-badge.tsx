import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DataFreshnessBadgeProps = {
  asOf: string;
};

export function DataFreshnessBadge({ asOf }: DataFreshnessBadgeProps) {
  const formatted = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(asOf));

  return (
    <Badge variant="outline" className="gap-1.5">
      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
      Mock data · {formatted}
    </Badge>
  );
}
