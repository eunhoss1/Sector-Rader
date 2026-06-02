import type { Indicator, RiskRegime, SignalGroup } from "@/types/dashboard";

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeIndicatorScore(score: number) {
  return clamp(score, -2, 2);
}

export function classifyRiskRegime(score: number): RiskRegime {
  if (score >= 25) {
    return "risk_on";
  }

  if (score <= -25) {
    return "risk_off";
  }

  return "neutral";
}

export function calculateMarketRiskScore(signalGroups: SignalGroup[], indicators: Indicator[]) {
  const indicatorMap = new Map(indicators.map((indicator) => [indicator.id, indicator]));
  const totalWeight = signalGroups.reduce((sum, group) => sum + group.weight, 0);

  if (totalWeight === 0) {
    return 0;
  }

  const weightedScore = signalGroups.reduce((sum, group) => {
    const groupIndicators = group.indicatorIds
      .map((id) => indicatorMap.get(id))
      .filter((indicator): indicator is Indicator => Boolean(indicator));

    if (groupIndicators.length === 0) {
      return sum;
    }

    const groupAverage =
      groupIndicators.reduce((groupSum, indicator) => groupSum + normalizeIndicatorScore(indicator.score), 0) /
      groupIndicators.length;

    return sum + groupAverage * group.weight;
  }, 0);

  return Math.round((weightedScore / (totalWeight * 2)) * 100);
}

export function calculateSignalGroupScore(group: SignalGroup, indicators: Indicator[]) {
  const indicatorMap = new Map(indicators.map((indicator) => [indicator.id, indicator]));
  const groupIndicators = group.indicatorIds
    .map((id) => indicatorMap.get(id))
    .filter((indicator): indicator is Indicator => Boolean(indicator));

  if (groupIndicators.length === 0) {
    return 0;
  }

  const average =
    groupIndicators.reduce((sum, indicator) => sum + normalizeIndicatorScore(indicator.score), 0) /
    groupIndicators.length;

  return Math.round((average / 2) * 100);
}

export function calculateSectorCompositeScore(scores: {
  momentumScore: number;
  flowScore: number;
  macroFitScore: number;
  durabilityScore: number;
}) {
  return Math.round(
    scores.momentumScore * 0.3 +
      scores.flowScore * 0.2 +
      scores.macroFitScore * 0.3 +
      scores.durabilityScore * 0.2
  );
}
