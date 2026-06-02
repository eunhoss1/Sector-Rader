import { SignalCard } from "@/components/dashboard/signal-card";
import { calculateSignalGroupScore } from "@/lib/scoring";
import type { Indicator, SignalGroup } from "@/types/dashboard";

type SignalGroupGridProps = {
  groups: SignalGroup[];
  indicators: Indicator[];
};

export function SignalGroupGrid({ groups, indicators }: SignalGroupGridProps) {
  const indicatorMap = new Map(indicators.map((indicator) => [indicator.id, indicator]));

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {groups.map((group) => {
        const groupIndicators = group.indicatorIds
          .map((id) => indicatorMap.get(id))
          .filter((indicator): indicator is Indicator => Boolean(indicator));

        return (
          <SignalCard
            key={group.id}
            group={group}
            indicators={groupIndicators}
            score={calculateSignalGroupScore(group, indicators)}
          />
        );
      })}
    </div>
  );
}
