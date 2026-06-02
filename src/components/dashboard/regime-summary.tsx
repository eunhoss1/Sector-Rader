import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DriverList } from "@/components/dashboard/driver-list";
import { RegimeMeter } from "@/components/dashboard/regime-meter";
import type { Indicator, MarketSnapshot, RiskRegime } from "@/types/dashboard";

const regimeCopy: Record<RiskRegime, { label: string; description: string }> = {
  risk_on: {
    label: "선별적 Risk-on",
    description: "위험자산 선호가 우세하지만 금리와 달러를 계속 확인해야 합니다."
  },
  neutral: {
    label: "중립",
    description: "방향성이 충분히 강하지 않아 섹터 압축과 관망이 필요합니다."
  },
  risk_off: {
    label: "Risk-off",
    description: "변동성, 신용, 방어자산 신호가 위험 회피 쪽으로 기울었습니다."
  }
};

type RegimeSummaryProps = {
  snapshot: MarketSnapshot;
  drivers: Indicator[];
};

export function RegimeSummary({ snapshot, drivers }: RegimeSummaryProps) {
  const Icon = snapshot.regime === "risk_off" ? ShieldAlert : ShieldCheck;
  const copy = regimeCopy[snapshot.regime];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Market Regime</CardTitle>
            <CardDescription>첫 질문: 지금 시장은 위험 선호인가, 회피인가?</CardDescription>
          </div>
          <Badge variant={snapshot.regime === "risk_on" ? "success" : snapshot.regime === "risk_off" ? "danger" : "warning"}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-md border bg-background p-4">
          <p className="text-sm font-medium">{copy.description}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{snapshot.summary}</p>
        </div>
        <RegimeMeter score={snapshot.riskScore} />
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">판단 신뢰도</span>
            <span className="font-semibold">{snapshot.confidence}%</span>
          </div>
          <Progress value={snapshot.confidence} indicatorClassName="bg-sky-600" />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">핵심 드라이버</p>
          <DriverList drivers={drivers} />
        </div>
      </CardContent>
    </Card>
  );
}
