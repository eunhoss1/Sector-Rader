export type RiskRegime = "risk_on" | "neutral" | "risk_off";
export type IndicatorStatus = "positive" | "neutral" | "negative" | "missing";
export type Trend = "up" | "down" | "flat";
export type Market = "US" | "KR";
export type RuleSeverity = "watch" | "caution" | "critical";
export type PersistenceLevel = "short" | "medium" | "long";

export type TimeSeriesPoint = {
  date: string;
  value: number;
};

export type MarketSnapshot = {
  asOf: string;
  regime: RiskRegime;
  riskScore: number;
  confidence: number;
  summary: string;
  driverIds: string[];
};

export type SignalGroup = {
  id: string;
  label: string;
  description: string;
  weight: number;
  indicatorIds: string[];
};

export type IndicatorThreshold = {
  label: string;
  condition: string;
  interpretation: string;
};

export type Indicator = {
  id: string;
  group: string;
  label: string;
  value: number | null;
  unit: string;
  change: number | null;
  trend: Trend;
  status: IndicatorStatus;
  score: number;
  thresholds: IndicatorThreshold[];
  rationale: string;
  source: string;
  timeSeries: TimeSeriesPoint[];
};

export type Catalyst = {
  id: string;
  title: string;
  description: string;
  linkedIndicatorIds: string[];
  beneficiarySectorIds: string[];
  persistence: PersistenceLevel;
};

export type SectorDurability = {
  label: string;
  score: number;
  supportiveFactors: string[];
  weakeningFactors: string[];
  nextChecks: string[];
};

export type SectorScenario = {
  label: string;
  description: string;
  probability: number;
};

export type Sector = {
  id: string;
  region: "US" | "KR" | "US+KR";
  name: string;
  ticker: string;
  summary: string;
  totalScore: number;
  momentumScore: number;
  flowScore: number;
  macroFitScore: number;
  durabilityScore: number;
  whyItBenefits: string[];
  durability: SectorDurability;
  scenarios: SectorScenario[];
  catalystIds: string[];
  stockIds: string[];
  invalidationRuleIds: string[];
};

export type Stock = {
  id: string;
  market: Market;
  ticker: string;
  name: string;
  sectorId: string;
  exposureScore: number;
  directBenefit: string;
  sensitivity: string;
  risks: string;
};

export type InvalidationRule = {
  id: string;
  scope: "market" | "sector" | "stock";
  condition: string;
  linkedIndicatorId: string;
  threshold: string;
  severity: RuleSeverity;
  suggestedAction: string;
};

export type DashboardData = {
  marketSnapshot: MarketSnapshot;
  signalGroups: SignalGroup[];
  indicators: Indicator[];
  sectors: Sector[];
  catalysts: Catalyst[];
  stocks: Stock[];
  invalidationRules: InvalidationRule[];
};
