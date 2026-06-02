import { Badge } from "@/components/ui/badge";

type ExposureBadgeProps = {
  score: number;
};

export function ExposureBadge({ score }: ExposureBadgeProps) {
  return (
    <Badge variant={score >= 85 ? "success" : score >= 70 ? "secondary" : "muted"} className="justify-center">
      {score}
    </Badge>
  );
}
