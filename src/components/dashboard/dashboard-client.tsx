"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/app-shell";
import { BeneficiaryStocksTable } from "@/components/dashboard/beneficiary-stocks-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DurabilityPanel } from "@/components/dashboard/durability-panel";
import { InvalidationChecklist } from "@/components/dashboard/invalidation-checklist";
import { RegimeSummary } from "@/components/dashboard/regime-summary";
import { SectionShell } from "@/components/dashboard/section-shell";
import { SectorDetailPanel } from "@/components/dashboard/sector-detail-panel";
import { SectorRankingTable } from "@/components/dashboard/sector-ranking-table";
import { SignalGroupGrid } from "@/components/dashboard/signal-group-grid";
import { WhyItBenefitsPanel } from "@/components/dashboard/why-it-benefits-panel";
import {
  getIndicatorMap,
  getMarketDrivers,
  getRankedSectors,
  getSectorCatalysts,
  getSectorRules,
  getSectorStocks,
  getSelectedSector
} from "@/lib/selectors";
import type { DashboardData } from "@/types/dashboard";

type DashboardClientProps = {
  data: DashboardData;
};

export default function DashboardClient({ data }: DashboardClientProps) {
  const rankedSectors = useMemo(() => getRankedSectors(data), [data]);
  const [selectedSectorId, setSelectedSectorId] = useState(rankedSectors[0]?.id ?? "");
  const selectedSector = getSelectedSector(data, selectedSectorId);
  const indicatorMap = useMemo(() => getIndicatorMap(data), [data]);
  const marketDrivers = useMemo(() => getMarketDrivers(data), [data]);
  const sectorCatalysts = selectedSector ? getSectorCatalysts(data, selectedSector) : [];
  const sectorStocks = selectedSector ? getSectorStocks(data, selectedSector) : [];
  const sectorRules = selectedSector ? getSectorRules(data, selectedSector) : [];

  if (!selectedSector) {
    return (
      <AppShell>
        <DashboardHeader snapshot={data.marketSnapshot} />
        <main className="container py-8">
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">표시할 섹터 데이터가 없습니다.</div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <DashboardHeader snapshot={data.marketSnapshot} />
      <main className="container space-y-8 py-6">
        <SectionShell
          eyebrow="Step 1"
          title="시장 국면 판단"
          description="위험자산, 변동성, 신용, 금리, 달러, 유동성 신호를 먼저 종합합니다."
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <RegimeSummary snapshot={data.marketSnapshot} drivers={marketDrivers} />
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold">Signal Matrix</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  각 그룹 점수는 -100에서 +100 사이입니다. 플러스가 클수록 Risk-on 판단에 우호적입니다.
                </p>
              </div>
              <SignalGroupGrid groups={data.signalGroups} indicators={data.indicators} />
            </div>
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Step 2"
          title="수혜 섹터 선택"
          description="섹터 랭킹을 클릭하면 수혜 논리, 지속성, 종목, 무효 조건이 함께 바뀝니다."
        >
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <SectorRankingTable
              sectors={rankedSectors}
              selectedSectorId={selectedSector.id}
              onSelectSector={setSelectedSectorId}
            />
            <SectorDetailPanel sector={selectedSector} catalysts={sectorCatalysts} indicatorMap={indicatorMap} />
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Step 3"
          title="수혜 이유와 지속성"
          description="선택한 섹터가 왜 수혜를 받는지, 그 논리가 얼마나 오래 유지될 수 있는지 분리해서 확인합니다."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <WhyItBenefitsPanel sector={selectedSector} />
            <DurabilityPanel sector={selectedSector} />
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Step 4"
          title="직접 수혜 종목"
          description="미국 주도 섹터와 한국 관심 종목을 같은 표에서 비교합니다."
        >
          <BeneficiaryStocksTable stocks={sectorStocks} />
        </SectionShell>

        <SectionShell
          eyebrow="Step 5"
          title="관점 변경 조건"
          description="투자 아이디어를 유지하기 위한 조건과 깨졌을 때의 행동을 미리 정리합니다."
        >
          <InvalidationChecklist rules={sectorRules} indicatorMap={indicatorMap} />
        </SectionShell>
      </main>
      <footer className="border-t bg-card">
        <div className="container py-5 text-xs leading-5 text-muted-foreground">
          이 대시보드는 개인 리서치와 학습을 위한 정보 도구입니다. 모든 데이터는 mock 데이터이며 투자 권유나
          자문이 아닙니다.
        </div>
      </footer>
    </AppShell>
  );
}
