import { readFile } from "node:fs/promises";

const requiredCollections = ["signalGroups", "indicators", "sectors", "catalysts", "stocks", "invalidationRules"];
const raw = await readFile(new URL("../src/data/mock-dashboard.json", import.meta.url), "utf8");
const data = JSON.parse(raw);

for (const collection of requiredCollections) {
  if (!Array.isArray(data[collection]) || data[collection].length === 0) {
    throw new Error(`${collection} must be a non-empty array`);
  }
}

const ids = {
  indicators: new Set(data.indicators.map((item) => item.id)),
  sectors: new Set(data.sectors.map((item) => item.id)),
  catalysts: new Set(data.catalysts.map((item) => item.id)),
  stocks: new Set(data.stocks.map((item) => item.id)),
  rules: new Set(data.invalidationRules.map((item) => item.id))
};

for (const id of data.marketSnapshot.driverIds) {
  if (!ids.indicators.has(id)) {
    throw new Error(`marketSnapshot.driverIds references missing indicator: ${id}`);
  }
}

for (const group of data.signalGroups) {
  for (const id of group.indicatorIds) {
    if (!ids.indicators.has(id)) {
      throw new Error(`signalGroups.${group.id} references missing indicator: ${id}`);
    }
  }
}

for (const sector of data.sectors) {
  for (const id of sector.catalystIds) {
    if (!ids.catalysts.has(id)) {
      throw new Error(`sector.${sector.id} references missing catalyst: ${id}`);
    }
  }

  for (const id of sector.stockIds) {
    if (!ids.stocks.has(id)) {
      throw new Error(`sector.${sector.id} references missing stock: ${id}`);
    }
  }

  for (const id of sector.invalidationRuleIds) {
    if (!ids.rules.has(id)) {
      throw new Error(`sector.${sector.id} references missing rule: ${id}`);
    }
  }
}

console.log("mock-dashboard.json references are valid");
