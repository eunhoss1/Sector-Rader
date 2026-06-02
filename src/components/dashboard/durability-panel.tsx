import type { ReactNode } from "react";
import { CalendarCheck, Shield, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Sector } from "@/types/dashboard";

type DurabilityPanelProps = {
  sector: Sector;
};

export function DurabilityPanel({ sector }: DurabilityPanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Durability</CardTitle>
            <CardDescription>이 수혜가 얼마나 지속될 수 있는가?</CardDescription>
          </div>
          <Badge variant={sector.durability.score >= 80 ? "success" : "secondary"}>{sector.durability.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">지속성 점수</span>
            <span className="font-semibold">{sector.durability.score}</span>
          </div>
          <Progress value={sector.durability.score} indicatorClassName="bg-teal-600" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <DurabilityList
            icon={<Shield className="h-4 w-4 text-emerald-600" aria-hidden="true" />}
            title="지속 요인"
            items={sector.durability.supportiveFactors}
          />
          <DurabilityList
            icon={<TriangleAlert className="h-4 w-4 text-amber-600" aria-hidden="true" />}
            title="약화 요인"
            items={sector.durability.weakeningFactors}
          />
          <DurabilityList
            icon={<CalendarCheck className="h-4 w-4 text-sky-600" aria-hidden="true" />}
            title="다음 확인"
            items={sector.durability.nextChecks}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DurabilityList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-md border bg-background p-3">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-xs leading-5 text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
