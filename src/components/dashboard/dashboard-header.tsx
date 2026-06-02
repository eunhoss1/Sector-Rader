import { Activity, GitBranch, Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataFreshnessBadge } from "@/components/dashboard/data-freshness-badge";
import type { MarketSnapshot, RiskRegime } from "@/types/dashboard";

const regimeLabels: Record<RiskRegime, string> = {
  risk_on: "Risk-on",
  neutral: "Neutral",
  risk_off: "Risk-off"
};

type DashboardHeaderProps = {
  snapshot: MarketSnapshot;
};

export function DashboardHeader({ snapshot }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <Radar className="h-3.5 w-3.5" aria-hidden="true" />
              Sector Radar
            </Badge>
            <Badge variant="muted" className="gap-1.5">
              <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              Top-down cockpit
            </Badge>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
              시장 국면에서 직접 수혜 종목까지 한 번에 판단
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Risk regime, 수혜 섹터, 지속성, 종목 노출, 무효 조건을 같은 흐름에서 확인하는 개인용
              대시보드입니다.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={snapshot.regime === "risk_on" ? "success" : snapshot.regime === "risk_off" ? "danger" : "warning"}
            className="gap-1.5"
          >
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            {regimeLabels[snapshot.regime]} · {snapshot.riskScore}
          </Badge>
          <DataFreshnessBadge asOf={snapshot.asOf} />
        </div>
      </div>
    </header>
  );
}
