import type { Catalyst, DashboardData, Indicator, InvalidationRule, Sector, Stock } from "@/types/dashboard";

export function getIndicatorMap(data: DashboardData) {
  return new Map(data.indicators.map((indicator) => [indicator.id, indicator]));
}

export function getCatalystMap(data: DashboardData) {
  return new Map(data.catalysts.map((catalyst) => [catalyst.id, catalyst]));
}

export function getStockMap(data: DashboardData) {
  return new Map(data.stocks.map((stock) => [stock.id, stock]));
}

export function getRuleMap(data: DashboardData) {
  return new Map(data.invalidationRules.map((rule) => [rule.id, rule]));
}

export function getRankedSectors(data: DashboardData) {
  return [...data.sectors].sort((a, b) => b.totalScore - a.totalScore);
}

export function getSelectedSector(data: DashboardData, selectedSectorId: string | null) {
  const ranked = getRankedSectors(data);
  return data.sectors.find((sector) => sector.id === selectedSectorId) ?? ranked[0];
}

export function getSectorCatalysts(data: DashboardData, sector: Sector): Catalyst[] {
  const catalystMap = getCatalystMap(data);
  return sector.catalystIds
    .map((id) => catalystMap.get(id))
    .filter((catalyst): catalyst is Catalyst => Boolean(catalyst));
}

export function getSectorStocks(data: DashboardData, sector: Sector): Stock[] {
  const stockMap = getStockMap(data);
  return sector.stockIds.map((id) => stockMap.get(id)).filter((stock): stock is Stock => Boolean(stock));
}

export function getSectorRules(data: DashboardData, sector: Sector): InvalidationRule[] {
  const ruleMap = getRuleMap(data);
  return sector.invalidationRuleIds
    .map((id) => ruleMap.get(id))
    .filter((rule): rule is InvalidationRule => Boolean(rule));
}

export function getMarketDrivers(data: DashboardData): Indicator[] {
  const indicatorMap = getIndicatorMap(data);
  return data.marketSnapshot.driverIds
    .map((id) => indicatorMap.get(id))
    .filter((indicator): indicator is Indicator => Boolean(indicator));
}
